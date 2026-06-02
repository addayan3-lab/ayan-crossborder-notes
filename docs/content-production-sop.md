# 阿岩跨境笔记｜内容生产 SOP v2

## 一、专题结构

站点按 6 个专题组织内容，每个专题下持续连载文章：

| 专题 | slug | 入口 |
|------|------|------|
| 关键词表系列 | `keyword` | `/articles/ai-keyword-table/` |
| Listing 优化系列 | `listing` | `/listing/` |
| 广告 PPC 系列 | `ppc` | `/ppc/` |
| Review 分析系列 | `review` | `/articles/ai-review-analysis/` |
| AI 搜索与消费者变化 | `ai-search` | `/ai-amazon/` |
| 工具模板与资料包 | `tools` | `/lead/` |

每篇文章归一个专题，前端首页按专题展示，避免"杂乱博客"感。

## 二、创建新文章

执行：

```
npm run content:new
```

按提示填写：

- 文章标题
- slug
- 分类（在 6 个专题里选一个）
- SEO 描述
- 是否为草稿

文章自动生成到 `src/content/posts/`，命名规则为 `{slug}.md`。

## 三、编辑文章

打开生成的 md 文件，按专题补齐正文。

通用结构（按专题可微调）：

1. 导语块（解决什么问题）
2. 核心判断标准
3. 实操方法 / SOP
4. 常见误区
5. AI 在这一步能做什么、不能做什么
6. 最后总结 + 下一篇预告

文中 callout 块使用：

```html
<div class="article-callout article-callout-blue">…</div>
<div class="article-callout article-callout-yellow">…</div>
<div class="article-callout article-callout-green">…</div>
<div class="article-callout article-callout-red">…</div>
```

emoji 规则：

- callout 块内可用 emoji（💡 ⚠️ ✅ ❌）
- H2/H3 标题里不放 emoji
- 文章目录里不放 emoji（已由 [slug].astro 自动清洗）

## 四、配图

文章 frontmatter 的 `image` 字段填入封面图路径：

```yaml
image: "/images/articles/{slug}/cover.svg"
```

SVG 配图放 `public/images/articles/{slug}/`，常见规格：

- `cover.svg`：1200x630（OG / 卡片分享）
- `guide.svg`：1080x1440（小红书竖版）
- `infographic-1.svg` 等：1200x1500（信息图）

## 五、发布前检查

执行完整流程：

```
npm run images:check     # 校验 image-manifest
npm run build            # astro build + pagefind
npm run seo:audit        # 21 页面基础 SEO 体检
```

三步全部 0 fail 才能进入下一步。

## 六、提交上线

确认页面正常后执行：

```
git add .
git commit -m "publish: {专题}/{文章 slug}"
git push
```

Cloudflare Pages 会自动部署。

## 七、上线后检查

- `https://amz.hao1234.top/articles/`
- `https://amz.hao1234.top/search/`
- `https://amz.hao1234.top/sitemap-index.xml`

重点文章在 Google Search Console 与 Bing Webmaster Tools 主动请求索引。

## 八、内容节奏

建议周更一篇，按专题轮换：

- 单数周：写实操方法（关键词 / Listing / PPC / Review / 选品）
- 双数周：写案例拆解 / 资料包更新 / 公开课回顾

每月最后一周做一次专题回顾，把当月 4 篇内容整理成专题导览，更新首页"专题学习路径"卡片。

## 九、首页专题学习路径更新

每次新增文章后，更新 `src/pages/index.astro` 里的 `topicPaths` 数组：

- 已发布的文章移到 `articles` 数组
- 移出已发布的"后续预告"项

不要新增"专题"，站点保持 6 个专题稳定结构。

## 十、避坑清单

- 不要修改 BaseLayout.astro 的 SEO 标记、JSON-LD、Analytics
- 不要修改 [slug].astro 的目录清洗逻辑
- 不要在专题页里加"加载更多"分页
- 不要接支付、会员、评论系统
- 改首页结构前先备份 `src/pages/index.astro` 到 `archive/`

## 十一、内容生产标准（v2 字段）

每篇文章从一开始就结构化，不仅写正文。这些字段为后续相关文章、Pagefind 筛选、公开课素材、微信私域引流提供基础。

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `title` | string | 文章标题 | `如何用 AI 做亚马逊关键词表` |
| `description` | string | SEO 描述 | `用 AI 辅助整理关键词表…` |
| `category` | string | 分类（中英兼容） | `关键词` |
| `topic` | enum | 专题 ID（与首页 6 卡对应） | `keyword` / `listing` / `ppc` / `review` / `selection` / `ai-search` / `tools` |
| `stage` | enum | 适用阶段 | `新手` / `进阶` / `实操` |
| `intent` | enum | 阅读意图 | `学习` / `工具` / `决策` / `避坑` |
| `relatedTopics` | string[] | 关联文章 slug | `["ai-keyword-table", "keyword-source-4-types"]` |
| `publicLessonUse` | string | 公开课延伸用途 | `本篇可直接做公开课第 3 场讲稿` |
| `leadMagnet` | string | 资料包入口 | `附关键词表 v1 模板下载` |
| `wechatHook` | string | 私域引流钩子 | `领取"亚马逊运营检查表"v2 PDF` |

示例 frontmatter：

```yaml
---
title: "关键词清洗方法：从关键词池到可用词表"
description: "把收了一堆词变成能写进 Listing 和广告的可用词表，覆盖去重、归一、聚类与优先级排序。"
pubDate: "2026-06-02"
category: "关键词"
tags: ["关键词", "AI 提效"]
image: "/images/og-default.svg"
draft: false
topic: keyword
stage: 实操
intent: 工具
relatedTopics:
  - ai-keyword-table
  - keyword-source-4-types
  - keyword-search-volume-trap
publicLessonUse: 本篇可作为公开课"关键词体系"模块讲稿
leadMagnet: 附关键词清洗 SOP 模板
wechatHook: 回复关键词"清洗"领取模板
---
```

字段使用规则：

- `topic` 必填，文章归入对应专题
- `stage` 必填，影响 Pagefind 筛选与首页推荐
- `intent` 必填，影响文章之间的关联推荐
- `relatedTopics` 至少 2 个，建立文章网状结构
- `publicLessonUse` 至少 1 句话，为公开课转化留入口
- `leadMagnet` 与 `wechatHook` 二选一，不强制

已有 13 篇文章暂不强制补全，按"新文章必填"逐步回填。

## 十二、避坑（v2 补充）

- 不要让文章孤立。`relatedTopics` 至少连 2 篇
- 不要让专题页变成文章列表。专题页要有"学习路径"
- 不要让 AI 工具测评挤掉运营内容。比例不超过 1:5
- 不要让首页有"加载更多"分页。一次性展示
- 不要让公开课与文章脱钩。每场课对应 3-5 篇文章

