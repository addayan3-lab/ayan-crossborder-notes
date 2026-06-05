# 160-166 剩余文章导航规划 V01 报告

## 执行结论：成功（仅规划，未修改代码/文章）

## 全站文章导航覆盖统计

| 指标 | 数值 |
|------|------|
| 文章总数 | 28 |
| 已配置 prevArticle | 10 |
| 已配置 nextArticle | 10 |
| 已配置 relatedArticleLinks | 15 |
| 完整纳入 5 条链路 | 15 |
| 未纳入任何导航链路 | 13 |

## 已完成链路（15 篇）

| 链路 | 文章数 | 文章 slug |
|------|--------|-----------|
| 选品 | 3 | ai-market-size-estimate, ai-competitor-matrix, selection-pain-reverse |
| 关键词 | 3 | keyword-source-4-types, keyword-cleaning-method, keyword-search-volume-trap |
| Listing | 3 | listing-five-bullets, listing-checklist, ai-listing-optimization |
| PPC | 3 | new-product-ppc-week-one, sp-ad-structure, ai-ppc-report-review |
| Review | 3 | ai-review-analysis, review-analysis-matrix, negative-review-listing-fix |

## 未覆盖文章清单（13 篇）

| # | slug | topic | stage | 建议 |
|---|------|-------|-------|------|
| 1 | consumer-ai-search-amazon | ai-search | 进阶 | **建议纳入 AI 搜索链路（第 1 篇）** |
| 2 | amazon-rufus-alexa-shopping | ai-search | 进阶 | **建议纳入 AI 搜索链路（第 2 篇）** |
| 3 | 2026-amazon-ai-operations | ai-search | 新手 | **建议纳入 AI 搜索链路（第 3 篇）** |
| 4 | ai-search-learning-path | ai-search | 新手 | 不纳入 — 学习路径入口页 |
| 5 | amazon-ai-tools-review | ai-search | 新手 | 不纳入 — 工具评测单篇 |
| 6 | ai-operations-resource-pack | tools | 新手 | 不纳入 — 资料包说明页 |
| 7 | amazon-platform-rules-beginner | tools | 新手 | 不纳入 — 与系列文章主题差异大 |
| 8 | tools-learning-path | tools | 新手 | 不纳入 — 学习路径入口页 |
| 9 | ai-keyword-table | keyword | 实操 | **建议作为关键词链路的关联阅读** |
| 10 | keyword-learning-path | keyword | 新手 | 不纳入 — 学习路径入口页 |
| 11 | listing-learning-path | listing | 新手 | 不纳入 — 学习路径入口页 |
| 12 | ppc-learning-path | ppc | 新手 | 不纳入 — 学习路径入口页 |
| 13 | review-learning-path | review | 新手 | 不纳入 — 学习路径入口页 |

### 建议纳入的未覆盖文章：4 篇
- consumer-ai-search-amazon（AI 搜索第 1 篇）
- amazon-rufus-alexa-shopping（AI 搜索第 2 篇）
- 2026-amazon-ai-operations（AI 搜索第 3 篇）
- ai-keyword-table（关键词链路关联阅读）

## AI 搜索链路建议

### 推荐链路（3 篇主文）

| 顺序 | slug | label | context |
|------|------|-------|---------|
| 第 1 篇 | consumer-ai-search-amazon | 消费者 AI 搜索 | AI 搜索第 1 篇 |
| 第 2 篇 | amazon-rufus-alexa-shopping | Rufus/Alexa 对卖家影响 | AI 搜索第 2 篇 |
| 第 3 篇 | 2026-amazon-ai-operations | AI 提升运营效率 | AI 搜索第 3 篇 |

### 不纳入链路的文章
- `ai-search-learning-path` — 学习路径入口页，不适合 prev/next 连线
- `amazon-ai-tools-review` — 工具评测单篇，主题定位不同

### 建议执行：167-169

## 工具资料链路建议

### 结论：不建议形成线性链路

三篇候选文章主题差异大：
- `ai-operations-resource-pack` → 资料包领取说明
- `amazon-platform-rules-beginner` → 平台规则避坑
- `tools-learning-path` → 工具学习路径入口

强行连线对读者无帮助。建议保持现状。

### ai-keyword-table 关联阅读建议

在关键词链路 3 篇文章的 `relatedArticleLinks` 中增加 `ai-keyword-table`，并在 `ai-keyword-table` 中指向 3 篇主链。

### 建议执行：170（关键词扩展）、171（不执行）、172（学习路径不接入）

## 资源详情页导航建议

| 项目 | 建议 |
|------|------|
| 是否需要"上一个资料包/下一个资料包" | 不建议。7 个资源详情页为独立工具模板，无顺序关系 |
| 是否需要关联推荐 | 不建议。当前 index.astro 已展示全部资源，足够清晰 |
| 是否复用 ArticleNavHints | 不适用。资源页是 Astro page，非 content collection |
| 优先级 | 低 |

## 公开课详情页导航建议

| 项目 | 建议 |
|------|------|
| 是否需要"上一节/下一节" | **建议做**。8 节公开课有明确教学顺序 |
| 第 1 节 | 无"上一节" |
| 第 8 节 | 无"下一节" |
| 组件位置 | 页面 hero 下方或底部 |
| 是否复用 ArticleNavHints | **不建议**。公开课是 Astro page，需新建 `LessonNav.astro` |
| 链接行为 | `target="_blank" rel="noopener noreferrer"` |
| 优先级 | 中 |

### 建议执行：173-175

## 新增文档清单

| 文件 | 说明 |
|------|------|
| `docs/internal-linking-rules.md` | 内部链接规则文档 ✅ |
| `docs/next-nav-tasks-167-175-plan.md` | 下一批任务规划 ✅ |

## 边界检查

| 项目 | 结果 |
|------|------|
| 是否修改代码 | 否 ✅ |
| 是否修改文章 | 否 ✅ |
| 是否修改 frontmatter | 否 ✅ |
| 是否新增文章 | 否 ✅ |
| 是否 commit | 否 ✅ |
| 是否 push | 否 ✅ |
| 是否读取 auth.json | 否 ✅ |
| 是否 IndexNow | 否 ✅ |

## 下一步建议

### 立即执行
- **167-169**：AI 搜索链路接入（3 篇文章 frontmatter）
- **170**：ai-keyword-table 关联阅读纳入关键词链路
- **173-175**：公开课详情页 LessonNav 组件开发

### 不执行
- 工具资料链路（171）：主题差异大，不建议连线
- 学习路径页接入导航（172）：入口页不适合系列导航
- 资源详情页导航（163）：无顺序需求

### 长期
- 将 `docs/internal-linking-rules.md` 作为后续新文章开发的 checklist
