import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

function parseArgs() {
  const args = process.argv.slice(2);
  const config = { label: "manual", days: 1, models: 20 };
  for (const arg of args) {
    if (arg.startsWith("--label=")) config.label = arg.slice("--label=".length);
    else if (arg.startsWith("--days=")) config.days = parseInt(arg.slice("--days=".length), 10);
    else if (arg.startsWith("--models=")) config.models = parseInt(arg.slice("--models=".length), 10);
  }
  return config;
}

function parseNumber(s) {
  if (s === undefined || s === null) return 0;
  s = String(s).trim().replace(/,/g, "");
  if (!s) return 0;
  const m = s.match(/^(-?[0-9]*\.?[0-9]+)\s*([KkMm]?)$/);
  if (!m) return Number(s) || 0;
  const n = parseFloat(m[1]);
  const unit = m[2].toUpperCase();
  if (unit === "K") return Math.round(n * 1000);
  if (unit === "M") return Math.round(n * 1_000_000);
  return Math.round(n);
}

function clean(line) {
  return line.replace(/[│┌┐└┘├┤┬┴┼─╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬]/g, "").trim();
}

function parseSnapshot(raw) {
  const lines = raw.split(/\r?\n/);
  const result = {
    sessions: 0,
    messages: 0,
    days: 0,
    input_tokens: 0,
    output_tokens: 0,
    cache_read_tokens: 0,
    cache_write_tokens: 0,
    total_cost: 0,
    avg_cost_per_day: 0,
    avg_tokens_per_session: 0,
    median_tokens_per_session: 0,
    model_usage: []
  };

  const warnings = [];
  let currentSection = null;
  let currentModel = null;
  let modelBuffer = {};

  function flushModel() {
    if (currentModel) {
      result.model_usage.push({
        model: currentModel,
        messages: modelBuffer.messages || 0,
        input_tokens: modelBuffer.input_tokens || 0,
        output_tokens: modelBuffer.output_tokens || 0,
        cache_read_tokens: modelBuffer.cache_read_tokens || 0,
        cache_write_tokens: modelBuffer.cache_write_tokens || 0,
        cost: modelBuffer.cost || 0
      });
    }
    currentModel = null;
    modelBuffer = {};
  }

  for (const rawLine of lines) {
    const line = clean(rawLine);
    if (!line) continue;

    const sectionMatch = line.match(/^([A-Z][A-Z &]+)$/);
    if (sectionMatch) {
      flushModel();
      currentSection = sectionMatch[1].trim();
      continue;
    }

    if (currentSection === "MODEL USAGE") {
      if (!line.startsWith(" ") && line.includes("/")) {
        flushModel();
        currentModel = line.trim();
        continue;
      }
    }

    const kvMatch = line.match(/^([A-Za-z][A-Za-z _]*?)\s+(-?[0-9]*\.?[0-9]+\s*[KkMm]?|[0-9]+|\$[0-9]*\.?[0-9]+)\s*$/);
    if (!kvMatch) continue;
    const key = kvMatch[1].trim().toLowerCase().replace(/\s+/g, "_");
    let val = kvMatch[2].trim();
    if (val.startsWith("$")) {
      val = parseFloat(val.slice(1)) || 0;
    } else {
      val = parseNumber(val);
    }

    if (currentSection === "OVERVIEW") {
      if (key === "sessions") result.sessions = val;
      else if (key === "messages") result.messages = val;
      else if (key === "days") result.days = val;
    } else if (currentSection === "COST & TOKENS") {
      if (key === "input") result.input_tokens = val;
      else if (key === "output") result.output_tokens = val;
      else if (key === "cache_read") result.cache_read_tokens = val;
      else if (key === "cache_write") result.cache_write_tokens = val;
      else if (key === "total_cost") result.total_cost = val;
      else if (key === "avg_cost/day") result.avg_cost_per_day = val;
      else if (key === "avg_tokens/session") result.avg_tokens_per_session = val;
      else if (key === "median_tokens/session") result.median_tokens_per_session = val;
    } else if (currentSection === "MODEL USAGE" && currentModel) {
      if (key === "messages") modelBuffer.messages = val;
      else if (key === "input_tokens") modelBuffer.input_tokens = val;
      else if (key === "output_tokens") modelBuffer.output_tokens = val;
      else if (key === "cache_read") modelBuffer.cache_read_tokens = val;
      else if (key === "cache_write") modelBuffer.cache_write_tokens = val;
      else if (key === "cost") modelBuffer.cost = val;
    } else {
      warnings.push(`unparsed: ${line}`);
    }
  }

  flushModel();
  return { result, warnings };
}

const config = parseArgs();
const root = process.cwd();
const snapDir = path.join(root, "reports", "opencode-usage", "snapshots");
fs.mkdirSync(snapDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, "-").replace(/Z$/, "");
const baseName = `${stamp}_${config.label}`;
const txtPath = path.join(snapDir, `${baseName}.txt`);
const jsonPath = path.join(snapDir, `${baseName}.json`);

let raw = "";
let cmdOk = false;
let cmdErr = "";
try {
  raw = execSync(
    `opencode stats --days ${config.days} --models ${config.models} --project ""`,
    { encoding: "utf8", maxBuffer: 50 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] }
  );
  cmdOk = true;
} catch (e) {
  cmdErr = String(e?.stderr || e?.stdout || e?.message || e);
  raw = cmdErr;
}

fs.writeFileSync(txtPath, raw, "utf8");

const out = {
  ts: new Date().toISOString(),
  label: config.label,
  cmd_ok: cmdOk,
  cmd_error: cmdErr || null,
  days: config.days,
  models_limit: config.models,
  sessions: 0,
  messages: 0,
  input_tokens: 0,
  output_tokens: 0,
  cache_read_tokens: 0,
  cache_write_tokens: 0,
  total_cost: 0,
  model_usage: [],
  parse_warnings: []
};

if (cmdOk) {
  try {
    const { result, warnings } = parseSnapshot(raw);
    Object.assign(out, result);
    out.parse_warnings = warnings;
  } catch (e) {
    out.parse_warnings.push(`parse threw: ${e.message}`);
  }
} else {
  out.parse_warnings.push("opencode stats command failed; only raw saved");
}

fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2), "utf8");

console.log(`Snapshot saved: ${txtPath}`);
console.log(`JSON: ${jsonPath}`);
console.log(`cmd_ok: ${cmdOk}`);
console.log(`sessions: ${out.sessions}, messages: ${out.messages}`);
console.log(`input: ${out.input_tokens}, output: ${out.output_tokens}`);
console.log(`models: ${out.model_usage.length}`);
if (out.parse_warnings.length > 0) {
  console.log(`warnings: ${out.parse_warnings.length}`);
}
