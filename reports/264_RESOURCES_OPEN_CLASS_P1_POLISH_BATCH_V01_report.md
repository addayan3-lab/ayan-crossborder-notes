# 264: Resources & Open Class P1 Polish Batch

## 执行结论

**成功** — 修复了 259/260 报告的 3 类 P1 问题，涉及 15 个文件，+60 / −22 行。

## 259/260 P1 问题清单

| # | 来源 | 问题 | 优先级 |
|---|------|------|--------|
| 1 | 259 | 公开课详情页 `wechat-block` 文案未对齐，仍含微信导向 | P1 |
| 2 | 260 | 公开课详情页 "先做 30 秒诊断" 不是可点击链接 | P1 |
| 3 | 260 | 资源详情页 "对应公开课" 链接统一指向 `/open-class/`，未指向具体课程 | P1 |
| — | 260 | 公开课详情页缺少 "你是不是遇到这些问题" 痛点承接段 | P1(跳过) |

## 已修复项目

| # | 修复内容 | 文件数 |
|---|---------|--------|
| 1 | **公开课详情页 wechat-block → 问卷优先文案**：将原微信导向文案中的 "先做 30 秒诊断" 改为可点击 `<a href="/survey/">` 链接，新增 `.wechat-link` CSS 样式 | 8 |
| 2 | **资源详情页 -> 具体课程链接**：7 个资源的 "对应公开课" 卡片从 `/open-class/` 改为各自具体课程详情页，CTA 文本从 "查看公开课安排 →" 改为 "查看课程详情 →" | 7 |

### 修改详情

**8 个公开课详情页** (`src/pages/open-class/*.astro`):
- wechat-block 区 "先做 30 秒诊断" → 可点击链接 `<a href="/survey/" class="wechat-link">`
- 新增 `.wechat-link { color: #065f46; text-decoration: underline; font-weight: 700; }` CSS

**7 个资源详情页** (`src/pages/resources/*.astro`):
- `对应公开课` 卡片链接改为具体课程详情：
  - keyword-cleaning-sheet → `/open-class/keyword-to-listing/`
  - ppc-weekly-review → `/open-class/ppc-week-one/`
  - review-pain-analysis → `/open-class/review-to-selection/`
  - ai-tools-review-sheet → `/open-class/ai-tools-for-amazon/`
  - competitor-selection-matrix → `/open-class/competitor-selection-matrix/`
  - listing-checklist → `/open-class/listing-conversion-check/`
  - platform-rules-checklist → `/open-class/platform-rules-beginner/`
- CTA 文本: "查看公开课安排 →" → "查看课程详情 →"

## 验证结果

| 检查项 | 结果 |
|--------|------|
| `npm run build` | ✅ 57 pages, 0 errors |
| `npm run seo:audit` | ✅ 456/0 (pass/fail) |
| `npm run images:check` | ✅ 49/0/0/0 |
| `reports/seo-audit-report.md` | ✅ restored to HEAD |

## 遗留问题

| 问题 | 原因 |
|------|------|
| 公开课详情页缺少 "你是不是遇到这些问题" 痛点承接段 | 涉及 8 个页面的新增大块内容，需文案创作，与 "不要新增大块页面结构" 冲突，建议后续作为独立文案任务处理 |
| 公开课列表页 "微信关键词" 视觉权重过重 (P2) | 样式调整，非 P1，未处理 |
| 公开课详情页缺少 "不适合谁" 反向筛选 (P2) | 同上 |
| 公开课详情页 before-hero 痛点钩子 (P1) | 需 8 页独立文案，改为独立任务 |

## 风险

- 低：所有修改都在已有页面结构内，无新增依赖或 API
- 低：资源页链接改为具体课程，需确认每个映射正确
- 无业务逻辑、部署配置变更

## 下一步建议

1. 如确认修改无误，建议 commit + push
2. 后续可启动独立的公开课新手化文案任务（痛点承接段 + 术语降级）
3. 剩余 P2 问题（微信关键词弱化、不适合谁）可并入未来批次

## 给 GPT 的回填摘要

264 批量修复了 259/260 报告的 P1 问题。公开课 8 个详情页的 wechat-block 文案中 "先做 30 秒诊断" 改为可点击链接（指向 /survey/），去除微信强导向。7 个资源详情页的 "对应公开课" 链接从泛化的 /open-class/ 改为各自对应的具体课程详情页。15 个文件 +60/-22 行，build/seo/images 全通过。痛点承接段因涉及 8 页独立文案创作且与 "不要新增大块页面结构" 要求冲突，建议作为独立任务处理。
