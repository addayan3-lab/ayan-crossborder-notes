# 任务名称

第 2-5 批内容优化同步上线与下一步规划

# 执行结论

已将第 2-5 批文章结构、封面补齐、内链导航、薄内容扩写和定期更新机制同步到网站代码仓库，并推送到 `origin/main`，触发线上部署。

# 同步信息

- 分支：`main`
- 提交：`a7098dd feat: improve article content and update workflow`
- 推送结果：成功，`b24c84b..a7098dd main -> main`
- 未同步文件：`kaif.zip`，保持未跟踪状态，未暂存、未提交。

# 线上抽样验证

以下页面返回 200，并已命中新内容：

- `https://amz.hao1234.top/articles/consumer-ai-search-amazon/`
- `https://amz.hao1234.top/articles/amazon-rufus-alexa-shopping/`
- `https://amz.hao1234.top/articles/ai-listing-optimization/`
- `https://amz.hao1234.top/articles/amazon-title-rule-75-characters-2026/`

说明：第一次访问时部分页面仍是旧缓存，带缓存绕过参数复查后已命中新内容，判断部署已生效。

# IndexNow 结果

执行命令：

```powershell
npm run indexnow:submit
```

结果：失败。

错误：

```text
status: 403
UserForbiddedToAccessSite
User is unauthorized to access the site. Please verify the site using the key and try again
```

该问题与前次同步结果一致，属于 IndexNow 站点验证/权限问题，不影响网站部署本身。

# 下一步规划

## 第 6 批：补齐高时效文章更新标记

目标：处理 `reports/content-update-audit-report.md` 中列出的 12 篇待补标记文章。

优先顺序：

1. `ai-rufus-listing-writing-2026`
2. `consumer-ai-search-amazon`
3. `ai-search-learning-path`
4. `tools-account-health-self-check`
5. `case-platform-warning-email-checklist`
6. 其余 AI Prompt / AI 工具文章

产出：

- 补齐 `updateType`、`updateStatus`、`lastReviewed`、`nextReviewDue`、`sourceUrls`
- 让 `npm run content:update-audit` 的待补数量从 12 降到 0 或接近 0

## 第 7 批：SEO 审计异常单独处理

目标：解决 `seo:audit` 长期 8 fail 的问题。

当前失败源：

- `baidu_verify_codeva-IH9obSJr6f.html`

可选方案：

- 方案 A：在 `scripts/seo-audit.mjs` 排除搜索引擎验证文件。
- 方案 B：给验证文件补最小 HTML 结构和 meta，但需确认不会影响百度验证。

建议优先方案 A，因为验证文件本质不是内容页面。

## 第 8 批：上线后路径抽查与搜索体验检查

目标：

- 抽查首页、专题页、文章页、资源页的真实点击路径。
- 检查 Pagefind 搜索是否能搜到新增扩写内容。
- 检查移动端文章导航和封面图展示。

# 风险

1. IndexNow 仍未提交成功，需要后续单独处理站点验证权限。
2. 当前仍有一个未跟踪根目录文件 `kaif.zip`，本轮未处理。
3. 本轮提交范围较大，包含前几批累计改动，后续最好按第 6/7/8 批拆小提交。

# 给 GPT 的回填摘要

已推送 `a7098dd feat: improve article content and update workflow` 到 `origin/main` 并抽样验证线上新内容。IndexNow 仍 403，问题与前次一致。下一步建议按第 6 批补齐 12 篇高时效文章更新标记，再单独处理百度验证页 SEO 审计异常。
