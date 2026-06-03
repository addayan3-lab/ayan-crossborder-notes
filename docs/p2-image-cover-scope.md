# P2 Image Cover Scope

## Purpose
This document defines the scope for P2 batch — generating SVG cover images for articles still using `og-default.svg` or missing an image field. P2 follows the same constraints as P1: SVG-only, 1200×630, system-ui fonts, no external dependencies, no photorealistic images, no Amazon logo.

## Current Coverage Status (28 articles total)

| Category | Count | Details |
|----------|-------|---------|
| Learning path (with cover) | 6 | keyword, listing, ppc, review, ai-search, tools |
| P1 batch (with cover) | 11 | keyword-cleaning-method, keyword-source-4-types, keyword-search-volume-trap, listing-five-bullets, listing-checklist, ai-listing-optimization, sp-ad-structure, ai-ppc-report-review, review-analysis-matrix, ai-competitor-matrix, amazon-ai-tools-review |
| Prior custom cover | 2 | new-product-ppc-week-one, ai-keyword-table (PNG) |
| **Still needs cover** | **9** | See table below |

## P2 Candidate Articles

### Tier 1 — High Priority (core content articles)

| # | Slug | Title | Topic | Current Image | Theme Direction |
|---|------|-------|-------|---------------|----------------|
| 1 | `negative-review-listing-fix` | 差评改 Listing：5 个步骤把负反馈变成下一版卖点 | review | `/images/og-default.svg` | 差评归因 → 修复动作 → Listing 改版流程：4 类差评（物流/预期/质量/服务）+ 修复对应动作 |
| 2 | `ai-review-analysis` | 如何用 AI 分析 Review 找到产品卖点 | review | MISSING | AI 提取 Review 痛点 + 卖点 + 场景词：从评价文本到结构化洞察 |
| 3 | `ai-market-size-estimate` | AI 做亚马逊市场容量判断：从关键词倒推一个品类的天花板 | selection | `/images/og-default.svg` | 搜索量聚合 → Top 100 销量推算 → 价格带分布：市场容量三数字判断 |
| 4 | `selection-pain-reverse` | 痛点反推选品：从差评和问答找机会 | selection | `/images/og-default.svg` | 差评痛点 → 选品机会反推流程：Review 痛点 → 选品标准 |
| 5 | `consumer-ai-search-amazon` | 消费者如何用 Amazon AI 搜索产品 | ai-search | MISSING | 消费者 AI 搜索行为（Rufus/Alexa）：用户提问方式 → 搜索结果变化 |
| 6 | `amazon-rufus-alexa-shopping` | Amazon Rufus / Alexa for Shopping 对卖家意味着什么 | ai-search | MISSING | 平台 AI 工具对 Listing 表达与评价质量的影响对比 |

### Tier 2 — Medium Priority

| # | Slug | Title | Topic | Current Image | Theme Direction |
|---|------|-------|-------|---------------|----------------|
| 7 | `2026-amazon-ai-operations` | 2026 年亚马逊卖家如何利用 AI 提升运营效率 | ai-search | MISSING | 选品/Listing/广告/Review/SOP 五大场景全景图 |
| 8 | `amazon-platform-rules-beginner` | 亚马逊平台规则入门:新手最容易踩的 10 个坑 | tools | MISSING | 亚马逊新手规则避坑：10 个常见违规场景 + 7 项 check |

### Skip

| # | Slug | Title | Reason |
|---|------|-------|--------|
| 9 | `ai-operations-resource-pack` | 亚马逊 AI 运营资料包领取说明 | 资料包下载页，非原创文章，不需要封面图 |

## Summary

| Item | Count |
|------|-------|
| P2 total candidates | 8 |
| Tier 1 (high priority) | 6 |
| Tier 2 (medium priority) | 2 |
| Skip | 1 |
| P2 batch total (if all) | **8 articles** |

## Visual Style Notes
- 6 Tier 1 articles: each gets a unique structured layout (table, flow, funnel)
- 2 Tier 2 articles: simpler layouts
- Color scheme follows existing per-topic palette (review=rose, selection=indigo, ai-search=slate, tools=neutral)
- All SVGs: 1200×630, system-ui, no external resources, no Amazon logo, no screenshots

## Mapping to Previous Batches
- P1 (11 covers): keyword-series(3) + listing-series(3) + ppc-series(2) + review(1) + selection(1) + ai-tools(1)
- P2 (8 covers): review-series(2) + selection-series(2) + ai-search-series(3) + tools(1)
- After P2, all 28 articles would have custom covers (19 SVG + 1 PNG + 6 learning path SVG + 2 prior custom)
- Manifest would grow from 41 to 49

## Prerequisites
- [ ] Task 127 (deploy check) completed
- [ ] Task 128 (P1 article verification) completed
- [ ] Task 130 (manifest update pattern) understood
- [ ] Task 132 (QA process) validated
- [ ] This scope document approved
