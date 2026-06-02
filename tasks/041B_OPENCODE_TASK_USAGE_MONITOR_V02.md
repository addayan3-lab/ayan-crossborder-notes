# 041B_OPENCODE_TASK_USAGE_MONITOR_V02

## 目标

把 OpenCode 用量监控从“日统计”升级为“任务级统计”。

## 背景

当前 `opencode stats --days 1 --models 20 --project ""` 只能看到当天总量，不能判断每个任务的实际消耗。

用户需要判断：

- M3 Free 是否够用
- OpenCode Go 是否更划算
- MiniMax 官方套餐是否值得
- 直接 API 是否会失控

## 新增文件

必须新增：

1. scripts/opencode-usage-snapshot.mjs
2. scripts/opencode-usage-diff.mjs
3. reports/opencode-usage/.gitkeep

可以修改：

1. package.json

禁止修改其他业务文件。

## 功能要求

### 1. snapshot 脚本

命令：

npm run oc:snap -- --label=before_041

功能：

- 执行 `opencode stats --days 1 --models 20 --project ""`
- 保存原始输出到 reports/opencode-usage/snapshots/
- 文件名包含时间和 label
- 同时解析出以下字段，保存 JSON：
  - sessions
  - messages
  - input_tokens
  - output_tokens
  - cache_read_tokens
  - cache_write_tokens
  - model_usage[]，包含模型名、messages、input、output、cache_read、cache_write

如果解析失败，也要保存 raw txt，不要中断。

### 2. diff 脚本

命令：

npm run oc:diff -- --from=before_041 --to=after_041

功能：

- 读取两个 snapshot JSON
- 计算差值
- 生成 Markdown 报告到 reports/opencode-usage/
- 报告包含：
  - 本次任务新增 messages
  - 本次任务新增 input/output/cache_read
  - M3 新增用量
  - DeepSeek 新增用量
  - 估算 API 成本，仅作为参考
  - 是否适合继续免费
  - 是否建议 OpenCode Go

### 3. npm scripts

追加：

"oc:snap": "node scripts/opencode-usage-snapshot.mjs",
"oc:diff": "node scripts/opencode-usage-diff.mjs",
"oc:today": "opencode stats --days 1 --models 20 --project \"\"",
"oc:week": "opencode stats --days 7 --models 20 --project \"\""

## 解析要求

支持 K/M 简写：

- 597.0K = 597000
- 9.9M = 9900000
- 0 = 0

## 安全边界

- 禁止读取 auth.json
- 禁止上传日志
- 禁止调用外部 API
- 禁止修改 OpenCode 配置
- 禁止修改文章、页面、SEO、图片脚本等业务文件
- 只允许写 scripts/、reports/opencode-usage/、package.json

## 验收命令

执行：

npm run oc:snap -- --label=test_before
npm run oc:snap -- --label=test_after
npm run oc:diff -- --from=test_before --to=test_after
npm run oc:today

## 输出报告

生成：

reports/041B_OPENCODE_TASK_USAGE_MONITOR_V02_report.md

报告包含：

- 执行结论：成功/失败
- 新增文件
- 修改文件
- npm scripts 是否添加成功
- 验收命令是否通过
- 是否读取 auth.json：否
- 是否调用外部 API：否
- 下一步建议
