# CODEX_READONLY_AUDIT_CONVERSION_PATH_V01

审计时间：2026-06-05

审计范围：当前 Astro 网站的转化路径、CTA 降噪结果、资源领取路径、构建、SEO 与图片清单。

执行边界：
- 未修改代码。
- 未修改文章。
- 未接 API。
- 未接 LLM。
- 未 commit。
- 未 push。
- 本次仅新增本报告文件。

## 总结

整体结论：核心转化路径基本成立，但仍有若干 CTA / 微信关键词残留需要后续降噪。

- `/ask/`：PASS。仍为纯前端规则匹配，无 API、无 LLM、无 localStorage、无提交。
- `/survey/`：PASS。无真实表单提交、无隐私收集、无 localStorage。
- `/lead/`：PASS with WARN。作为最终领取 / 联系承接页存在；但全站仍有微信关键词残留，不完全收敛。
- `/resources/`：PASS。构建产出资源中心和 7 个资源详情页，无 404 迹象；资源卡片 CTA 未明显过量。
- 7 个资源详情页：PASS。主 CTA 均指向 `/survey/`。
- 文章页：WARN。文章模板只有一个底部领取 CTA；但部分文章正文 / frontmatter 仍有“回复关键词 / 添加企业微信”文案残留。
- RelatedArticles：PASS。组件默认 `max = 2`，文章页显式传入 `max={2}`。
- `/open-class/`：WARN。中心页强按钮不算过量，但公开课详情页仍保留“微信关键词 / 回复关键词”区块，且个别详情页有多个主按钮。
- “回复关键词领取”强横幅：WARN。未见全站统一强横幅，但公开课详情页和部分文章正文存在明显“回复关键词”领取文案。
- build / seo / images：PASS。三项命令均通过。

## 逐项检查

### 1. `/ask/` 是否仍为纯前端

状态：PASS

检查文件：
- `src/pages/ask/index.astro`
- `src/data/ayan-assistant-rules.ts`
- `src/lib/ayan-assistant-match.ts`

证据：
- 页面内只读取内嵌 JSON：`JSON.parse(document.getElementById("ayan-topics-data").textContent)`。
- 匹配逻辑来自本地函数：`computeScoreForTopic`。
- 输入触发仅调用 `runAsk()` 和 DOM 渲染。
- 检索 `/ask/` 未发现：`fetch(`、`XMLHttpRequest`、`axios`、`localStorage`、`sessionStorage`、`<form`、`method=`、`action=`、`submit`。

备注：
- `/ask/` 有文本输入框和按钮，但不是表单提交，也不上传或存储输入。

### 2. `/survey/` 是否无真实表单提交、无隐私收集、无 localStorage

状态：PASS

检查文件：
- `src/pages/survey/index.astro`

证据：
- 页面只有两组 radio：`name="stage"`、`name="goal"`。
- 用户选择仅暂存在 `window._surveyAnswers`。
- 结果页只根据本地 `rules` 和 `results` 推荐资源详情页、文章、公开课。
- 检索 `/survey/` 未发现：`fetch(`、`XMLHttpRequest`、`axios`、`localStorage`、`sessionStorage`、`<form`、`method=`、`action=`、`submit`。

备注：
- `/survey/` 没有姓名、微信、邮箱、手机号等隐私字段。

### 3. `/lead/` 是否作为最终领取 / 联系承接页，微信不再散落为强 CTA

状态：PASS with WARN

检查文件：
- `src/pages/lead/index.astro`
- `src/layouts/BaseLayout.astro`
- 全站 CTA / 微信关键词检索

证据：
- `/lead/` 是最终领取承接页，包含 Tally 表单入口和备用微信号。
- `BaseLayout.astro` 中 `window.AYAN_TALLY_URL = "/lead/"`，并将若干领取类 CTA 统一导向 `/lead/`。
- `/lead/` 内微信作为备用方式出现，而不是首要入口。

风险：
- 微信关键词并未完全收敛到 `/lead/`。仍分布在资源详情页的信息字段、公开课中心 / 详情页、文章 frontmatter 和部分正文中。
- 特别是公开课详情页仍有“微信关键词”区块，文案为“回复关键词"..."，领取配套资料包。”这已经接近强 CTA。

### 4. `/resources/` 是否没有 404，资源卡片 CTA 是否不过量

状态：PASS

检查文件：
- `src/pages/resources/index.astro`
- `src/pages/resources/*.astro`
- `dist/resources/**/index.html`

构建产出确认存在：
- `dist/resources/index.html`
- `dist/resources/keyword-cleaning-sheet/index.html`
- `dist/resources/listing-checklist/index.html`
- `dist/resources/ppc-weekly-review/index.html`
- `dist/resources/review-pain-analysis/index.html`
- `dist/resources/competitor-selection-matrix/index.html`
- `dist/resources/ai-tools-review-sheet/index.html`
- `dist/resources/platform-rules-checklist/index.html`

CTA 观察：
- 资源中心卡片主要有“查看资料详情 / 查看文章”两个弱操作。
- 顶部有“做资料诊断”和“按专题浏览资料”，不属于过量强 CTA。

风险：
- 资源中心仍显示“28 个微信关键词”，属于微信路径残留，但不是领取强按钮。

### 5. 7 个资源详情页主 CTA 是否都指向 `/survey/`

状态：PASS

检查结果：
- `ai-tools-review-sheet.astro`：`cta-primary` 指向 `/survey/`
- `competitor-selection-matrix.astro`：`cta-primary` 指向 `/survey/`
- `keyword-cleaning-sheet.astro`：`cta-primary` 指向 `/survey/`
- `listing-checklist.astro`：`cta-primary` 指向 `/survey/`
- `platform-rules-checklist.astro`：`cta-primary` 指向 `/survey/`
- `ppc-weekly-review.astro`：`cta-primary` 指向 `/survey/`
- `review-pain-analysis.astro`：`cta-primary` 指向 `/survey/`

补充：
- 上述 7 页未发现 `/lead/`、Tally、API、localStorage、fetch 调用。

### 6. 文章页是否没有重复“立即领取 / 领取资料包”按钮

状态：WARN

检查文件：
- `src/pages/articles/[slug].astro`
- `src/components/ArticleResourceCTA.astro`
- `src/content/posts/*.md`

证据：
- 文章模板内只有一个底部 CTA：`article-bottom-cta`，链接 `/lead/`，文本为“领取 AI 运营资料包”。
- `ArticleResourceCTA.astro` 组件未在 `src/pages/articles/[slug].astro` 中引入 / 使用。
- 文章页没有重复渲染多个“立即领取 / 领取资料包”按钮。

风险：
- 部分文章正文仍保留领取路径文案，例如：
  - `src/content/posts/tools-learning-path.md` 包含“领取资料包”“访问 /lead/”“添加企业微信，回复"工具包"”。
  - 多篇文章 frontmatter 的 `wechatHook` 仍为“回复关键词...领取...”。
  - 部分长文正文仍有“资料包和微信引导”段落。

判断：
- 从按钮层面看已降噪。
- 从内容文案层面看，微信关键词领取路径仍未完全清理。

### 7. RelatedArticles 是否最多 2 篇

状态：PASS

检查文件：
- `src/components/RelatedArticles.astro`
- `src/pages/articles/[slug].astro`

证据：
- 组件默认：`const { post, allPosts, max = 2 } = Astro.props;`
- 截断逻辑：`.slice(0, Math.max(1, Number(max) || 2))`
- 文章页调用：`<RelatedArticles post={post} allPosts={allPosts} max={2} />`

### 8. `/open-class/` 是否没有多个强按钮抢注意力

状态：WARN

检查文件：
- `src/pages/open-class/index.astro`
- `src/pages/open-class/*.astro`

中心页观察：
- `/open-class/` 中每张课程卡主要有一个强按钮“查看课程详情”，另有弱文字链接“查看配套资料”。
- 中心页没有明显多个强按钮争抢首屏注意力。

详情页风险：
- 多个公开课详情页底部仍有 `cta-primary` + 多个 `cta-secondary`。
- `review-to-selection.astro` 底部有两个 `cta-primary`：Review 痛点分析表、选品竞品矩阵。
- 详情页仍有“微信关键词”模块，容易与资源详情页 `/survey/` 路径抢注意力。

### 9. 全站是否仍有明显“回复关键词领取”强横幅

状态：WARN

未发现：
- 未发现统一全站级强横幅组件。

仍发现：
- 公开课详情页多处存在“微信关键词”区块：
  - `open-class/keyword-to-listing`
  - `open-class/ppc-week-one`
  - `open-class/review-to-selection`
  - `open-class/ai-tools-for-amazon`
  - `open-class/competitor-selection-matrix`
  - `open-class/listing-conversion-check`
  - `open-class/platform-rules-beginner`
- 资源详情页 7 页都有“微信领取关键词”信息字段。
- 文章 frontmatter 和部分正文仍有“回复关键词...领取...”文案。

判断：
- 如果标准是“没有全站横幅”，可视为通过。
- 如果标准是“用户路径中不再出现强微信领取引导”，当前仍未完全通过。

### 10. build / seo / images 是否通过

状态：PASS

执行命令：
- `npm run build`
- `npm run seo:audit`
- `npm run images:check`

结果：
- build：PASS，Astro build 成功，Pagefind 索引成功，生成 57 页。
- SEO：PASS，Pages checked: 57，Pass: 456，Fail: 0，robots.txt PASS，sitemap-index.xml PASS。
- images：PASS，manifest items: 49，missing files: 0，duplicate ids: 0，orphan assets: 0。

备注：
- `seo:audit` 会自动刷新既有 `reports/seo-audit-report.md`。本次审计中已将该自动生成改动还原，避免违反“除本报告外不改文件”的要求。

## 风险清单

1. 公开课详情页仍有“微信关键词 / 回复关键词领取”区块。
   - 等级：中
   - 影响：与 `/survey/` 和 `/lead/` 的新转化路径竞争。

2. 资源详情页仍显示“微信领取关键词”字段。
   - 等级：低到中
   - 影响：虽然主 CTA 已指向 `/survey/`，但微信路径仍可见。

3. 文章内容中仍有微信领取说明。
   - 等级：中
   - 影响：文章页按钮已降噪，但正文仍可能把用户带回旧领取路径。

4. `BaseLayout.astro` 的全局 CTA 重写脚本覆盖范围较宽。
   - 等级：中
   - 影响：它会按文本匹配重写链接 / 按钮，后续新增按钮时可能被误导到 `/lead/`。

## 建议后续任务

1. 将公开课详情页的“微信关键词”模块降级为弱说明，或统一改为“查看资料详情 / 做资料诊断”。
2. 将资源详情页“微信领取关键词”字段改为“资料领取路径：先做 30 秒诊断”。
3. 清理文章正文中的“添加企业微信 / 回复关键词”段落，仅保留 `/lead/` 或 `/resources/` 路径说明。
4. 收窄 `BaseLayout.astro` 的 CTA 自动重写脚本范围，避免按泛文本全站绑定。

## 命令记录

```bash
npm run build
npm run seo:audit
npm run images:check
```

未执行：
- 未执行 commit。
- 未执行 push。
- 未接入任何 API。
- 未接入任何 LLM。
