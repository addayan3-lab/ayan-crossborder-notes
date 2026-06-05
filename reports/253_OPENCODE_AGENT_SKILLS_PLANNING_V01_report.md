# 253: OpenCode Agent Skills Planning

## 1. 任务名称

OpenCode Agent Skills 是否需要开发的只读评估。

## 2. 执行结论

建议开发，但不要一次做很多。

本项目已经有清晰的 `AGENTS.md`、内容 SOP、AI 阿岩助手规划、发布校验脚本和大量批次报告；真正缺的是把高频、易出错、需要反复遵守业务原则的工作沉淀成少量项目级 Agent Skills。

优先建议先做 4 个 `.opencode/skills`，再配 3 个 `.opencode/commands`：

| 优先级 | 类型 | 名称建议 | 结论 |
|---|---|---|---|
| P0 | skill | `ayan-content-ops` | 必做，负责文章/frontmatter/内链/学习路径 |
| P0 | skill | `ayan-conversion-qa` | 必做，负责资源、问卷、公开课、微信弱化路径 |
| P1 | skill | `ayan-assistant-rules` | 建议做，负责无 LLM 规则匹配和推荐顺序 |
| P1 | skill | `ayan-release-check` | 建议做，负责 build/SEO/images/git diff/report 验收 |
| P2 | command | `audit.md` | 建议做，固定只读审计入口 |
| P2 | command | `verify.md` | 建议做，固定验证命令入口 |
| P2 | command | `report.md` | 建议做，固定 reports 输出格式 |

暂不建议做“万能 Agent”“自动增长 Agent”“自动大批量改文 Agent”。这些会提高误改 URL、破坏 frontmatter、过度转化、过度微信导流的风险。

## 3. 修改文件

- 新增：`reports/253_OPENCODE_AGENT_SKILLS_PLANNING_V01_report.md`

未修改：

- 未创建 `.opencode/`
- 未修改 `AGENTS.md`
- 未修改 `src/`
- 未修改 `package.json`
- 未触碰运行层

## 4. 具体改动

本轮只做只读评估和报告沉淀。

参考了以下项目事实：

- 当前项目根目录没有 `.opencode/` 目录。
- `AGENTS.md` 已经定义 `.opencode/commands/` 与 `.opencode/skills/` 的目标位置。
- `package.json` 已有 `build`、`seo:audit`、`images:check`、`oc:*` 等脚本。
- `docs/content-production-sop.md` 已经沉淀文章生产、frontmatter、配图、发布检查规则。
- `docs/assistant-match-logic-refactor-plan.md` 已经沉淀 AI 阿岩助手匹配风险和验收标准。
- 最近报告显示项目高频工作集中在文章、资源页、公开课页、CTA/微信弱化、AI 阿岩助手、发布后检查。

## 5. 推荐 Skill 设计

### 5.1 `ayan-content-ops`

用途：

- 新文章、旧文章补字段、学习路径、相关文章、专题页入口。

应固化的规则：

- 必须保护 frontmatter。
- `topic`、`stage`、`intent`、`relatedTopics`、`publicLessonUse`、`leadMagnet`、`wechatHook` 按同类文章对齐。
- 文章先解决新手痛点，不为专业而专业。
- 不新增杂乱专题，优先维护现有学习路径。
- 修改后检查 `/articles/`、专题页、首页路径是否还连通。

适用任务：

- 新增文章
- 文章字段回填
- 文章内链补强
- 专题学习路径更新

### 5.2 `ayan-conversion-qa`

用途：

- 资源领取、问卷、公开课承接、CTA 密度、微信关键词弱化。

应固化的规则：

- 资源领取优先走问卷或资料说明，不要全部跳微信。
- AI 阿岩助手优先推荐解释型文章，再资源模板，最后才问卷/公开课/微信承接。
- 首页必须保留清晰选品入口。
- 公开课承接贴近新手，不要过度关键词专业化。
- 检查 `/survey/`、`/resources/`、`/open-class/`、`/lead/`、`/ask/` 的路径一致性。

适用任务：

- CTA 噪音审计
- 微信文案清理
- 资料页/公开课页批量一致性检查
- 转化路径回归

### 5.3 `ayan-assistant-rules`

用途：

- AI 阿岩助手规则匹配、话题分类、推荐排序、客户端/服务端一致性。

应固化的规则：

- 当前阶段无 LLM、无 API、无用户数据收集。
- 不把助手改成付费 API 方案。
- 先判断选品、Listing、广告、Review、AI 工具、资源、公开课。
- 推荐顺序是文章优先，资源其次，问卷/公开课/微信最后。
- 修改规则后必须跑典型 query 回归。

适用任务：

- 新增助手 topic
- 修改 strongKeywords/triggerKeywords
- 修复误判
- 重构匹配逻辑
- 浮窗助手和 `/ask/` 一致性检查

### 5.4 `ayan-release-check`

用途：

- 每批修改后的固定验收和报告。

应固化的规则：

- 优先运行 `npm run build`、`npm run seo:audit`、`npm run images:check`。
- 如果脚本不存在，先读 `package.json` 再选择可用脚本。
- 输出 `git status --short` 和 `git diff --stat` 结论。
- 每次任务完成必须写 `reports/` 报告。
- 不提交 `.env`、本地缓存、OpenCode 用量文件、配置备份。

适用任务：

- 发布前检查
- 发布后检查
- commit/push 前验收
- 构建失败定位

## 6. 推荐 Commands

### 6.1 `.opencode/commands/audit.md`

用途：固定只读审计入口。

建议内容：

- 先读 `AGENTS.md`、`package.json`、相关 docs、最近 reports。
- 不修改文件。
- 输出风险、建议改动范围、推荐推理等级。

### 6.2 `.opencode/commands/verify.md`

用途：固定验证入口。

建议内容：

- 读取 `package.json`。
- 依次运行可用验证脚本。
- 汇总 build/SEO/images/git 状态。

### 6.3 `.opencode/commands/report.md`

用途：固定报告入口。

建议内容：

- 按 `AGENTS.md` 第 8 节输出报告。
- 包含任务名称、结论、修改文件、具体改动、验证结果、风险、下一步建议、给 GPT 的回填摘要。

## 7. 验证结果

本轮为只读规划，不涉及运行层代码改动。

已执行：

- 读取项目文件列表。
- 确认 `.opencode/` 当前不存在。
- 读取交接模板。
- 读取 `AGENTS.md`。
- 读取 `package.json`。
- 读取最近报告样例。
- 读取内容生产 SOP。
- 读取 AI 阿岩助手匹配逻辑规划。

未执行：

- 未运行 `npm run build`，因为本轮未修改运行层。
- 未运行 `npm run seo:audit`，因为本轮未修改页面/内容。
- 未运行 `npm run images:check`，因为本轮未修改图片或 manifest。

## 8. 风险

1. Skill 写得太泛，会变成另一份 `AGENTS.md`，实际没有增益。
2. Skill 写得太强，会诱导 AI 做批量改动，增加 URL、frontmatter、CTA 误伤风险。
3. 如果把“提交上线”也做成自动 Skill，需要额外保护 `.env`、本地缓存、OpenCode 用量文件和配置备份。
4. AI 阿岩助手 Skill 必须明确“无 LLM、无 API”，否则容易被后续 Agent 误升级成外部服务。
5. 转化路径 Skill 必须保护“资源领取优先问卷/资料说明”，否则可能回到全站跳微信。

## 9. 下一步建议

建议下一批只做脚手架，不碰业务代码：

1. 新建 `.opencode/skills/ayan-content-ops/SKILL.md`
2. 新建 `.opencode/skills/ayan-conversion-qa/SKILL.md`
3. 新建 `.opencode/skills/ayan-assistant-rules/SKILL.md`
4. 新建 `.opencode/skills/ayan-release-check/SKILL.md`
5. 新建 `.opencode/commands/audit.md`
6. 新建 `.opencode/commands/verify.md`
7. 新建 `.opencode/commands/report.md`

验收标准：

- 只新增 `.opencode/` 下文档文件和一份报告。
- 不修改 `src/`、`package.json`、`AGENTS.md`。
- `git diff --stat` 清楚显示只新增 OpenCode 文档。

## 10. 给 GPT 的回填摘要

本轮只读评估了阿岩跨境笔记是否需要开发 OpenCode Agent Skills。结论：建议开发，但只做少量高频项目级 Skill。优先 4 个 skills：`ayan-content-ops`、`ayan-conversion-qa`、`ayan-assistant-rules`、`ayan-release-check`；再配 3 个 commands：`audit.md`、`verify.md`、`report.md`。当前项目尚无 `.opencode/` 目录；本轮未创建 Skill，未修改运行层，仅新增本报告。
