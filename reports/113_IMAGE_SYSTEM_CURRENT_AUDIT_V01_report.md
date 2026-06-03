# 113 — 图片系统现状审计报告

## 1. Manifest 文件位置与结构

| 字段 | 内容 |
|------|------|
| 文件路径 | `src/data/image-manifest.json` |
| 格式 | JSON Array |
| 当前条目数 | 7 |
| 检查脚本 | `scripts/check-image-manifest.mjs` |

每个 manifest item 包含 6 个字段：`id`, `path`, `type`, `topics`, `keywords`, `alt`。

## 2. 7 个 Manifest Item 详情

| id | path | type | topics | alt |
|----|------|------|--------|-----|
| ai-amazon-hero-01 | /images/article-assets/ai-amazon/ai-amazon-hero-01.svg | hero | ai-amazon, ai-operations | 亚马逊卖家使用 AI 提升运营效率的示意图 |
| ai-workflow-01 | /images/article-assets/ai-amazon/ai-workflow-01.svg | framework | ai-amazon, workflow | AI 在亚马逊运营中的五个应用场景图 |
| ai-sop-01 | /images/article-assets/ai-amazon/ai-sop-01.svg | summary | ai-amazon, sop | 亚马逊卖家 AI 运营落地 SOP 流程图 |
| ppc-dashboard-01 | /images/article-assets/ppc/ppc-dashboard-01.svg | section | ppc, advertising | 亚马逊广告 PPC 数据复盘示意图 |
| listing-structure-01 | /images/article-assets/listing/listing-structure-01.svg | section | listing | AI 时代亚马逊 Listing 优化结构图 |
| review-analysis-01 | /images/article-assets/review/review-analysis-01.svg | section | review | 亚马逊 Review 分析用户痛点示意图 |
| summary-01 | /images/article-assets/common/summary-01.svg | summary | common | 亚马逊 AI 运营核心总结图 |

## 3. 本地已有图片统计

| 目录 | 文件数 | 用途 |
|------|--------|------|
| `public/images/article-assets/` | 7 | 文章通用配图（manifest 中） |
| `public/images/articles/{slug}/` | 3 | 文章特定配图 |
| `public/images/generated-infographics/` | 3 | 仅 2026-amazon-ai-operations 一篇生成 |
| `public/images/covers/` | 3 | 专题封面（keyword, listing, ai-operations） |
| `public/images/` | 4 | 全局资源（og-default, hero-pattern, avatar, hero） |
| **总计** | **20** | |

## 4. auto-attach-images 脚本逻辑

- 扫描 `src/content/posts/*.md`
- 查找 `<!-- AUTO_IMAGE:{type} -->` 标记
- 从 manifest 中根据 type + topic + keywords 评分匹配最佳图片
- 插入 `<!-- AUTO_IMAGE_RENDERED_START --> ... <img> ... <!-- AUTO_IMAGE_RENDERED_END -->`
- 未触发条件：文章内没有 `AUTO_IMAGE:` 标记就不会执行

**问题**：当前 28 篇文章中极少包含 `AUTO_IMAGE:` 标记，脚本实际有效覆盖几乎为零。

## 5. generate-article-infographics 脚本逻辑

- 扫描 `src/content/posts/*.md`
- 解析 frontmatter 和 h2 标题
- 为每篇文章生成 3 个 SVG：hero.svg / framework.svg / summary.svg
- 输出到 `public/images/generated-infographics/{slug}/`
- 在文章中插入 `AUTO_INFOGRAPHIC:` 标记

**问题**：初始设计为仅用于 `2026-amazon-ai-operations` 一篇（有硬编码特殊处理），通用生成逻辑缺乏样式多样性，批量生成会产生大量几乎相同的视觉图。

## 6. check-image-manifest 脚本逻辑

- 读取 manifest 中所有 path
- 检查文件是否存在于 `public/`
- 扫描 `public/images/article-assets/` 下是否有文件未在 manifest 中（orphan）
- 检查 manifest 中是否有重复 id

## 7. 为什么 images:check 是 7 项

因为 manifest 中只有 7 条记录。文章的 cover 图片（如 `new-product-ppc-week-one/cover.svg`）**不在 manifest 中**，而是在文章 frontmatter 的 `image` 字段通过路径直接引用。

## 8. 存在的问题

1. **manifest 未覆盖文章封面**：2 篇有自定义封面的文章（cover.svg, png）不在 manifest 中
2. **manifest 未覆盖专题封面**：3 个专题 cover SVG 不在 manifest 中
3. **manifest 未覆盖 generated-infographics**：3 个文件不在 manifest 中
4. **28 篇文章仅 2 篇有自定义封面图**，仅 1 篇有信息图
5. **auto-attach-images 几乎闲置**：28 篇文章中极少有 `AUTO_IMAGE:` 标记
6. **orphan 检查仅覆盖 article-assets/**：其他图片目录（articles/, covers/, generated-infographics/）不在 orphan 扫描范围内
7. **图片命名不一致**：同时存在 cover.svg、guide.svg、keyword-table-overview.png、hero.svg 等多套命名风格

## 9. 安全状况

- 0 missing（manifest 中所有 path 文件均存在）
- 0 duplicate（manifest 无重复 id）
- 0 orphan（article-assets/ 下无未注册文件）
- 但这是**审计范围不足**导致的"安全"，不是真正的系统健康
