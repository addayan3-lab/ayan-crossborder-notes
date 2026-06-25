# 402 文章结构字段与重复 H1 修复执行报告

## 一、任务名称

全站文章第 1 批结构修复：frontmatter、重复 H1、基础 SEO

## 二、执行结论

已完成第 1 批文章结构修复。本批只处理文章结构字段和重复 H1，不扩写正文、不补封面、不改 URL、不删除文件。修复后，97 篇文章的核心 frontmatter 缺失为 0，内容编排字段缺失为 0，正文 Markdown H1 为 0。

## 三、修改文件

主要修改：
- `src/content/posts/*.md` 中 53 篇文章
- `reports/seo-audit-report.md`
- `reports/402_ARTICLE_STRUCTURE_FIX_V01_report.md`

代表性修复文件：
- `src/content/posts/ai-amazon-operator-prompt-library.md`
- `src/content/posts/ai-rufus-listing-writing-2026.md`
- `src/content/posts/new-seller-90-day-operation-rhythm.md`
- `src/content/posts/keyword-buyer-intent-layering.md`
- `src/content/posts/listing-mobile-first-optimization.md`
- `src/content/posts/ppc-tacos-weekly-review.md`
- `src/content/posts/review-voice-of-customer-tagging.md`
- `src/content/posts/selection-seasonality-risk-check.md`
- `src/content/posts/tools-weekly-business-review-dashboard.md`

## 四、具体改动

- 为缺失 `draft` 的 13 篇文章补 `draft: false`。
- 为 `new-seller-90-day-operation-rhythm.md` 补 `leadMagnet` 和 `wechatHook`。
- 为 40 篇文章补 `relatedTopics` 与 `publicLessonUse`。
- 移除 20 篇正文开头重复 Markdown H1，避免页面布局 H1 与正文 H1 叠加。
- 修正批量补字段时的 YAML 顺序，确保 `relatedTopics` 保持数组结构。
- 未修改正文观点、段落内容、URL、资源领取路径、部署配置或运行层代码。

## 五、验证结果

- `npm run build:astro`：通过，生成 130 页。
- `npm run build`：通过，生成 130 页并重建 Pagefind 索引。
- `npm run seo:audit`：未全站通过，但失败项从 28 降至 8；剩余 8 项集中在 `baidu_verify_codeva-IH9obSJr6f.html` 这类验证静态文件缺少 title/description/H1/canonical/OG/Twitter 信息，非文章问题。
- `npm run images:check`：missing files 0，duplicate ids 0；仍有 20 个历史 orphan 图片提示，属于第 2 批封面/manifest 工作范围。
- 自定义只读矩阵：
  - 核心字段缺失：0
  - `relatedTopics` / `publicLessonUse` 缺失：0
  - 正文 Markdown H1：0

## 六、风险

- 本批为机械结构修复，未逐篇重写正文，因此内容薄弱、内链不足和封面缺失仍需后续批次处理。
- `seo:audit` 仍因百度验证文件返回 8 个失败项；为避免影响站点验证，本批未修改该验证文件。
- `images:check` 仍有历史 orphan 图片提示，待第 2 批统一处理。

## 七、下一步建议

1. 执行第 2 批：补封面文件与 `image-manifest.json`，优先处理 34 篇无封面或封面路径失效文章。
2. 执行第 3 批：为 32 篇内链不足文章补 2-4 个相关站内链接。
3. 执行第 4 批：扩写 31 篇偏薄文章，优先处理早期 AI/Listing/PPC 基础文和 AI Prompt 系列。

## 八、给 GPT 的回填摘要

### 执行内容
- 完成文章结构修复第 1 批。
- 53 篇文章被修改，主要为 frontmatter 补字段和移除重复 H1。
- 未扩写正文、未补封面、未改 URL。

### 验证
- build 通过。
- SEO 失败从 28 降到 8，剩余为百度验证静态文件，不是文章页。
- 图片检查缺失 0、重复 0，历史 orphan 20 项。

### 后续
- 下一批建议执行封面与 manifest 补齐。
