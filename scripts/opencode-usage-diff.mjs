import fs from "node:fs";
import path from "node:path";

function parseArgs() {
  const args = process.argv.slice(2);
  const config = { from: null, to: null };
  for (const arg of args) {
    if (arg.startsWith("--from=")) config.from = arg.slice("--from=".length);
    else if (arg.startsWith("--to=")) config.to = arg.slice("--to=".length);
  }
  return config;
}

function findSnapshot(snapDir, label) {
  if (!fs.existsSync(snapDir)) return null;
  const matches = fs
    .readdirSync(snapDir)
    .filter(f => f.endsWith(`_${label}.json`));
  if (matches.length === 0) return null;
  matches.sort();
  return matches[matches.length - 1];
}

function findModel(snap, predicate) {
  if (!snap || !Array.isArray(snap.model_usage)) return null;
  return snap.model_usage.find(predicate) || null;
}

const config = parseArgs();
if (!config.from || !config.to) {
  console.error("Usage: npm run oc:diff -- --from=<label1> --to=<label2>");
  process.exit(1);
}

const root = process.cwd();
const snapDir = path.join(root, "reports", "opencode-usage", "snapshots");
const reportDir = path.join(root, "reports", "opencode-usage");
fs.mkdirSync(reportDir, { recursive: true });

const fromFile = findSnapshot(snapDir, config.from);
const toFile = findSnapshot(snapDir, config.to);
if (!fromFile) {
  console.error(`Snapshot not found for label: ${config.from}`);
  process.exit(1);
}
if (!toFile) {
  console.error(`Snapshot not found for label: ${config.to}`);
  process.exit(1);
}

const from = JSON.parse(fs.readFileSync(path.join(snapDir, fromFile), "utf8"));
const to = JSON.parse(fs.readFileSync(path.join(snapDir, toFile), "utf8"));

const delta = (a, b) => (b || 0) - (a || 0);

const dSessions = delta(from.sessions, to.sessions);
const dMessages = delta(from.messages, to.messages);
const dInput = delta(from.input_tokens, to.input_tokens);
const dOutput = delta(from.output_tokens, to.output_tokens);
const dCacheRead = delta(from.cache_read_tokens, to.cache_read_tokens);
const dCacheWrite = delta(from.cache_write_tokens, to.cache_write_tokens);
const dTotalCost = delta(from.total_cost, to.total_cost);

const m3In = findModel(from, m => /m3|minimax/i.test(m.model || ""));
const m3To = findModel(to, m => /m3|minimax/i.test(m.model || ""));
const dsIn = findModel(from, m => /deepseek/i.test(m.model || ""));
const dsTo = findModel(to, m => /deepseek/i.test(m.model || ""));

function mUsageDelta(fromM, toM) {
  if (!toM) {
    return { messages: 0, input_tokens: 0, output_tokens: 0, cache_read_tokens: 0, cache_write_tokens: 0, cost: 0 };
  }
  const f = fromM || {};
  return {
    messages: delta(f.messages || 0, toM.messages || 0),
    input_tokens: delta(f.input_tokens || 0, toM.input_tokens || 0),
    output_tokens: delta(f.output_tokens || 0, toM.output_tokens || 0),
    cache_read_tokens: delta(f.cache_read_tokens || 0, toM.cache_read_tokens || 0),
    cache_write_tokens: delta(f.cache_write_tokens || 0, toM.cache_write_tokens || 0),
    cost: delta(f.cost || 0, toM.cost || 0)
  };
}

const dM3 = mUsageDelta(m3In, m3To);
const dDS = mUsageDelta(dsIn, dsTo);

const m3ModelName = m3To?.model || m3In?.model || "(未匹配)";
const dsModelName = dsTo?.model || dsIn?.model || "(未匹配)";

const costM3 = (dM3.input_tokens * 0.15 + dM3.output_tokens * 0.6) / 1_000_000;
const costDS = (dDS.input_tokens * 0.014 + dDS.output_tokens * 0.28) / 1_000_000;
const costTotal = costM3 + costDS;

const totalInputOutput = dInput + dOutput;
const okFree = totalInputOutput < 5_000_000;
const goRecommend = totalInputOutput >= 5_000_000 && totalInputOutput < 50_000_000;
const apiRisk = totalInputOutput >= 50_000_000;

let suggestion = "M3 Free 够用 ✅";
if (goRecommend) suggestion = "建议评估 OpenCode Go ⚖️";
if (apiRisk) suggestion = "用量较大，建议直接 API 之前先看 OpenCode Go ⚠️";

const stamp = new Date().toISOString().replace(/[:.]/g, "-").replace(/Z$/, "");
const reportPath = path.join(reportDir, `diff_${config.from}_to_${config.to}_${stamp}.md`);

const md = `# OpenCode 用量 Diff 报告

**生成时间：** ${new Date().toISOString()}
**对比：** \`${config.from}\` → \`${config.to}\`
**From 文件：** \`${fromFile}\`
**To 文件：** \`${toFile}\`

---

## 一、总体增量

| 指标 | 增量 |
|------|-----:|
| Sessions | ${dSessions.toLocaleString()} |
| Messages | ${dMessages.toLocaleString()} |
| Input tokens | ${dInput.toLocaleString()} |
| Output tokens | ${dOutput.toLocaleString()} |
| Cache Read | ${dCacheRead.toLocaleString()} |
| Cache Write | ${dCacheWrite.toLocaleString()} |
| Total Cost | $${dTotalCost.toFixed(4)} |

## 二、M3 (${m3ModelName}) 增量

| 指标 | 增量 |
|------|-----:|
| Messages | ${dM3.messages.toLocaleString()} |
| Input | ${dM3.input_tokens.toLocaleString()} |
| Output | ${dM3.output_tokens.toLocaleString()} |
| Cache Read | ${dM3.cache_read_tokens.toLocaleString()} |
| Cache Write | ${dM3.cache_write_tokens.toLocaleString()} |
| 估算 API 成本（参考） | $${costM3.toFixed(4)} |

## 三、DeepSeek (${dsModelName}) 增量

| 指标 | 增量 |
|------|-----:|
| Messages | ${dDS.messages.toLocaleString()} |
| Input | ${dDS.input_tokens.toLocaleString()} |
| Output | ${dDS.output_tokens.toLocaleString()} |
| Cache Read | ${dDS.cache_read_tokens.toLocaleString()} |
| Cache Write | ${dDS.cache_write_tokens.toLocaleString()} |
| 估算 API 成本（参考） | $${costDS.toFixed(4)} |

---

## 四、套餐建议

- 本次任务总 input + output：${totalInputOutput.toLocaleString()} tokens
- ${suggestion}
- 估算 API 直接调用成本（仅参考）：$${costTotal.toFixed(4)}

判断阈值（参考）：

- < 5M tokens：M3 Free 够用
- 5M - 50M tokens：可考虑 OpenCode Go
- \> 50M tokens：建议先做缓存与降 prompt 成本，再评估直接 API

---

## 五、备注

- 估算 API 成本按公开 list price 粗算，仅作参考
- 实际以 opencode 计费页或 MiniMax / DeepSeek 官方计费为准
- 缓存读取（Cache Read）通常折扣较大，本报告未单独折算
- model_usage 字段如未在 snapshot 中填充，参考 reports/opencode-usage/snapshots/ 下的 raw txt
`;

fs.writeFileSync(reportPath, md, "utf8");
console.log(`Diff report: ${reportPath}`);
