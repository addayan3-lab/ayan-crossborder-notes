# 077 — 所有文章 frontmatter 元数据补齐 (审计 + 待执行方案)

> 状态: **未完成,等用户命令。** 3 篇已改、2 篇发现已存在、10 篇待改,未触发 build / seo:audit / images:check。

## 1. 任务定义

对 `src/content/posts/*.md` 全部 26 篇文章的 frontmatter,补齐 7 个新字段:

| 字段 | 类型 | 取值范围 |
|---|---|---|
| `topic` | enum | `keyword \| listing \| ppc \| review \| ai-search \| tools \| selection` |
| `stage` | enum | `新手 \| 进阶 \| 实操` |
| `intent` | enum | `学习 \| 工具 \| 决策 \| 避坑` |
| `relatedTopics` | string[] | 1-3 个 topic slug,基于内容交叉引用 |
| `publicLessonUse` | string | 一句话,公开课里怎么用 |
| `leadMagnet` | string | 配套资料包名 |
| `wechatHook` | string | 微信钩子,如 `回复关键词"X"领取 Y` |

约束:**只改 frontmatter,不改正文。**

## 2. 审计结果 (26 篇)

### 2.1 已有完整 7 字段的 11 篇 (无需动)

| 文件 | topic | stage | intent |
|---|---|---|---|
| keyword-cleaning-method.md | keyword | 实操 | 工具 |
| listing-five-bullets.md | listing | 实操 | 工具 |
| review-analysis-matrix.md | review | 实操 | 工具 |
| selection-pain-reverse.md | selection | 进阶 | 决策 |
| sp-ad-structure.md | ppc | 实操 | 工具 |
| keyword-learning-path.md | keyword | 新手 | 学习 |
| listing-learning-path.md | listing | 新手 | 学习 |
| ppc-learning-path.md | ppc | 新手 | 学习 |
| review-learning-path.md | review | 新手 | 学习 |
| ai-search-learning-path.md | ai-search | 新手 | 学习 |
| tools-learning-path.md | tools | 新手 | 学习 |

### 2.2 需要补齐的 15 篇 (待改)

| # | 文件 | 计划 topic | stage | intent | relatedTopics |
|---|---|---|---|---|---|
| 1 | 2026-amazon-ai-operations.md | ai-search | 新手 | 学习 | listing,ppc,selection |
| 2 | ai-competitor-matrix.md | selection | 进阶 | 工具 | ai-market-size-estimate,keyword-cleaning-method,listing-five-bullets |
| 3 | ai-keyword-table.md | keyword | 实操 | 工具 | keyword-source-4-types,keyword-cleaning-method,keyword-search-volume-trap |
| 4 | ai-listing-optimization.md | listing | 进阶 | 学习 | listing-five-bullets,listing-checklist,ai-review-analysis |
| 5 | ai-market-size-estimate.md | selection | 进阶 | 决策 | ai-competitor-matrix,selection-pain-reverse,keyword-cleaning-method |
| 6 | ai-operations-resource-pack.md | tools | 新手 | 工具 | ai-keyword-table,ai-listing-optimization,ai-ppc-report-review |
| 7 | ai-ppc-report-review.md | ppc | 实操 | 工具 | new-product-ppc-week-one,sp-ad-structure,keyword-cleaning-method |
| 8 | ai-review-analysis.md | review | 实操 | 工具 | negative-review-listing-fix,review-analysis-matrix,selection-pain-reverse |
| 9 | amazon-rufus-alexa-shopping.md | ai-search | 进阶 | 学习 | consumer-ai-search-amazon,ai-listing-optimization,ai-review-analysis |
| 10 | consumer-ai-search-amazon.md | ai-search | 进阶 | 学习 | amazon-rufus-alexa-shopping,ai-listing-optimization,ai-keyword-table |
| 11 | keyword-search-volume-trap.md | keyword | 进阶 | 避坑 | ai-keyword-table,keyword-cleaning-method,keyword-source-4-types |
| 12 | keyword-source-4-types.md | keyword | 实操 | 工具 | ai-keyword-table,keyword-cleaning-method,keyword-search-volume-trap |
| 13 | listing-checklist.md | listing | 实操 | 工具 | ai-listing-optimization,listing-five-bullets,ai-keyword-table |
| 14 | negative-review-listing-fix.md | review | 实操 | 工具 | ai-review-analysis,review-analysis-matrix,listing-checklist |
| 15 | new-product-ppc-week-one.md | ppc | 新手 | 工具 | sp-ad-structure,ai-ppc-report-review,keyword-cleaning-method |

## 3. 计划填入的 `publicLessonUse / leadMagnet / wechatHook`

| # | publicLessonUse | leadMagnet | wechatHook |
|---|---|---|---|
| 1 | 公开课"AI 运营全局"入口讲稿,选品/Listing/广告/Review/SOP 各一节 | 2026 AI 运营全景图 PDF | 回复关键词"全景"领取 2026 年 AI 运营全景图 |
| 2 | 公开课"选品体系"竞品拆解讲稿 | 4 维度竞品矩阵拆解模板 | 回复关键词"矩阵"领取 4 维度竞品矩阵拆解模板 |
| 3 | 公开课"关键词体系"工具篇讲稿 | 8 字段关键词表模板 | 回复关键词"词表"领取 8 字段关键词表模板 |
| 4 | 公开课"Listing 优化"入口讲稿 | AI 时代 Listing 重写对比模板 | 回复关键词"L重写"领取 AI 时代 Listing 重写对比模板 |
| 5 | 公开课"选品体系"市场判断讲稿 | 市场容量三数字判断模板 | 回复关键词"容量"领取市场容量三数字判断模板 |
| 6 | 公开课"AI 工具集"模块讲稿 | 7 个 AI 工具实操 SOP 手册 | 回复关键词"AI SOP"领取 7 个 AI 工具实操 SOP 手册 |
| 7 | 公开课"PPC 报表"模块讲稿 | PPC 报表 12 字段拆解模板 | 回复关键词"报表"领取 PPC 报表 12 字段拆解模板 |
| 8 | 公开课"Review 体系"工具篇讲稿 | Review 痛点三类型分类模板 | 回复关键词"痛点"领取 Review 痛点三类型分类模板 |
| 9 | 公开课"AI 搜索趋势"模块讲稿 | Rufus 与 Alexa 购物差异对比表 | 回复关键词"Rufus"领取 Rufus 与 Alexa 购物差异对比表 |
| 10 | 公开课"消费者 AI 搜索"模块讲稿 | 消费者 AI 搜索习惯调研表 | 回复关键词"C 搜索"领取消费者 AI 搜索习惯调研表 |
| 11 | 公开课"关键词体系"避坑讲稿 | 搜索量 5 大陷阱清单 | 回复关键词"陷阱"领取搜索量 5 大陷阱清单 |
| 12 | 公开课"关键词体系"工具篇讲稿 | 4 类关键词源拆解模板 | 回复关键词"4 源"领取 4 类关键词源拆解模板 |
| 13 | 公开课"Listing 优化"工具篇讲稿 | Listing 自检 28 项模板 | 回复关键词"自检"领取 Listing 自检 28 项模板 |
| 14 | 公开课"Review 体系"工具篇讲稿 | 差评归因到 Listing 修复模板 | 回复关键词"差评"领取差评归因到 Listing 修复模板 |
| 15 | 公开课"PPC 入门"工具篇讲稿 | 新品第 1 周 PPC 节奏表 | 回复关键词"首周"领取新品第 1 周 PPC 节奏表 |

## 4. 当前执行状态

- **已改 3 篇** (frontmatter 已写入,未跑 build 验证):
  - `2026-amazon-ai-operations.md`
  - `ai-keyword-table.md`
  - `ai-listing-optimization.md`
- **发现已存在 2 篇** (oldString == newString,无需动):
  - `ai-competitor-matrix.md`
  - `ai-market-size-estimate.md`
- **待改 10 篇**:
  - `ai-operations-resource-pack.md`
  - `ai-ppc-report-review.md`
  - `ai-review-analysis.md`
  - `amazon-rufus-alexa-shopping.md`
  - `consumer-ai-search-amazon.md`
  - `keyword-search-volume-trap.md`
  - `keyword-source-4-types.md`
  - `listing-checklist.md`
  - `negative-review-listing-fix.md`
  - `new-product-ppc-week-one.md`

> ⚠️ 审计口径修正:实际 13/26 已完整 (11 个本来 + 2 个由执行 no-op 确认),不是先前 11/26。

## 5. 还没跑

- `npm run build` — 验证 frontmatter schema 不报错
- `npm run seo:audit` — 期望 296+ pass / 0 fail
- `npm run images:check` — 期望 7/0/0/0
- Pagefind 索引 — 期望 `Indexed 3 filters` (topic/stage/intent)
- 报告尾部 "结论 + 下一步建议" 段落

## 6. 等用户命令

请选择:

- **A. 继续**:把剩下 10 篇按上表执行,然后跑 build / seo:audit / images:check
- **B. 调整方案**:对某一篇的 topic / stage / intent / 三个钩子字段不满意,逐条给新值
- **C. 回滚**:把已改 3 篇恢复原状,等重新方案
- **D. 暂停**:不写文件,先在对话里过一遍字段值
