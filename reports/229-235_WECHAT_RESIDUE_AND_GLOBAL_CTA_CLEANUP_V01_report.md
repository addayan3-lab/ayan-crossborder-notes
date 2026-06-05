# Report: WeChat Residue and Global CTA Cleanup (Batch 229-235)

**Status**: All changes applied, built, verified
**Commit**: (pending COMMIT_AND_PUSH phase)

---

## Summary

This batch finished the WeChat keyword convergence by downgrading the remaining open-class detail page WeChat blocks and resource detail page info-grid WeChat keywords, then narrowed the BaseLayout CTA script scope from blanket `all-lead-buttons` to attribute-based `[data-lead-cta]` matching. An article body WeChat reference audit was also performed.

---

## Changes Applied

### 229 — Open-Class Detail Pages: WeChat Block Downgraded (8 files)

- `src/pages/open-class/keyword-to-listing.astro`
- `src/pages/open-class/ppc-week-one.astro`
- `src/pages/open-class/review-to-selection.astro`
- `src/pages/open-class/ai-tools-for-amazon.astro`
- `src/pages/open-class/competitor-selection-matrix.astro`
- `src/pages/open-class/listing-conversion-check.astro`
- `src/pages/open-class/platform-rules-beginner.astro`
- `src/pages/open-class/operation-review-system.astro`

**Pattern** (uniform across all 8):
- H2 changed: `微信关键词` → `资料领取`
- Badge span (`.badge`) removed
- "扫码添加阿岩助理" paragraph removed
- "回复关键词「xxx」领取" paragraph → "在资料领取路径说明中会标注领取方式。"
- Note text: "需要先在微信搜索并关注 阿岩跨境笔记 公众号..." → "需要先关注 阿岩跨境笔记 公众号..."
- Button removed: `data-lead-cta` added to `领取资料` link instead
- Unused CSS selectors `.wechat-keyword`, `.keyword-badge` removed

### 230 — Resource Detail Pages: Info-Grid WeChat Keywords Rewritten (7 files)

- `src/pages/resources/keyword-cleaning-sheet.astro`
- `src/pages/resources/listing-checklist.astro`
- `src/pages/resources/ppc-weekly-review.astro`
- `src/pages/resources/review-pain-analysis.astro`
- `src/pages/resources/competitor-selection-matrix.astro`
- `src/pages/resources/ai-tools-review-sheet.astro`
- `src/pages/resources/platform-rules-checklist.astro`

**Pattern** (uniform across all 7):
- Info-label changed: `微信领取关键词` → `资料领取路径`
- Info-value changed: keyword string → `先做 30 秒诊断，查看适合的资料领取方式`
- Info-value link: href updated from `/ask/` to `/survey/`
- CSS class `.wechat-keyword` removed from info-value span

### 231 — BaseLayout CTA Script Narrowing

**`src/layouts/BaseLayout.astro`**:
- `开始学习领取资料` nav button: added `data-lead-cta` attribute
- CTA script logic changed from blanket all-elements scan to:
  - Primary: `[data-lead-cta]` attribute matching
  - Secondary (fallback): text-match on `["查看资料详情", "查看课程详情", "查看文章", "领取资料"]`
- Removed from fallback list: `"问问阿岩助手"`, `"立即提问"`, `"阿岩助手"`, `"做资料诊断"`, `"继续问 AI 阿岩助手"`
- Skip-if-has-attribute guard prevents double matching

### 232 — Article WeChat Residue Audit

**Frontmatter wechatHook** (data layer, not modified):
- 28 articles have `wechatHook: "回复关键词「xxx」领取"` in frontmatter
- Used by `/ask/` rendering code — display text already weakened in Batch 223-228

**Article body WeChat references** (audit only — 4 occurrences):
1. `tools-learning-path.md:123` — mentions 企业微信 in tool context
2. `ai-search-learning-path.md:120` — mentions 企业微信 in tool context
3. `amazon-platform-rules-beginner.md:324` — mentions 微信 in rule context
4. `amazon-ai-tools-review.md:353` — mentions 微信 in tool context

**Decision**: No body modifications in this batch — these are contextual references, not CTAs.

---

## Verification Results

### Core Path Regression (Task 233)

| Path | Status | Notes |
|------|--------|-------|
| `/survey/` | ✅ 200 | Form renders, questions, recommended resources display |
| `/resources/` | ✅ 200 | 28 resource cards, no WeChat badges, 1-2 CTAs per card |
| `/open-class/` | ✅ 200 | 8 course cards, 1 strong button + 1 text link each |
| `/lead/` | ✅ 200 | Path divider "已经确定要领取哪份资料？使用下方方式：" visible |
| `/ask/` | ✅ 200 | WeChat text weakened to "资料详情页会说明领取方式" |

**Notable residue**: `/open-class/` index still shows `微信关键词` field in course cards — not yet processed.

### Build (Task 234)

- `npm run build`: ✅ 57 pages built in 2.92s
- Pagefind: ✅ 57 pages indexed, 3 filters, 3227 words
- sitemap: ✅ `sitemap-index.xml` created
- All routes generated without errors

### SEO Audit (Task 234)

- `npm run seo:audit`: ✅ 456 pass, 0 fail
- `robots.txt`: PASS
- `sitemap-index.xml`: PASS

### Images Check (Task 234)

- `npm run images:check`: ✅ 49 manifest items, 0 missing, 0 duplicates, 0 orphans

---

## Remaining Residue (Known)

1. `/open-class/` index page: 8 course cards still show `微信关键词` field
2. `/resources/` hero meta: still says "28 个微信关键词" (data layer count)
3. 28 articles with frontmatter `wechatHook` (data layer — used by `/ask/`)
4. 4 articles with body WeChat references (contextual, not CTAs)
5. `/resources/` sidebar still has "已收录 28 个资料包，每个资料包都有对应的微信关键词"

These are all flagged as **data layer / index page** — low priority. Only item 5 is a visible WeChat reference on a user-facing page.

---

## Files Modified

**8 open-class detail pages**:
- `src/pages/open-class/keyword-to-listing.astro`
- `src/pages/open-class/ppc-week-one.astro`
- `src/pages/open-class/review-to-selection.astro`
- `src/pages/open-class/ai-tools-for-amazon.astro`
- `src/pages/open-class/competitor-selection-matrix.astro`
- `src/pages/open-class/listing-conversion-check.astro`
- `src/pages/open-class/platform-rules-beginner.astro`
- `src/pages/open-class/operation-review-system.astro`

**7 resource detail pages**:
- `src/pages/resources/keyword-cleaning-sheet.astro`
- `src/pages/resources/listing-checklist.astro`
- `src/pages/resources/ppc-weekly-review.astro`
- `src/pages/resources/review-pain-analysis.astro`
- `src/pages/resources/competitor-selection-matrix.astro`
- `src/pages/resources/ai-tools-review-sheet.astro`
- `src/pages/resources/platform-rules-checklist.astro`

**1 layout file**:
- `src/layouts/BaseLayout.astro`

**1 report file**:
- `reports/229-235_WECHAT_RESIDUE_AND_GLOBAL_CTA_CLEANUP_V01_report.md`
