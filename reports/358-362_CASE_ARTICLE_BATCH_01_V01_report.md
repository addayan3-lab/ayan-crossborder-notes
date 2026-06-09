# 358-362 实操案例专区第一批案例文章｜执行报告

## 1. 执行结论

✅ **第一批 5 篇案例文章已创建，/cases/ 页面已更新。** 所有文章通过 build、SEO、images 验证，合规检查未发现旧微信强 CTA。

---

## 2. 新增 5 篇案例文章清单

| # | title | slug | topic | stage | intent | caseCategory | caseDifficulty |
|---|-------|------|-------|-------|--------|-------------|---------------|
| 1 | 案例第 1 篇：一个产品为什么看起来能做，但不建议继续 | case-selection-seems-ok-dont-do | selection | 新手 | 决策 | 选品判断 | 新手 |
| 2 | 案例第 2 篇：一个 Listing 有流量没转化，问题出在哪里 | case-listing-traffic-no-conversion | listing | 新手 | 避坑 | Listing诊断 | 新手 |
| 3 | 案例第 3 篇：广告 ACOS 高，先别急着关广告 | case-ppc-high-acos-dont-panic | ppc | 新手 | 避坑 | PPC广告复盘 | 新手 |
| 4 | 案例第 4 篇：新品上线第一周怎么复盘 | case-new-product-week-one-review | ppc | 新手 | 工具 | 新品冷启动 | 新手 |
| 5 | 案例第 5 篇：从 50 条差评里反推出产品改进方向 | case-review-pain-reverse-improvement | review | 实操 | 工具 | Review痛点反推 | 进阶 |

**说明**：任务 3 和 4 的 `intent` 因 schema 限制（仅允许"学习/工具/决策/避坑"），从"复盘"调整为"避坑"和"工具"。

## 3. /cases/ 页面更新说明

| 原状态 | 现状态 |
|--------|--------|
| 5 个卡片标记"待上线"，不可点击 | 5 个卡片改为 `<a>` 链接，指向对应文章 |
| 新手推荐路径无链接 | 4 个推荐路径改为 `<a>` 链接 |
| `card-pending` + `tag-pending` 样式 | 移除，使用 `card` 标准样式 |
| "全部案例"文案标记"正在写作中" | 改为"案例配套资源"，引导用户看提示词文章和资料模板 |

### 5 篇案例的 /cases/ 页面对应链接

| 分类 | 目标 URL |
|------|---------|
| 选品判断 | /articles/case-selection-seems-ok-dont-do/ |
| Listing 诊断 | /articles/case-listing-traffic-no-conversion/ |
| PPC 广告复盘 | /articles/case-ppc-high-acos-dont-panic/ |
| Review 痛点反推 | /articles/case-review-pain-reverse-improvement/ |
| 新品冷启动 | /articles/case-new-product-week-one-review/ |

## 4. 每篇内链和资源承接说明

| 文章 | 对应提示词文章 | 对应资源页 | /survey/ | /ask/ |
|------|--------------|-----------|---------|-------|
| case-selection-seems-ok-dont-do | ai-prompt-product-differentiation、ai-competitor-matrix | competitor-selection-matrix | ✅ | ✅ |
| case-listing-traffic-no-conversion | ai-prompt-competitor-listing-analysis、ai-prompt-bullet-points-writing | listing-checklist | ✅ | ✅ |
| case-ppc-high-acos-dont-panic | ai-prompt-search-term-report、ai-prompt-negative-keyword-suggestions | ppc-weekly-review | ✅ | ✅ |
| case-new-product-week-one-review | ai-prompt-new-product-launch-plan、ai-prompt-weekly-operation-review | ppc-weekly-review | ✅ | ✅ |
| case-review-pain-reverse-improvement | ai-prompt-review-selling-points、ai-prompt-product-differentiation | review-pain-analysis | ✅ | ✅ |

**合规检查**：
- 未出现"回复关键词""添加企业微信""加微信领取" → ✅
- 不强导 /lead/ → ✅
- 每篇包含 wechatHook → ✅

## 5. 验证结果

| 验证项 | 前值 | 后值 | 变化 |
|--------|------|------|------|
| npm run build | 74 pages | 79 pages | ✅ +5 |
| npm run seo:audit | 592 Pass, 0 Fail | 632 Pass, 0 Fail | ✅ +40 |
| npm run images:check | 59 items, 0 missing | 59 items, 0 missing | ✅ unchanged |
| 是否新增图片 | ❌ 否 | ❌ 否 | ✅ |
| 是否修改 image-manifest | ❌ 否 | ❌ 否 | ✅ |
| 是否接 API | ❌ 否 | ❌ 否 | ✅ |
| 是否使用 LLM | ❌ 否 | ❌ 否 | ✅ |
| 是否 commit | ❌ 否 | ❌ 否 | ✅ |
| 是否 push | ❌ 否 | ❌ 否 | ✅ |

## 6. 修改文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/content/posts/case-selection-seems-ok-dont-do.md` | **新增** | 案例第 1 篇：选品判断 |
| `src/content/posts/case-listing-traffic-no-conversion.md` | **新增** | 案例第 2 篇：Listing 诊断 |
| `src/content/posts/case-ppc-high-acos-dont-panic.md` | **新增** | 案例第 3 篇：PPC 广告复盘 |
| `src/content/posts/case-new-product-week-one-review.md` | **新增** | 案例第 4 篇：新品冷启动 |
| `src/content/posts/case-review-pain-reverse-improvement.md` | **新增** | 案例第 5 篇：Review 痛点反推 |
| `src/pages/cases/index.astro` | **修改** | 5 个待上线卡片改为可点击链接 |
| `reports/358-362_CASE_ARTICLE_BATCH_01_V01_report.md` | **新增** | 本报告 |

## 7. 给 GPT 的回填摘要

```yaml
batch: 358-362
name: CASE_ARTICLE_BATCH_01_V01
status: completed
files:
  new:
    - src/content/posts/case-selection-seems-ok-dont-do.md
    - src/content/posts/case-listing-traffic-no-conversion.md
    - src/content/posts/case-ppc-high-acos-dont-panic.md
    - src/content/posts/case-new-product-week-one-review.md
    - src/content/posts/case-review-pain-reverse-improvement.md
    - reports/358-362_CASE_ARTICLE_BATCH_01_V01_report.md
  modified:
    - src/pages/cases/index.astro
verification:
  build: "79 pages (+5)"
  seo: "632 Pass, 0 Fail (+40)"
  images: "59 items, 0 missing (unchanged)"
summary: >
  第一批 5 篇案例文章已创建，覆盖选品、Listing、PPC、新品冷启动、Review 痛点反推五大场景。
  每篇使用统一 10 节正文结构，链接对应 AI 提示词文章和资源页，并包含 /survey/ 和 /ask/ 承接。
  /cases/ 页面已更新，5 张预告卡片改为可点击文章链接，新手推荐路径也改为可点击。
  未新增图片、未接 API、未使用 LLM、未 commit、未 push。
issues:
  - "intent 字段因 schema 限制（仅允许 学习/工具/决策/避坑），case-3 和 case-4 从'复盘'调整为'避坑'和'工具'"
next: 等待用户验收，验收后可 commit & push。
```
