# 269_RESOURCE_TUTORIAL_ARTICLES_PRECHECK_V01 预检查报告

## 1. 执行结论

✅ 只读预检查完成。E01 和 E02 的落地方案已确定，未创建/修改任何文件。

## 2. E01：关键词清洗表怎么填（逐字段教学）

### 2.1 推荐文件名

`src/content/posts/keyword-cleaning-sheet-tutorial.md`

> 说明：避免与现有 `keyword-cleaning-method.md`（关键词第 2 篇，讲清洗方法/SOP）重名或冲突。E01 是"逐字段教学"，不是"清洗方法"，角度不同。

### 2.2 推荐 frontmatter

```yaml
---
title: "关键词清洗表怎么填：逐字段教学"
description: "手把手教新手卖家填关键词清洗表的 8 个字段：关键词、来源、意图、搜索量参考、竞争强度、Listing 使用位置、广告使用方式、备注。"
topic: tools
stage: 实操
intent: 工具
relatedTopics:
  - keyword-cleaning-method
  - ai-keyword-cleaning-prompts
  - keyword-source-4-types
publicLessonUse: "关键词公开课清洗环节，搭配 8 字段清洗表逐格演示怎么填"
leadMagnet: "关键词清洗表"
wechatHook: "资料领取方式以资料详情页说明为准"
---
```

### 2.3 应链接的资源详情页

| 资源 | URL |
|------|-----|
| 关键词清洗表详情页 | `/resources/keyword-cleaning-sheet/` |
| 关键词清洗 SOP 模板（配套） | `/articles/keyword-cleaning-method/` |

### 2.4 应链接的公开课详情页

| 公开课 | URL |
|--------|-----|
| 关键词到 Listing 实操课 | `/open-class/keyword-to-listing/` |

### 2.5 应链接的相关文章

| 文章 | URL | 关系 |
|------|-----|------|
| 关键词清洗方法 | `/articles/keyword-cleaning-method/` | 配套方法论（清洗 4 步） |
| AI 关键词清洗提示词 | `/articles/ai-keyword-cleaning-prompts/` | 配套提示词（用 AI 辅助清洗） |
| 关键词 4 类来源 | `/articles/keyword-source-4-types/` | 前置知识（词从哪来） |
| 搜索量陷阱 | `/articles/keyword-search-volume-trap/` | 后置知识（判断搜索量可信度） |

### 2.6 写作注意事项

1. **角度 ≠ 现有 keyword-cleaning-method**：现有文章讲"去重→归一→聚类→排序"4 步方法。E01 讲"8 个字段分别怎么填、填到什么程度、填错了会有什么后果"。两者互补不冲突。
2. **每字段一个实操示例**：用一个虚拟产品（如厨房沥水架）跑通全部 8 个字段。
3. **资源详情页** `keyword-cleaning-sheet.astro` 已直接描述了 8 个字段的含义和 5 步流程。文章应该提供更详细的"填表判断逻辑"（这个字段为什么要填×而不是√、不确定时怎么处理）。
4. **不要在文章里重复 resource page 已有的字段表**。文章应该聚焦"判断过程"，不是"字段定义"。
5. **topic 建议用 tools**（按 266 规划），不属于 keyword 专题序列。
6. **leadMagnet 用"关键词清洗表"**，与 resource page 保持一致。

## 3. E02：Listing 自检清单怎么用（检查顺序和判断标准）

### 3.1 推荐文件名

**不要新增文件。** 直接填充现有占位文章：

`src/content/posts/listing-checklist.md`

> 说明：`listing-checklist.md` 当前是 42 行占位文章（内容仅"这是一篇占位文章"），resource detail page `listing-checklist.astro` 已将其列为"配套文章"（href: `/articles/listing-checklist/`）。E02 应直接填入该文件，替换占位内容。

### 3.2 推荐 frontmatter

沿用现有 frontmatter，**只替换正文**，保留原来字段：

```yaml
---
title: "Listing 自检清单怎么用：检查顺序和判断标准"
description: "手把手教新手卖家按正确顺序使用 Listing 自检清单：先查关键词布局、再查卖点表达、再查图片、再查 A+ 和 Review 承接、最后查信任表达。"
pubDate: "2026-06-06"
category: "Listing 优化"
tags: ["Listing", "自检清单", "检查流程"]
image: "/images/articles/listing-checklist/cover.svg"
draft: false
topic: listing
stage: 实操
intent: 工具
relatedTopics:
  - listing-five-bullets
  - ai-listing-optimization
  - ai-listing-prompt-template
publicLessonUse: "Listing 公开课上线前自检环节，带学员按 5 步检查顺序逐项判断"
leadMagnet: "Listing 自检清单"
wechatHook: "资料领取方式以资料详情页说明为准"
prevArticle: listing-five-bullets
nextArticle: ai-listing-optimization
relatedArticleLinks:
  - slug: listing-five-bullets
    label: Listing 五点写法
    context: Listing 第 1 篇
  - slug: ai-listing-optimization
    label: AI Listing 写法
    context: Listing 第 3 篇
---
```

> 注意：保留 `topic: listing`（维持 listing 专题序列，E02 是"Listing 第 2 篇"），不改为 `topic: tools`，否则会破坏 prevArticle/nextArticle 链条。

### 3.3 应链接的资源详情页

| 资源 | URL |
|------|-----|
| Listing 自检清单详情页 | `/resources/listing-checklist/` |
| AI Listing 改写对比模板 | `/resources/ai-listing-optimization/` |

### 3.4 应链接的公开课详情页

| 公开课 | URL |
|--------|-----|
| Listing 自检与转化表达课 | `/open-class/listing-conversion-check/` |

### 3.5 应链接的相关文章

| 文章 | URL | 关系 |
|------|-----|------|
| Listing 五点写法 | `/articles/listing-five-bullets/` | 前置内容（五点怎么写） |
| AI 时代 Listing 怎么写 | `/articles/ai-listing-optimization/` | 后置内容（AI 辅助写作） |
| AI Listing 提示词模板 | `/articles/ai-listing-prompt-template/` | 配套提示词（AI 写初稿→自检清单检查） |

### 3.6 写作注意事项

1. **聚焦"检查顺序和判断标准"**：resource detail page 已有 8 个维度定义和 5 步流程。文章应该讲的是"先查什么、后查什么、每个维度怎么判断过/没过、不确定时怎么办"。
2. **不要照搬 resource page 内容**。resource page `listing-checklist.astro` 已有字段表和 5 步流程。文章应补充判断逻辑。
3. **title 改为"Listing 自检清单怎么用"**，替换原来的"Listing 第 2 篇：优化检查清单"。
4. **description** 当前太泛（"适合亚马逊卖家发布前检查 Listing"），E02 应改为具体描述（如上所示）。
5. **增加 `pubDate`、`tags`、`draft: false`**（现有 frontmatter 缺少这些字段）。
6. **topic 保持 listing**（不要改 tools），因为它在 listing 专题序列中。
7. **content structure 建议**：
   - 一、为什么检查顺序重要（无序检查容易漏项）
   - 二、正确检查顺序（先骨架→再内容→再视觉→再承接→再信任）
   - 三、每个维度的判断标准（过/没过/不确定 三档的具体判断逻辑）
   - 四、常见翻车判断（以为过了、其实没过的场景）
   - 五、不确定时怎么办（回到哪篇文章、问什么问题）
   - 六、自检后动作（检查完了要改什么、改完怎么验证）

## 4. 是否需要更新 tools 学习路径或首页入口

### 4.1 tools 学习路径（`tools-learning-path.md`）

- **暂时不需要**。E01（topic: tools）一旦创建，会在 tools 学习路径的"辅助阅读"中被引用，但当前不急着改路径文章。
- 建议在 E01 和 E02 都**落地并验证通过后**，再微调 `tools-learning-path.md` 的"四、对应已有文章卡片"，增加 E01 条目。

### 4.2 首页入口（`index.astro`）

- **E01（topic: tools）**：可加入首页 tools 主题的 articles 列表，但 tools 主题当前 articles 数组为空（仅展示 previews 占位文字）。建议等 E01 落地后一并更新。
- **E02（topic: listing）**：首页 listing 主题已有 4 篇文章链接，E02 是 listing-checklist.md 的正文填充，路径不变，无需更新首页。

### 4.3 keyword 学习路径

- **E01** 可作为 keyword 学习路径的辅助阅读补充（在"清洗"步骤旁），但非必须，建议等 E01 落地后再看。

## 5. 下一步 OpenCode 落地任务边界

### 落地范围

| 允许 | 不允许 |
|------|--------|
| 创建 `src/content/posts/keyword-cleaning-sheet-tutorial.md` | 修改 `.opencode/` |
| 填充 `src/content/posts/listing-checklist.md`（替换占位内容） | 修改 AGENTS.md |
| 更新 frontmatter（补充 pubDate/tags/draft，改 title/desc） | 修改 package.json |
| 补充站内链接（resource/open-class/article） | 接入 LLM/API |
| 更新 E01 和 E02 的 leadMagnet/publicLessonUse | 新增依赖 |
| 运行 npm run build + seo:audit + images:check | 新增公开课 |
| 输出 `reports/269_RESOURCE_TUTORIAL_ARTICLES_V01_report.md` | 修改 AI 阿岩助手代码 |
| 恢复 `reports/seo-audit-report.md` 到 HEAD | 自动 commit/push |

### 落地后需同步的文件（可选，建议下批次做）

| 文件 | 改动内容 |
|------|---------|
| `tools-learning-path.md` | 在"对应已有文章卡片"中增加 E01 |
| `index.astro` | 在 tools 主题 articles 中增加 E01 链接 |
| `keyword-learning-path.md` | 在"清洗"步骤辅助阅读中增加 E01 |

## 6. 给 GPT 的回填摘要

```
269 预检查：E01 和 E02 资源包配套教学文章落地方案。

结论：
1. E01（关键词清洗表怎么填）：新建文件 keyword-cleaning-sheet-tutorial.md，topic=tools。
   与现有 keyword-cleaning-method（清洗方法/SOP）互补不冲突。
   链接资源详情页 keyword-cleaning-sheet/、公开课 keyword-to-listing/。
2. E02（Listing 自检清单怎么用）：不新建，直接填充现有占位文件 listing-checklist.md。
   保留 topic=listing，补充 pubDate/tags/draft，改 title/desc。
   资源页已链接 /articles/listing-checklist/ 作为配套文章，填空即可。
3. 两个文件的 leadMagnet 分别匹配 resource page（关键词清洗表 / Listing 自检清单）。
4. tools 学习路径和首页入口建议在落地通过后再更新，当前不急。
5. E02 注意不要改成 topic=tools（会破坏 listing 专题 prev/next 链）。

落地执行时只需：1 个新建文件 + 1 个文件填充替换 + 验证。
```
