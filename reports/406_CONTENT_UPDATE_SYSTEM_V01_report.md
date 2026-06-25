# 任务名称

后续更新与定期更新机制 - 第 5 批

# 执行结论

已建立内容更新机制，覆盖重点简报选题池、季度复核清单、过期内容标记和更新审计流程。本轮新增可选 frontmatter 更新字段、新增 `content:update-audit` 审计脚本，并给首批高时效文章补上复核字段和官方来源。

# 修改文件

- `src/content.config.ts`
- `package.json`
- `scripts/content-update-audit.mjs`
- `scripts/new-post.mjs`
- `docs/content-update-system.md`
- `docs/news-brief-topic-pool.md`
- `docs/quarterly-content-review-checklist.md`
- `docs/content-production-sop.md`
- `docs/post-publish-checklist.md`
- `src/content/posts/amazon-title-rule-75-characters-2026.md`
- `src/content/posts/amazon-platform-rules-beginner.md`
- `src/content/posts/amazon-rufus-alexa-shopping.md`
- `src/content/posts/2026-amazon-ai-operations.md`
- `reports/content-update-audit-report.md`
- `reports/406_CONTENT_UPDATE_SYSTEM_V01_report.md`

# 具体改动

1. 新增 frontmatter 可选字段：
   - `updateType`
   - `updateStatus`
   - `lastReviewed`
   - `nextReviewDue`
   - `reviewCadenceDays`
   - `updateNote`
   - `sourceUrls`

2. 新增命令：

```powershell
npm run content:update-audit
```

3. 新增审计脚本：
   - 扫描 `src/content/posts/*.md`
   - 判断已过复核日期、14 天内到期、高时效文章缺标记
   - 输出 `reports/content-update-audit-report.md`

4. 新增长期文档：
   - `docs/content-update-system.md`：字段、状态、节奏、重点简报流程、季度复核流程
   - `docs/news-brief-topic-pool.md`：重点简报选题池、P0/P1/P2 优先级、记录模板
   - `docs/quarterly-content-review-checklist.md`：季度复核执行清单

5. 更新现有 SOP：
   - `docs/content-production-sop.md` 增加更新字段与 `content:update-audit`
   - `docs/post-publish-checklist.md` 增加 `content:update-audit`
   - `scripts/new-post.mjs` 默认给新文章加 evergreen 复核字段，180 天后复核

6. 首批打标文章：
   - `amazon-title-rule-75-characters-2026`：`news-brief`，2026-07-28 复核
   - `amazon-platform-rules-beginner`：`policy-sensitive`，2026-09-25 复核
   - `amazon-rufus-alexa-shopping`：`platform-update`，2026-09-25 复核
   - `2026-amazon-ai-operations`：`platform-update`，2026-09-25 复核

# 验证结果

- `npm run build`：通过，生成 130 个页面，Pagefind 索引 130 页。
- `npm run images:check`：通过，manifest 115 项，缺失文件 0，重复 ID 0，孤立资源 0。
- `npm run content:update-audit`：通过。
  - 文章总数：97
  - 已设置更新标记：4
  - 高时效主题文章：16
  - 已过复核日期：0
  - 需要补标记/补来源：12
  - 14 天内到期：0
- `npm run seo:audit`：仍为 1040 pass / 8 fail；失败项仍集中在百度验证静态页 `baidu_verify_codeva-IH9obSJr6f.html`，不属于本轮机制改动。

# 风险

1. 本轮只给 4 篇高时效文章补了更新字段，剩余 12 篇由审计报告列出，建议后续逐步补齐。
2. `content:update-audit` 目前是轻量 frontmatter 审计，不会自动联网检查官方来源是否变化。
3. `news-brief` 的信息仍需要人工确认官方来源，脚本只能提醒复核日期和缺字段。

# 下一步建议

第 6 批建议处理 `reports/content-update-audit-report.md` 中列出的 12 篇待补标记文章，优先补：

1. `ai-rufus-listing-writing-2026`
2. `consumer-ai-search-amazon`
3. `ai-search-learning-path`
4. `tools-account-health-self-check`
5. `case-platform-warning-email-checklist`

# 给 GPT 的回填摘要

第 5 批已建立内容更新机制：新增更新字段、重点简报选题池、季度复核清单、`npm run content:update-audit` 审计脚本，并给 4 篇高时效文章打标。构建、图片检查和内容更新审计通过；SEO 仍只有百度验证页 8 项失败。
