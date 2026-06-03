# 096-100_RESOURCE_DETAIL_PAGES_BATCH_V02 报告

## 基本信息

| 项目 | 内容 |
|------|------|
| 执行日期 | 2026-06-03 |
| 批次 | 096-100 V02 |
| 前置批次 | 093-095（已完成 3 个详情页） |

## 执行结论

**成功** — 4 个资源详情页全部创建完成，/resources/ 入口更新完毕，build/SEO/images 全部通过。

## 新增资源详情页清单

| 编号 | 文件名 | 资料名 | 微信关键词 |
|------|--------|--------|-----------|
| 096 | `src/pages/resources/review-pain-analysis.astro` | Review 痛点分析表 | "痛点" |
| 097 | `src/pages/resources/competitor-selection-matrix.astro` | 选品竞品矩阵 | "矩阵" |
| 098 | `src/pages/resources/ai-tools-review-sheet.astro` | AI 工具评测表 | "AI评测" |
| 099 | `src/pages/resources/platform-rules-checklist.astro` | 新手规则避坑清单 | "规则" |

## /resources/ 更新清单

`src/pages/resources/index.astro` 的 `detailPageSlugs` 新增 4 条映射：

| 文章 slug | 详情页 slug |
|-----------|------------|
| ai-review-analysis | review-pain-analysis |
| ai-competitor-matrix | competitor-selection-matrix |
| amazon-ai-tools-review | ai-tools-review-sheet |
| amazon-platform-rules-beginner | platform-rules-checklist |

现有 3 条映射（keyword-cleaning-method、listing-checklist、ai-ppc-report-review）保持不变。

## 4 个详情页 URL

- https://amz.hao1234.top/resources/review-pain-analysis/
- https://amz.hao1234.top/resources/competitor-selection-matrix/
- https://amz.hao1234.top/resources/ai-tools-review-sheet/
- https://amz.hao1234.top/resources/platform-rules-checklist/

## 详情页内容检查

### 096 Review 痛点分析表

| 检查项 | 结果 |
|--------|------|
| 资料名 | ✓ Review 痛点分析表 |
| 适合谁用 | ✓ 已有竞品评价、差评样本的卖家 |
| 什么时候用 | ✓ 选品前、Listing 优化前、差评集中出现后 |
| 字段说明 | ✓ 8 字段（Review 类型/用户原话/痛点归类/影响环节/是否产品问题/是否页面表达问题/对应修复动作/优先级） |
| 使用步骤 | ✓ 5 步（收集→分类→区分→反推→回填） |
| 对应文章 | ✓ 3 篇（ai-review-analysis / review-analysis-matrix / negative-review-listing-fix） |
| 学习路径 | ✓ review-learning-path |
| 微信关键词 | ✓ "痛点" |
| 边界说明 | ✓ 使用边界与提醒部分 |

### 097 选品竞品矩阵

| 检查项 | 结果 |
|--------|------|
| 资料名 | ✓ 选品竞品矩阵 |
| 适合谁用 | ✓ 判断产品能不能做的新手和进阶卖家 |
| 什么时候用 | ✓ 选品初筛后、决定是否打样前 |
| 字段说明 | ✓ 9 字段（竞品 ASIN/价格/Review 数/评分/核心卖点/差评痛点/图片表达/广告强度/机会判断） |
| 使用步骤 | ✓ 5 步（选竞品→填数据→拆卖点→找痛点→判断机会） |
| 对应文章 | ✓ 3 篇（ai-competitor-matrix / ai-market-size-estimate / selection-pain-reverse） |
| 学习路径 | ✓ /resources/（选品无独立 learning-path） |
| 微信关键词 | ✓ "矩阵" |
| 边界说明 | ✓ 使用边界与提醒部分 |

### 098 AI 工具评测表

| 检查项 | 结果 |
|--------|------|
| 资料名 | ✓ AI 工具评测表 |
| 适合谁用 | ✓ 想用 AI 提效但不确定哪些值得用的卖家 |
| 什么时候用 | ✓ 购买 AI 工具前、团队引入工具前 |
| 字段说明 | ✓ 7 字段（工具名称/适用场景/输入数据/输出结果/人工复核点/风险点/是否值得长期使用） |
| 使用步骤 | ✓ 5 步（明确任务→测试输入输出→评估时间→检查风险→纳入 SOP） |
| 对应文章 | ✓ 3 篇（amazon-ai-tools-review / 2026-amazon-ai-operations / ai-search-learning-path） |
| 学习路径 | ✓ ai-search-learning-path |
| 微信关键词 | ✓ "AI评测" |
| 边界说明 | ✓ 使用边界与提醒部分 |

### 099 新手规则避坑清单

| 检查项 | 结果 |
|--------|------|
| 资料名 | ✓ 新手规则避坑清单 |
| 适合谁用 | ✓ 刚开始做亚马逊的新手卖家 |
| 什么时候用 | ✓ 产品上架前、Listing 发布前、AI 内容发布前 |
| 字段说明 | ✓ 6 字段（风险场景/可能问题/检查动作/是否需要人工复核/是否需要查官方要求/备注） |
| 使用步骤 | ✓ 5 步（查 Listing→查图片→查 Review→查 AI 内容→标记不确定项） |
| 对应文章 | ✓ 3 篇（amazon-platform-rules-beginner / amazon-ai-tools-review / listing-learning-path） |
| 学习路径 | ✓ tools-learning-path |
| 微信关键词 | ✓ "规则" |
| 边界说明 | ✓ 使用边界与提醒部分 |

## 微信关键词检查结果

| 关键词 | 是否唯一 | 对应页面 |
|--------|---------|---------|
| 痛点 | ✓ 唯一 | review-pain-analysis |
| 矩阵 | ✓ 唯一 | competitor-selection-matrix |
| AI评测 | ✓ 唯一 | ai-tools-review-sheet |
| 规则 | ✓ 唯一 | platform-rules-checklist |

全部 7 个详情页关键词（清洗、自检、报表、痛点、矩阵、AI评测、规则）均无重复。

## 是否有 404 风险

无。/resources/ 页面通过 `detailPageSlugs` map 条件渲染「查看资料详情 →」按钮，只有 7 个已建详情页的 slug 才会显示链接，其余 21 张卡片不出现详情页链接。

## 验收结果

| 检查项 | 结果 |
|--------|------|
| build | ✓ 47 页 / 3004 词 / 3 filters / 0 error |
| seo:audit | ✓ 376 pass / 0 fail |
| images:check | ✓ 7 manifest / 0 missing / 0 duplicate / 0 orphan |
| Pagefind filters | ✓ 仍为 3（topic / stage / intent） |
| 页面数量 | 43 → 47（+4 新详情页） |

## 变更记录

| 项目 | 结果 |
|------|------|
| 是否生成 PDF | 否 |
| 是否新增普通文章 | 否 |
| 是否修改文章正文 | 否 |
| 是否处理 IndexNow | 否 |
| 是否修改代码 | 是（/resources/ index.astro + 新增 4 个 astro 文件） |
| 是否 commit | 否 |
| 是否 push | 否 |

## 文件变更清单

| 操作 | 文件 |
|------|------|
| 新增 | `src/pages/resources/review-pain-analysis.astro` |
| 新增 | `src/pages/resources/competitor-selection-matrix.astro` |
| 新增 | `src/pages/resources/ai-tools-review-sheet.astro` |
| 新增 | `src/pages/resources/platform-rules-checklist.astro` |
| 修改 | `src/pages/resources/index.astro`（+4 条 detailPageSlugs 映射） |
| 自动生成 | `reports/seo-audit-report.md` |

## 下一步建议

1. **commit + push**：用户验收后提交本次变更。
2. **Cloudflare 部署**：推送后等待部署完成，验证 4 个新 URL 线上 200。
3. **IndexNow**：部署后重试 IndexNow 提交（含 4 个新详情页 URL）。
4. **继续 101+**：参考 `docs/next-tasks-093-110-plan.md` 继续下一批任务。
