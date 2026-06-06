# 内容编排字段规范 v1

## 说明

本规范定义了 `src/content/posts/` 下所有文章 frontmatter 中用于内容编排的字段。目标是在不修改首页/学习路径代码的前提下，通过 frontmatter 驱动自动化推荐和聚合。

## 新增字段清单

| 字段 | 类型 | 必填 | 用途 | 可选值 |
|------|------|------|------|--------|
| `articleType` | string | 是 | 文章类型分类 | `learning-path`, `prompt`, `tutorial`, `method`, `case-study`, `theory` |
| `seriesOrder` | int | 否 | 同一 topic 内阅读顺序 | 正整数，如 `1`, `2` |
| `homepageSlot` | string | 否 | 首页推荐区域 | `beginner-start`, `latest-update`, `hot-practical`, `ai-prompt`, `resource-tutorial` |
| `resourceSlug` | string | 否 | 配套资源详情页 slug | 资源页文件名（不含 .astro），如 `keyword-cleaning-sheet` |
| `openClassSlug` | string | 否 | 配套公开课 slug | 公开页文件名（不含 .astro），如 `keyword-to-listing` |
| `featured` | boolean | 否 | 是否精选推荐 | `true`, `false`（默认 false） |
| `priority` | string | 否 | 推荐优先级字符串 | `high`, `medium`, `low` |
| `seriesOrder` | int | 否 | 同一 topic 内学习路径阅读顺序 | 正整数，如 `1`, `2` |
| `pathRole` | string | 否 | 在学习路径中的角色 | `primary`（主读）, `secondary`（辅助阅读） |
| `pathLabel` | string | 否 | 学习路径卡片中显示的短描述（2-6 字） | 如 `"工具视角入口"`, `"来源扩展"` |
| `learningPathAutoArticles` | boolean | 否 | 是否在该学习路径页面底部自动渲染专题文章卡片列表 | `true`, `false`（默认 false） |

## 已有字段（不变）

| 字段 | 说明 |
|------|------|
| `topic` | 所属专题 | 
| `stage` | 阶段：新手 / 实操 / 进阶 |
| `intent` | 意图：学习 / 工具 / 决策 / 避坑 |
| `relatedTopics` | 关联文章 slug 列表 |
| `publicLessonUse` | 公开课场景 |
| `leadMagnet` | 资料领取 |
| `wechatHook` | 微信承接 |

## articleType 定义

| 值 | 说明 | 示例文章 |
|-----|------|---------|
| `learning-path` | 学习路径 | selection-learning-path, ai-search-learning-path, tools-learning-path |
| `prompt` | AI 提示词 | prompt-structure, ai-listing-prompt-template, ai-keyword-cleaning-prompts |
| `tutorial` | 资源配套教学 | keyword-cleaning-sheet-tutorial, listing-checklist |
| `method` | 方法实操 | keyword-source-4-types, listing-five-bullets, sp-ad-structure |
| `case-study` | 脱敏案例（预留） | （D 组文章） |
| `theory` | 理论/趋势 | amazon-rufus-alexa-shopping, consumer-ai-search-amazon |

## homepageSlot 定义

| 值 | 用途 | 匹配条件（首页） |
|-----|------|-----------------|
| `beginner-start` | 新手先读 | stage=新手, articleType=learning-path, featured=true |
| `latest-update` | 最新更新 | 按 pubDate 排序取前 N 篇（排除 learning-path） |
| `hot-practical` | 热门实操 | stage=实操, intent=工具, featured=true |
| `ai-prompt` | AI 提示词 | articleType=prompt, featured=true |
| `resource-tutorial` | 资源配套教学 | articleType=tutorial, featured=true |

## 使用示例

```yaml
---
title: "关键词清洗表怎么填：逐字段教学"
pubDate: "2026-06-06"
draft: false
articleType: tutorial
homepageSlot: resource-tutorial
resourceSlug: keyword-cleaning-sheet
featured: true
priority: 75
topic: tools
stage: 实操
intent: 工具
---
```

## 检查脚本（未来）

建议新增以下 npm script 验证字段完整性：

```bash
npm run frontmatter:check
```

检查项：
- 所有文章是否包含 `articleType`
- `articleType` 值是否在允许列表内
- `homepageSlot` 值是否在允许列表内（如有设置）
- `resourceSlug` 对应的资源页是否存在
- `openClassSlug` 对应的公开课页是否存在
