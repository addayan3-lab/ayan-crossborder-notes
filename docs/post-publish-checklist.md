# 发布后检查报告模板

> 每次新增文章 / 改版落地页 / 调整 SEO 基础设置后，**发布前**和**发布后**各跑一次本清单。
> 全部通过才算"上线完成"。任何一项失败，**不能**算发布成功。

---

## 0. 基本信息

- 发布批次：`<YYYY-MM-DD>_<任务编号>_...`
- 改动范围：`<新增文章 / 改版页面 / 调整 SEO 基础>`
- 发布人：`<姓名 / 工具>`
- 站点：https://amz.hao1234.top
- 发布环境：`<local / preview / production>`

---

## 1. 构建检查

命令：

```bash
npm run build
```

通过标准：

- [ ] Astro build 成功，无错误
- [ ] Pagefind 索引成功（`Indexed N pages` 与实际页面数一致）
- [ ] 页面总数 = `<实际页数>`（含文章页、专题页、RSS）
- [ ] 编译时长 `<2s`（参考值，异常慢需排查）
- [ ] 无 frontmatter schema 报错

---

## 2. SEO 审计

命令：

```bash
npm run seo:audit
```

通过标准：

- [ ] Pages checked = 站点总页数
- [ ] Pass > 0 且 Pass ≥ 8 × 页数
- [ ] Fail = 0
- [ ] robots.txt: PASS
- [ ] sitemap-index.xml: PASS
- [ ] 报告输出：`reports/seo-audit-report.md`

重点检查项（脚本自动审计，发布人抽样核对）：

- title 长度（建议 20-60 字符）
- description 长度（建议 80-160 字符）
- canonical 与 og:url 一致
- h1 唯一、h2 数量合理
- og:image / twitter:image 存在

---

## 3. 图片清单

命令：

```bash
npm run images:check
```

通过标准：

- [ ] manifest items = 已注册图片数
- [ ] missing files = 0
- [ ] duplicate ids = 0
- [ ] orphan assets = 0

---

## 4. Sitemap 校验

来源：`dist/sitemap-index.xml` → `dist/sitemap-0.xml`

通过标准：

- [ ] sitemap-0.xml 存在
- [ ] URL 总数 = 站点总页数
- [ ] 新增/修改的 URL 已收录
- [ ] 所有 URL 前缀 = `https://amz.hao1234.top`
- [ ] 无重复 URL
- [ ] 无 404 URL（发布后回访抽样）

抽样脚本（手动跑）：

```bash
Select-String -LiteralPath "dist\sitemap-0.xml" -Pattern "<loc>" -AllMatches | ForEach-Object { $_.Matches.Count }
```

---

## 5. robots.txt 校验

来源：`public/robots.txt`

通过标准：

- [ ] `User-agent: *`
- [ ] `Allow: /`
- [ ] `Sitemap:` 指向 `https://amz.hao1234.top/sitemap-index.xml`
- [ ] 无误封禁重要目录

---

## 6. Canonical 与站点 URL 校验

通过标准：

- [ ] 所有页面 `<link rel="canonical">` = 当前页面 URL（绝对）
- [ ] 所有 og:url = canonical
- [ ] 所有页面无 https / http 混用
- [ ] 所有页面无 www / 非 www 混用
- [ ] 站点 URL 在以下文件统一为 `https://amz.hao1234.top`：
  - `astro.config.mjs`（`site` 字段）
  - `src/layouts/BaseLayout.astro`（canonical / og:url / og:image）
  - `src/pages/articles/[slug].astro`（Article JSON-LD 的 url / mainEntityOfPage）
  - `scripts/submit-indexnow.mjs`（host / site）
  - `scripts/seo-audit.mjs`（site）

抽样脚本（手动跑）：

```bash
Get-ChildItem -LiteralPath "dist" -Filter "*.html" -Recurse | ForEach-Object {
  $content = Get-Content -LiteralPath $_.FullName -Raw
  if ($content -notmatch 'amz\.hao1234\.top') {
    Write-Host "$($_.FullName) - 缺少站点 URL"
  }
}
```

---

## 7. RSS feed 校验

来源：`dist/rss.xml` + `<link rel="alternate" type="application/rss+xml">`

通过标准：

- [ ] rss.xml 存在
- [ ] `<channel>` 包含 title / description / link
- [ ] 至少 1 个 `<item>`
- [ ] 每个 item 包含 title / link / description / pubDate
- [ ] 所有 item 的 link 前缀 = 站点 URL
- [ ] 所有 HTML 页面都包含 `<link rel="alternate" type="application/rss+xml" ...>`

抽样脚本（手动跑）：

```bash
Get-Content -LiteralPath "dist\rss.xml" | Select-Object -First 5
Select-String -LiteralPath "dist\index.html" -Pattern "application/rss\+xml"
```

---

## 8. IndexNow 提交

命令：

```bash
npm run indexnow:submit
```

通过标准：

- [ ] 提交 status = 200 或 202
- [ ] 提交 URL 列表 = sitemap 全部 URL（含新增/改版）
- [ ] 提交后无报错
- [ ] key 文件 `public/<key>.txt` 可访问
- [ ] 提交记录已写到本批次报告

---

## 9. 结构化数据校验

### 9.1 Article JSON-LD

仅文章页需要（`src/pages/articles/[slug].astro`）。

通过标准：

- [ ] 文章页含 `<script type="application/ld+json">` 且 `@type` = `Article`
- [ ] 必含字段：`headline`、`description`、`datePublished`、`author.name`、`url`
- [ ] 推荐字段：`dateModified`、`mainEntityOfPage`、`inLanguage`、`publisher.name`、`image`
- [ ] 作者使用站点已有作者名（"阿岩"），不编造

### 9.2 BreadcrumbList JSON-LD

文章页 + 专题页（5 个落地页）需要。

通过标准：

- [ ] 文章页含 BreadcrumbList JSON-LD
  - 路径：`首页 → [专题] → 文章`
  - 专题没有独立落地页时：`首页 → 文章`
- [ ] 5 个专题页（`/listing/`、`/ppc/`、`/ai-amazon/`、`/selection/`、`/tools/`）都含 BreadcrumbList JSON-LD
  - 路径：`首页 → 专题`
- [ ] 每条 ListItem 含 `position` / `name` / `item`
- [ ] `item` 全部为绝对 URL

### 9.3 Organization / WebSite JSON-LD

`src/layouts/BaseLayout.astro` 输出，全站生效。

通过标准：

- [ ] 含 Organization（含 name / url / logo）
- [ ] 含 WebSite（含 name / url / inLanguage）

抽样脚本（手动跑）：

```bash
Select-String -LiteralPath "dist\articles\<slug>\index.html" -Pattern "application/ld\+json"
```

---

## 10. 站点端到端抽查

发布人**人工**或用浏览器无痕模式访问：

- [ ] 首页加载无 JS 报错
- [ ] 首页专题卡显示 6 个专题，每个都能点开
- [ ] 6 篇新文章页面能从首页 / 专题页 / 文章列表 3 处入口进入
- [ ] 专题页"学习路径"卡片指向正确的导览长文
- [ ] 文章页左侧 TOC 正确（9 段标题）
- [ ] 文章页底部"领取资料"按钮可点击（实际跳转到 /lead/）

---

## 11. 报告归档

- [ ] 报告路径：`reports/<任务编号>_report.md`
- [ ] 报告包含以下小节：
  - 执行结论（成功/失败）
  - 每项任务的结论
  - 命令输出（build / seo:audit / images:check / IndexNow）
  - 抽样验证结果
  - 下一步建议

---

## 12. 失败处理

任何一项未通过：

1. 不要标记"上线完成"
2. 在本报告"## 失败项"小节记录：哪一项、错误信息、复现命令
3. 修复后重新跑全部清单（不要只跑失败项）
4. 修复后重跑本批次的 IndexNow 提交（如有 URL 变化）

---

## 13. 后续

发布后 24-48 小时：

- [ ] 抽查 IndexNow 后台是否被 Bing 收录（如有 IndexNow Insights）
- [ ] 抽查 Google Search Console 收录数（手动）
- [ ] 记录第一批反馈

---

## 14. 命令速查

```bash
# 一键验收
npm run build
npm run seo:audit
npm run images:check
npm run indexnow:submit

# 抽样脚本
Select-String -LiteralPath "dist\sitemap-0.xml" -Pattern "<loc>" -AllMatches | ForEach-Object { $_.Matches.Count }
Get-Content -LiteralPath "dist\rss.xml" | Select-Object -First 10
```
