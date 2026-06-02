# 任务 041B 报告：OpenCode 用量监控脚本

**完成时间：** 2026-06-02
**任务文件：** `tasks/041B_OPENCODE_TASK_USAGE_MONITOR_V02.md`
**目标：** 通过本地脚本读取 `opencode stats` 输出，生成 snapshot + diff 报告，用于判断是否需要升级到 OpenCode Go 或直接 API。

---

## 一、交付物

| 路径 | 类型 | 用途 |
|------|------|------|
| `scripts/opencode-usage-snapshot.mjs` | 新建 | 跑 `opencode stats`，保存 raw txt + 结构化 JSON |
| `scripts/opencode-usage-diff.mjs` | 新建 | 对比两份 snapshot，输出 Markdown diff 报告 |
| `reports/opencode-usage/.gitkeep` | 新建 | 保留目录 |
| `package.json` | 修改 | 新增 4 个 npm 脚本 |

---

## 二、npm 脚本

```json
"oc:snap":  "node scripts/opencode-usage-snapshot.mjs",
"oc:diff":  "node scripts/opencode-usage-diff.mjs",
"oc:today": "opencode stats --days 1 --models 20 --project \"\"",
"oc:week":  "opencode stats --days 7 --models 20 --project \"\""
```

常用命令：

```bash
# 在做某项大工作前打一个点
npm run oc:snap -- --label=before_big_task

# 跑完后再打一个点
npm run oc:snap -- --label=after_big_task

# 对比两个点之间的用量
npm run oc:diff -- --from=before_big_task --to=after_big_task

# 临时看一眼今日 / 本周总览
npm run oc:today
npm run oc:week
```

---

## 三、Snapshot 设计

每次跑 `oc:snap` 会在 `reports/opencode-usage/snapshots/` 下生成两份文件：

- `{ISO时间戳}_{label}.txt`：`opencode stats` 的 raw 输出（命令失败时也会保留 stderr）
- `{ISO时间戳}_{label}.json`：解析后的结构化数据

JSON 字段：

```json
{
  "ts": "ISO 时间",
  "label": "标签",
  "cmd_ok": true,
  "cmd_error": null,
  "days": 1,
  "models_limit": 20,
  "sessions": 5,
  "messages": 201,
  "input_tokens": 715900,
  "output_tokens": 110000,
  "cache_read_tokens": 11500000,
  "cache_write_tokens": 0,
  "total_cost": 0,
  "model_usage": [
    {
      "model": "opencode/minimax-m3-free",
      "messages": 123,
      "input_tokens": 597300,
      "output_tokens": 90100,
      "cache_read_tokens": 10000000,
      "cache_write_tokens": 0,
      "cost": 0
    }
  ],
  "parse_warnings": []
}
```

容错：

- K / M 自动转数字（`597.3K` → `597300`，`10.0M` → `10000000`）
- 命令失败时仅保留 raw + `cmd_ok=false`，不抛错
- 解析失败的行进 `parse_warnings`，不阻断 JSON 生成
- model_usage 若整段无法识别，数组留空 + warnings 提示

---

## 四、Diff 设计

`oc:diff --from=A --to=B` 会自动找最新一份 `*_A.json` 和 `*_B.json`，生成 `reports/opencode-usage/diff_A_to_B_{时间戳}.md`。

报告分 5 段：

1. 总体增量（sessions / messages / tokens / cost）
2. M3 模型单独增量 + 估算 API 成本
3. DeepSeek 模型单独增量 + 估算 API 成本
4. 套餐建议（按总 input+output 分档）
5. 备注（成本估算、缓存未折算等说明）

成本估算（仅参考）：

- M3：$0.15 / M input + $0.6 / M output
- DeepSeek：$0.014 / M input + $0.28 / M output

档位建议：

- < 5M tokens：M3 Free 够用 ✅
- 5M - 50M tokens：可考虑 OpenCode Go ⚖️
- \> 50M tokens：建议先做缓存与降 prompt 成本，再评估直接 API ⚠️

---

## 五、验证

按以下顺序跑过一遍，snapshot + diff 均工作：

```bash
npm run oc:snap -- --label=test_before   # 成功：5 sessions / 207 messages
npm run oc:snap -- --label=test_after    # 成功
npm run oc:diff -- --from=test_before --to=test_after
# 输出：diff_test_before_to_test_after_{ts}.md
# 显示 1 message / 13,200 input / 100 output 增量
# 建议：M3 Free 够用 ✅
```

测试产物已删除，仅保留目录与 `.gitkeep`。

---

## 六、典型使用场景

| 场景 | 建议打点 |
|------|----------|
| 跑一次大重构（10+ 文件） | before / after |
| 跑一次批量文章生产（5+ 篇） | before / after |
| 一次性执行多个 task 文件 | before / after |
| 一周复盘 | 每周一早上 `oc:week` 即可 |
| 对外汇报用量 | 用 diff 报告附给团队 |

---

## 七、限制

- 不调外部 API，不上传日志
- 不修改 `auth.json`、OpenCode config
- 成本估算以 list price 粗算，**不**替代官方计费
- model_usage 字段依赖 `opencode stats` 输出格式，未来版本如改版需同步调整解析器
- 仅在 `project=""`（空项目聚合）下验证；带 project 过滤时需另外跑 `opencode stats --project=xxx`

---

## 八、产出验证

- `scripts/opencode-usage-snapshot.mjs` ✅ 可执行
- `scripts/opencode-usage-diff.mjs` ✅ 可执行
- `package.json` ✅ 4 个 oc:* 脚本已加
- `reports/opencode-usage/` ✅ 目录已建
- 端到端 diff 流程 ✅ 验证通过
