# 263: Fix AI Assistant Open-Class Topic & Fallback

## 执行结论

**成功** — 修复了 261 报告发现的全部 3 个问题：新增 open-class topic、统一 fallback 行为、补齐弱匹配。

## 修复了哪些 261 问题

| # | 261 发现 | 修复方式 |
|---|----------|----------|
| 缺少 open-class topic | 新增 `open-class` topic（trigger: 公开课/课程/讲座/直播/免费课/实操课，strong: 公开课/课程安排/全部公开课） |
| "公开课讲什么"无匹配 | 现在命中 open-class topic（303 分），推荐公开课文章 + 3 门精选课程 |
| 客户端/服务端 fallback 不一致 | 统一为 `bestScore > 0 ? best : null`（客户端当前行为），移除服务端默认兜底到 beginner |
| "从哪里" vs "从哪"弱匹配 | `beginner` triggerKeywords 补充 "从哪" |
| "我想领表格"仅 2 分 | `tools` strongKeywords 补充 "表格"（现 202 分） |
| fallback 缺少公开课入口 | 浮窗 + ask 页 fallback 按钮增加 "🎓 公开课" |

**额外修复：** 全部 9 个 topic 的 `openClasses.title` 与 `open-class/index.astro` 实际标题对齐（之前有 7 处名称不匹配）。

## 修改文件

3 个文件，+35 / −11：

### `src/data/ayan-assistant-rules.ts` (+32 / −11)
- 新增 `open-class` topic（完整结构）
- `beginner` triggerKeywords 补充 "从哪"
- `tools` strongKeywords 补充 "表格"
- 对齐 7 处 `openClasses.title` 与真实页面标题
- 修复 `matchTopic` 返回类型为 `AssistantTopic | null`，移除默认兜底到 beginner

### `src/components/FloatingAyanAssistant.astro` (+1)
- fallback 按钮增加 `🎓 公开课`

### `src/pages/ask/index.astro` (+1)
- fallback 按钮增加 `🎓 公开课`

## 9 条 Query 测试结果

| Query | 命中 topic | 分数 | 文章推荐 | 资源推荐 | 公开课推荐 | 推荐顺序 |
|-------|-----------|------|---------|---------|-----------|---------|
| 广告 ACOS 太高怎么办 | **ppc** | 606 | ppc 3 篇 | ppc 模板 | 折叠 in extras | ✅ 文章优先 |
| 不知道怎么找关键词 | **keyword** | 203 | keyword 3 篇 | 清洗模板 | 折叠 in extras | ✅ 文章优先 |
| Listing 转化差怎么优化 | **listing** | 9 | listing 3 篇 | 自检清单 | 折叠 in extras | ✅ 文章优先 |
| 怎么分析差评 | **review** | 202 | review 3 篇 | 痛点分析 | 折叠 in extras | ✅ 文章优先 |
| 想判断一个产品能不能做 | **selection** | 400 | selection 3 篇 | 竞品矩阵 | 折叠 in extras | ✅ 文章优先 |
| AI 搜索怎么用 | **ai-search** | 404 | ai-search 3 篇 | 工具评测 | 折叠 in extras | ✅ 文章优先 |
| 新手从哪开始 | **beginner** | 206 | beginner 3 篇 | 清洗模板 | 折叠 in extras | ✅ 文章优先 |
| 我想领表格 | **tools** | 202 | tools 2 篇 | AI 评测表 | 无 | ✅ 文章优先 |
| 公开课讲什么 | **open-class** | 303 | 公开课中心 1 篇 | 无 | 3 门精选课程 | ✅ 公开课优先（用户意图明确） |

## 服务端/客户端 fallback 一致性

**已统一。** `matchTopic` 在两端行为完全一致：
- 服务端（`ayan-assistant-rules.ts`）：返回 `bestScore > 0 ? best : null`（原返回 `best || beginner`）
- 客户端（`FloatingAyanAssistant.astro`、`ask/index.astro`）：返回 `bestScore > 0 ? best : null`
- 无匹配时两端均显示 fallback 方向按钮

## 验证结果

| 检查项 | 结果 |
|--------|------|
| `npm run build` | ✅ 57 pages, 0 errors |
| `npm run seo:audit` | ✅ 456/0 (pass/fail) |
| `npm run images:check` | ✅ 49/0/0/0 |
| `reports/seo-audit-report.md` | ✅ restored to HEAD |

## 遗留问题

- **P2**: 缺少自动化样本测试脚本（`npm run assistant:test`）
- **P2**: 浮窗助手只展示前 2 篇文章，open-class topic 只有 1 篇——适合浮窗，无需修改
- **P2**: "从哪开始学"（不含"新手"）仍无法匹配 beginner（"怎么学"含"学"但不在 query 中）

## 风险

- 低：新增 topic 不影响已有 9 个 topic 的匹配分数
- 低：统一 fallback 为 null 只影响无匹配场景（之前服务端兜底到 beginner，现在和客户端一样显示方向按钮）
- 无业务逻辑、部署配置、依赖变更
- 保持无 LLM、无 API、无数据收集

## 下一步建议

1. 如确认本次修改无误，建议 commit + push
2. 可考虑建立 `npm run assistant:test` 自动化样本测试脚本
3. 后续可修复 P1 问题（公开课详情页 wechat-block 文案对齐、资源页到特定课程链接）

## 给 GPT 的回填摘要

263 修复了 AI 阿岩助手的 3 个核心问题。新增 open-class topic（含公开课/课程/讲座/直播/免费课/实操课 triggerKeywords，推荐公开课中心文章和 3 门精选课程），"公开课讲什么" query 现在稳定命中（303 分）。统一客户端/服务端 matchTopic fallback 为 `bestScore > 0 ? best : null`（两端一致）。补充 beginner 的"从哪"和 tools 的"表格" strongKeywords。对齐全部 9 个 topic 的 openClasses 标题与真实页面一致。3 个文件 +35/-11，build/seo/images 全通过。
