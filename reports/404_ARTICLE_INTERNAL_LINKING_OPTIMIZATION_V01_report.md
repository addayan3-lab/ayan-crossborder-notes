# 任务名称

全站文章内链与系列导航优化 - 第 3 批

# 执行结论

已完成第 3 批文章导航优化。按照 `docs/internal-linking-rules.md`，本轮不在正文硬编码站内链接，改为通过 frontmatter 的 `prevArticle`、`nextArticle`、`relatedArticleLinks` 补全系列导航和相关卡片。

# 修改文件

- 更新 52 篇文章的 frontmatter 导航字段。
- 重点补全 6 条系列链路：关键词、Listing、PPC、Review、AI 搜索、AI 身份 Prompt。
- 修复 9 个历史无效导航 slug，避免导航卡片指向不存在页面。
- 新增本报告：`reports/404_ARTICLE_INTERNAL_LINKING_OPTIMIZATION_V01_report.md`

# 具体改动

1. 为关键词、Listing、PPC、Review 系列补齐连续的上一篇、下一篇和系列文章卡片。
2. 为 AI 搜索链路补齐 `consumer-ai-search-amazon`、`amazon-rufus-alexa-shopping`、`2026-amazon-ai-operations`、`ai-rufus-listing-writing-2026` 之间的前后篇关系。
3. 为 10 篇 AI 身份 Prompt 文章补齐顺序导航。
4. 为案例页和规则页补充相关导航卡片，例如 Listing 转化案例、新品第一周复盘、Review 反推改进、平台规则入门。
5. 替换历史断链 slug：
   - `ai-prompt-product-research-sop`
   - `ai-prompt-listing-human-review`
   - `ppc-budget-allocation-first-month`
   - `keyword-search-intent-map`
   - `listing-title-2026-structure`
   - `selection-certification-logistics-precheck`
   - `tools-report-folder-weekly-system`

# 验证结果

- `npm run build`：通过，生成 130 个页面，Pagefind 索引 130 页。
- `npm run images:check`：通过，manifest 115 项，缺失文件 0，重复 ID 0，孤立资源 0。
- `npm run seo:audit`：仍为 1040 pass / 8 fail；失败项仍集中在百度验证静态页 `baidu_verify_codeva-IH9obSJr6f.html` 缺 SEO 元信息，不是文章导航改动引入。
- 自定义导航检查：断链 0。
- 自定义导航检查：学习路径页与资料包页未被强行加入系列导航。

# 风险

1. 关键词系列目前存在标题序号缺第 4 篇的历史问题，本轮按现有文章标题保留实际序号，未新增或改名文章。
2. 本轮只优化 frontmatter 导航，不扩写正文内容；薄内容文章仍需进入下一批处理。
3. SEO 审计仍因百度验证静态页返回 8 个失败项，后续可单独决定是否排除验证文件或改审计规则。

# 下一步建议

第 4 批进入薄内容扩写与内容质量优化：优先处理正文仍是占位或篇幅明显不足的文章，补齐真实步骤、判断标准、案例和对应资料领取建议。

# 给 GPT 的回填摘要

第 3 批已完成全站文章 frontmatter 导航优化：补齐关键词、Listing、PPC、Review、AI 搜索、AI 身份 Prompt 等链路，修复 9 个历史无效导航 slug。构建和图片检查通过，SEO 审计仍只有百度验证页 8 项失败。下一批建议做薄内容扩写。
