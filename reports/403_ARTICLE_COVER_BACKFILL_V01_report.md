# 403 文章封面与图片 Manifest 补齐执行报告

## 一、任务名称

全站文章第 2 批：封面文件与 `image-manifest.json` 补齐

## 二、执行结论

已完成第 2 批文章封面补齐。本批只补文章封面、frontmatter `image` 字段和图片 manifest，不扩写正文、不改 URL、不删除文件、不触碰运行层或部署配置。

## 三、修改文件

主要修改：
- `src/data/image-manifest.json`
- 14 篇原本缺 `image` 字段的文章 frontmatter
- 新增 34 个文章封面 SVG 文件
- `reports/403_ARTICLE_COVER_BACKFILL_V01_report.md`

新增封面目录覆盖：
- `public/images/articles/ai-amazon-operator-prompt-library/`
- `public/images/articles/ai-operations-resource-pack/`
- `public/images/articles/ai-role-*/`
- `public/images/articles/case-*/`
- `public/images/articles/keyword-buyer-intent-layering/`
- `public/images/articles/keyword-negative-word-library/`
- `public/images/articles/listing-mobile-first-optimization/`
- `public/images/articles/listing-price-coupon-conversion-check/`
- `public/images/articles/ppc-search-term-to-campaign-sop/`
- `public/images/articles/ppc-tacos-weekly-review/`
- `public/images/articles/review-voice-of-customer-tagging/`
- `public/images/articles/selection-*/`
- `public/images/articles/tools-weekly-business-review-dashboard/`

## 四、具体改动

- 为 14 篇原本无 `image` 字段的文章补 `/images/articles/{slug}/cover.svg`。
- 为 34 篇缺失实际封面文件的文章生成轻量 SVG 封面。
- 将所有未登记的文章封面补入 `src/data/image-manifest.json`。
- manifest 项目数从 61 增至 115。
- 图片 alt 文案按文章标题生成，便于文章页封面图和社交分享使用。

## 五、验证结果

- `npm run images:check`：通过。
  - manifest items：115
  - missing files：0
  - duplicate ids：0
  - orphan assets：0
- 自定义 frontmatter 图片检查：badImageCount 0。
- `npm run build:astro`：通过，生成 130 页。
- `npm run build`：通过，生成 130 页并重建 Pagefind 索引。
- `npm run seo:audit`：未全站通过，仍为 8 个失败项，集中在百度验证静态文件 `baidu_verify_codeva-IH9obSJr6f.html` 缺少 SEO 元信息，非文章页问题。

## 六、风险

- 本批 SVG 封面为统一模板生成，视觉差异化有限；后续可按高流量专题替换为更精细的专题封面。
- `view_image` 无法处理本地 SVG 预览，本批主要通过构建、路径和 manifest 完整性验证。
- 仍有内容薄文和内链不足问题，留给第 3 批和第 4 批处理。

## 七、下一步建议

1. 执行第 3 批：为内链不足文章补 2-4 个相关站内链接。
2. 对首页/专题页高曝光文章，可后续单独设计更高质量封面，而不是继续使用统一模板。
3. SEO 剩余 8 项是否修复，需要单独评估百度验证文件是否允许加 HTML 外壳；本批不建议改。

## 八、给 GPT 的回填摘要

### 执行内容
- 完成第 2 批封面与 manifest 补齐。
- 14 篇文章补 `image` 字段。
- 新增 34 个 SVG 封面。
- `image-manifest.json` 补齐到 115 项。

### 验证
- 图片检查 115/0/0/0：无缺失、无重复、无孤儿图片。
- build 通过。
- SEO 仍剩 8 个百度验证文件相关失败。

### 后续
- 下一批建议执行文章内链优化。
