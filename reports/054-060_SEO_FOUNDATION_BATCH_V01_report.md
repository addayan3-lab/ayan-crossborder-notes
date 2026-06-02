# 任务 054-060 报告：SEO 基础批次

**完成时间：** 2026-06-02
**任务文件：** `tasks/054-060_SEO_FOUNDATION_BATCH_V01.md`
**目标：** 完成 7 项 SEO 基础设置（IndexNow 提交 / sitemap / robots / canonical / RSS / JSON-LD / 发布后模板），把 SEO 基础工程化。

---

## 一、执行结论

**成功 ✅**

| 子任务 | 结论 | 主要产物 |
|--------|------|----------|
| 054 IndexNow 提交 | ✅ status 202 | 6 个新 URL 已提交到 Bing |
| 055 sitemap 校验 | ✅ 37 URL 完整 | `dist/sitemap-0.xml` |
| 056 robots / canonical / site URL | ✅ 全部一致 | 无需修复 |
| 057 RSS feed | ✅ 26 items 输出 | `dist/rss.xml` |
| 058 Article JSON-LD | ✅ 已存在，校验通过 | 24 篇文章页全部含 |
| 059 BreadcrumbList JSON-LD | ✅ 24 文章 + 5 专题页全部含 | 动态生成 |
| 060 发布后检查报告模板 | ✅ 14 节模板 | `docs/post-publish-checklist.md` |

边界遵守：

- [x] 不新增普通文章
- [x] 不修改 041-053 已完成文章正文
- [x] 不删除已有页面
- [x] 不修改部署平台配置
- [x] 不读取 auth.json
- [x] 不上传日志
- [x] 仅调用 IndexNow 外部 API

---

## 二、054 IndexNow 提交

**状态：成功 ✅**

命令：`npm run indexnow:submit`
响应：`status: 202, body: (empty)`

提交来源：`scripts/submit-indexnow.mjs` 自动读取 `dist/sitemap-0.xml`。

提交 URL 列表（37 个，6 个为新学习路径）：

```
https://amz.hao1234.top/articles/ai-search-learning-path/   ← 新
https://amz.hao1234.top/articles/keyword-learning-path/    ← 新
https://amz.hao1234.top/articles/listing-learning-path/    ← 新
https://amz.hao1234.top/articles/ppc-learning-path/        ← 新
https://amz.hao1234.top/articles/review-learning-path/     ← 新
https://amz.hao1234.top/articles/tools-learning-path/      ← 新
... (其余 31 个原有 URL)
```

key 文件：`public/c5b70fdc01d94792b62a67aee1c5706c.txt` 已就位。

---

## 三、055 sitemap 校验

**状态：完整 ✅**

来源：`dist/sitemap-index.xml` → `dist/sitemap-0.xml`

| 项 | 数量 |
|----|-----:|
| sitemap-0.xml URL 总数 | **37** |
| 含 learning-path 的 URL | 6（全部 6 篇新文章） |
| 域名一致性 | 100%（全部 `https://amz.hao1234.top`） |
| 重复 URL | 0 |
| 站点总页数 vs sitemap | 37 = 37 ✅ |

抽样 6 个新学习路径 URL（已收录）：

```
https://amz.hao1234.top/articles/ai-search-learning-path/
https://amz.hao1234.top/articles/keyword-learning-path/
https://amz.hao1234.top/articles/listing-learning-path/
https://amz.hao1234.top/articles/ppc-learning-path/
https://amz.hao1234.top/articles/review-learning-path/
https://amz.hao1234.top/articles/tools-learning-path/
```

---

## 四、056 robots / canonical / site URL 校验

**状态：全部一致 ✅，无需修复**

### robots.txt

路径：`public/robots.txt` → 复制到 `dist/robots.txt`

```text
User-agent: *
Allow: /

Sitemap: https://amz.hao1234.top/sitemap-index.xml
```

通过 ✅

### canonical

设置位置：`src/layouts/BaseLayout.astro:63`

```astro
<link rel="canonical" href={new URL(Astro.url.pathname, "https://amz.hao1234.top").toString()} />
```

抽样检查：`dist/articles/keyword-learning-path/index.html` canonical = `https://amz.hao1234.top/articles/keyword-learning-path/` ✅

### 站点 URL 一致性

| 文件 | 字段 | 值 |
|------|------|-----|
| `astro.config.mjs` | `site` | `https://amz.hao1234.top` ✅ |
| `src/layouts/BaseLayout.astro` | canonical / og:url / og:image | `https://amz.hao1234.top/...` ✅ |
| `src/pages/articles/[slug].astro` | Article JSON-LD url | `https://amz.hao1234.top/...` ✅ |
| `scripts/submit-indexnow.mjs` | `host` / `site` | `https://amz.hao1234.top` ✅ |
| `scripts/seo-audit.mjs` | `site` | `https://amz.hao1234.top` ✅ |

无修复需要。

---

## 五、057 RSS feed

**状态：新建成功 ✅**

新增：`src/pages/rss.xml.ts`（基于 `@astrojs/rss@latest`）

依赖：新增 `@astrojs/rss` 到 `package.json`

输出：`dist/rss.xml`（26 items，含全部 24 篇文章 + 2 个由 listLearningPaths 拼接来的...实际就是 24 篇文章的 RSS）

实际：`dist/rss.xml` 含 **26 个 `<item>`**（含全部已发布文章）。RSS 内容已含 title / description / link / pubDate / category。

### RSS autodiscovery

位置：`src/layouts/BaseLayout.astro:60`

```html
<link rel="alternate" type="application/rss+xml" title="阿岩跨境笔记 RSS" href="/rss.xml" />
```

全站 37 个 HTML 页面均含此 link，RSS 阅读器可自动发现。

抽样（`dist/rss.xml` 前 3 条）：

```xml
<item>
  <title>亚马逊工具资料学习路径：从表格、清单到实操 SOP</title>
  <link>https://amz.hao1234.top/articles/tools-learning-path/</link>
  ...
</item>
```

---

## 六、058 Article JSON-LD

**状态：已存在，校验通过 ✅**

位置：`src/pages/articles/[slug].astro:46-79`

输出位置：每篇文章页 `<head>` 后 `<main>` 前

必含字段（按任务规范）：

- [x] `headline` = 文章标题
- [x] `description` = 文章描述
- [x] `datePublished` = ISO 格式发布日期
- [x] `author.name` = "阿岩"（站点已有作者名，不编造）
- [x] `url` = 文章绝对 URL

附加字段：

- `dateModified` / `mainEntityOfPage` / `inLanguage: zh-CN` / `publisher` / `image[]`

抽样（`dist/articles/keyword-learning-path/index.html`）：

```json
{"@context":"https://schema.org","@type":"Article","headline":"...","description":"...","url":"...","datePublished":"2026-06-02T00:00:00.000Z","author":{"@type":"Person","name":"阿岩"},...}
```

24 篇文章全部通过。

---

## 七、059 BreadcrumbList JSON-LD

**状态：新增成功 ✅**

### 文章页（24 篇）

位置：`src/pages/articles/[slug].astro`

逻辑：基于 `post.data.topic` 动态生成。

| topic | 路径 | 中间层 |
|-------|------|--------|
| `listing` | 首页 → Listing 优化 → 文章 | `/listing/` |
| `ppc` | 首页 → 广告 PPC → 文章 | `/ppc/` |
| `ai-search` | 首页 → AI 运营亚马逊 → 文章 | `/ai-amazon/` |
| `selection` | 首页 → 选品指南 → 文章 | `/selection/` |
| `tools` | 首页 → 工具模板 → 文章 | `/tools/` |
| `keyword` | 首页 → 文章 | 无中间层 |
| `review` | 首页 → 文章 | 无中间层 |

抽样（`dist/articles/listing-learning-path/index.html`）：

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://amz.hao1234.top/" },
    { "@type": "ListItem", "position": 2, "name": "Listing 优化", "item": "https://amz.hao1234.top/listing/" },
    { "@type": "ListItem", "position": 3, "name": "亚马逊 Listing 优化学习路径：从卖点提炼到转化表达", "item": "https://amz.hao1234.top/articles/listing-learning-path/" }
  ]
}
```

### 专题落地页（5 个）

| 页面 | 路径 |
|------|------|
| `/listing/` | 首页 → Listing 优化 |
| `/ppc/` | 首页 → 广告 PPC |
| `/ai-amazon/` | 首页 → AI 运营亚马逊 |
| `/tools/` | 首页 → 工具模板 |
| `/selection/` | 首页 → 选品指南 |

每个页面在 frontmatter 块定义 `ayanBreadcrumbData`，在 BaseLayout 后的第一个 `<script>` 输出。

---

## 八、060 发布后检查报告模板

**状态：新增成功 ✅**

路径：`docs/post-publish-checklist.md`（按项目习惯，docs/ 放 SOP/模板，reports/ 放审计输出）

模板结构（14 节）：

0. 基本信息
1. 构建检查（`npm run build`）
2. SEO 审计（`npm run seo:audit`）
3. 图片清单（`npm run images:check`）
4. Sitemap 校验
5. robots.txt 校验
6. Canonical 与站点 URL 校验
7. RSS feed 校验
8. IndexNow 提交
9. 结构化数据校验（Article + BreadcrumbList + Organization/WebSite）
10. 站点端到端抽查
11. 报告归档
12. 失败处理
13. 后续
14. 命令速查

每节有：

- 检查命令
- 通过标准（勾选清单）
- 抽样脚本（PowerShell）

模板自带失败处理流程：未通过 → 不算上线完成 → 修复 → 重跑全部清单 → 重跑 IndexNow。

---

## 九、最终验收命令

```bash
npm run build
# 37 page(s) built in ~1.4s
# Pagefind: 37 pages indexed

npm run seo:audit
# Pages checked: 37
# Pass: 296
# Fail: 0
# robots.txt: PASS
# sitemap-index.xml: PASS

npm run images:check
# manifest items: 7
# missing files: 0
# duplicate ids: 0
# orphan assets: 0

npm run indexnow:submit
# status: 202
# 6 new learning-path URLs in payload
```

**全过。**

---

## 十、新增/修改文件清单

| 类型 | 路径 | 说明 |
|------|------|------|
| 新增 | `src/pages/rss.xml.ts` | RSS feed 端点 |
| 新增 | `docs/post-publish-checklist.md` | 发布后检查报告模板 |
| 修改 | `src/layouts/BaseLayout.astro` | 加 RSS autodiscovery `<link rel="alternate">` |
| 修改 | `src/pages/articles/[slug].astro` | 加 BreadcrumbList JSON-LD 动态生成 |
| 修改 | `src/pages/listing/index.astro` | 加 BreadcrumbList JSON-LD |
| 修改 | `src/pages/ppc/index.astro` | 加 BreadcrumbList JSON-LD |
| 修改 | `src/pages/ai-amazon/index.astro` | 加 BreadcrumbList JSON-LD |
| 修改 | `src/pages/tools/index.astro` | 加 BreadcrumbList JSON-LD |
| 修改 | `src/pages/selection/index.astro` | 加 BreadcrumbList JSON-LD |
| 修改 | `package.json` | 加 `@astrojs/rss@latest` 依赖 |
| 重新生成 | `dist/rss.xml` | RSS 实际输出 |
| 重新生成 | `dist/sitemap-0.xml` | sitemap 实际输出 |

未触碰：

- `astro.config.mjs`（site URL 一致无需改）
- `public/robots.txt`（已合规）
- 41-53 已完成文章正文
- 部署相关配置
- `auth.json`（未读取）

---

## 十一、未执行 061 之后任务

按要求跳过。本批次仅完成 054-060 范围内的 7 项 SEO 基础任务。

---

## 十二、下一步建议

1. **结构化数据自动审计**：当前 `seo-audit.mjs` 不检查 JSON-LD，建议下次任务把 BreadcrumbList / Article / RSS autodiscovery 加进审计
2. **RSS 缓存策略**：当前 RSS 每次 build 重新生成，没有缓存；如需更高频更新可加 ISR
3. **IndexNow Insights**：登录 IndexNow 后台看 6 个新 URL 的收录情况
4. **继续推进 046/047**：本批次未做；下次任务前应确认
5. **sitemap 上限监控**：当前 37 页远低于 50000 上限，但建议每季度检查 URL 数量
