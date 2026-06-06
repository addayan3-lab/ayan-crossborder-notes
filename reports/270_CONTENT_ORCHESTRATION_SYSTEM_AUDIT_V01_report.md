# 270_CONTENT_ORCHESTRATION_SYSTEM_AUDIT_V01 审计报告

## 1. 当前问题判断

### 1.1 核心矛盾

当前新增一篇文章的完整操作链：

```
写文章 (1 步)
  → 补首页 index.astro topicPaths.articles (1 步)
  → 更新学习路径 article 的"对应已有文章卡片" (1 步)
  → 更新 learning path 的"推荐阅读顺序" (1 步)
  → 更新 learning path 的"本周实操任务" (1 步)
  → 可能需要更新 topic 页面 (1 步)
  → 可能需要更新资源承接页 (1 步)
  → 输出报告 (1 步)
```

**全部是手动。** 这在小规模（<30 篇）还可控，但按 266 规划再增 60 篇时，每个环节都会成为"漏步点"。

### 1.2 系统已有但未用足的自动化能力

| 能力 | 位置 | 当前状态 |
|------|------|---------|
| `topic` field auto-aggregation | `RecommendedOrder.astro` | ✅ 可用，按 topic 自动聚合文章 |
| `getCollection` 按 draft 过滤 | 多处 | ✅ 已用 |
| `pubDate` sort | `articles/index.astro` | ✅ 已用 |
| `prevArticle` / `nextArticle` | 部分文章 | ✅ 但非强制 |
| `relatedTopics` cross-reference | frontmatter | ✅ 但未用于自动推荐 |

## 2. 为什么现在新增文章流程变麻烦

### 2.1 首页是纯手动维护

`index.astro` 第 18-162 行的 `topicPaths` 数组完全硬编码：

```js
articles: [
  { title: "关键词第 4 篇：用 AI 做关键词表", href: "/articles/ai-keyword-table/" },
  ...
]
```

每新增一文，开发者必须手动选择放在哪个 topic、写 title、写 href。无法从 frontmatter 自动读取。

### 2.2 学习路径是纯手动维护

`src/content/posts/*-learning-path.md` 中的"推荐阅读顺序"和"对应已有文章卡片"完全手动。每新增一文，路径文章的手动更新步骤是**遗忘率最高**的环节（参见 268 报告第 7 节：遗留了"学习路径未同步"问题）。

### 2.3 topic 页面有双轨问题

- `RecommendedOrder.astro` 可以**自动**按 topic 聚合（基于 `data.topic` 字段）
- 但 `listing/index.astro` 第 57-61 行又**手动**写了文章卡片

这意味着同一篇文章可能同时在自动推荐区和手动卡片区出现。维护者不知道应该删掉手动区还是保留。

### 2.4 缺少"文章类型"分类

当前 frontmatter 只有 `topic`（所属专题），没有 `articleType`（什么是文章类型）。当前文章从内容上可以分为：

```
学习路径 (learning-path)
  6 篇：keyword / listing / ppc / review / ai-search / tools / selection

AI 提示词 (ai-prompt)
  3 篇：prompt-structure / ai-listing-prompt / ai-keyword-cleaning

资源配套教学 (resource-tutorial)
  2 篇：keyword-cleaning-sheet-tutorial / listing-checklist (填充后)

方法实操 (method)
  N 篇：日常运营文章

案例拆解 (case-study)
  0 篇（266 D 组规划 10 篇）

理论/趋势 (theory)
  少数几篇
```

缺少这个分类，首页无法按"文章类型"做区域推荐（例如"最新提示词"区、"资源教学"区），只能按 topic 主题排列。

### 2.5 资源页与文章的关联是硬编码

`src/pages/resources/index.astro` 第 296-304 行维护了一个 `detailPageSlugs` 映射表：

```js
const detailPageSlugs = {
  "keyword-cleaning-method": "keyword-cleaning-sheet",
  "listing-checklist": "listing-checklist",
  ...
};
```

在 frontmatter 里没有字段让文章声明"我配套哪个资源"。每次新增资源配套文章都需要手动维护这个映射。

## 3. 推荐的 frontmatter 新字段

### 3.1 建议新增字段（第一阶段可加）

| 字段 | 类型 | 用途 | 示例 |
|------|------|------|------|
| `articleType` | string | 文章类型分类 | `"learning-path"`, `"ai-prompt"`, `"resource-tutorial"`, `"method"`, `"case-study"` |
| `seriesOrder` | int? | 同一 topic 内的阅读顺序（非强制） | `2`（表示该 topic 第 2 篇） |
| `resourceSlug` | string? | 配套的资源详情页 slug | `"keyword-cleaning-sheet"` |
| `openClassSlug` | string? | 配套的公开课 slug | `"keyword-to-listing"` |
| `featuredUntil` | date? | 首页精选展示截止日期 | `"2026-07-01"` |
| `homepageSlot` | string? | 首页推荐区域 | `"newbie-first"`, `"latest-update"`, `"hot-practical"`, `"ai-prompt"`, `"resource-tutorial"`, `null` |
| `seoPriority` | 1-3? | SEO 权重优先级（1=高） | `2` |

### 3.2 不建议在第一阶段加的字段

| 字段 | 原因 |
|------|------|
| `readingTime` | 可以自动计算字数推导 |
| `viewCount` / `likeCount` | 无后端数据库，无法持久化 |
| `lastUpdated` | dev-only 信息，对用户无意义 |
| `difficulty` | 已有 `stage` 字段（新手/实操/进阶） |
| `coverAlt` | image 文件名即可推导 |
| `canonicalUrl` | 当前无多站点需求 |

### 3.3 新增字段的 frontmatter 示例

```yaml
---
title: "关键词清洗表怎么填：逐字段教学"
topic: tools
stage: 实操
intent: 工具
articleType: resource-tutorial      # 新增
seriesOrder: 1                      # 新增
resourceSlug: keyword-cleaning-sheet # 新增
openClassSlug: keyword-to-listing    # 新增
homepageSlot: resource-tutorial     # 新增
relatedTopics:
  - keyword-cleaning-method
  - ai-keyword-cleaning-prompts
---
```

## 4. 首页推荐逻辑设计

### 4.1 五类推荐区域设计

```yaml
# 首页不再人工维护 topicPaths.articles[]
# 改为按 homepageSlot 自动聚合：

slot: newbie-first
  用途: 新手先读（stage=newbie 且 intent=learning 的学习路径文章）
  来源: topic=* 且 data.stage==="新手" 且 data.intent==="学习" 且 articleType==="learning-path"
  数量: 1-2 篇

slot: latest-update
  用途: 最新更新（最近发的文章）
  来源: topic=*（排除 articleType=learning-path）, 按 pubDate 排序
  数量: 3-5 篇

slot: hot-practical
  用途: 热门实操（stage=实操 且 intent=工具 的文章）
  来源: topic=* 且 data.stage==="实操" 且 data.intent==="工具"
  数量: 3-5 篇

slot: ai-prompt
  用途: AI 提示词专辑
  来源: articleType==="ai-prompt"
  数量: 2-3 篇

slot: resource-tutorial
  用途: 资源配套教学
  来源: articleType==="resource-tutorial"
  数量: 2-3 篇
```

### 4.2 首页结构变化示意

```astro
// 当前：topicPaths 手工数组 for 循环
const topicPaths = [ { id: "keyword", articles: [...] }, ... ]

// 改为：按 homepageSlot 聚合
const newbiePosts = allPosts.filter(p => p.data.stage === "新手" && ...)
const latestPosts = allPosts.sort(sortByDate).slice(0, 5)
const promptPosts = allPosts.filter(p => p.data.articleType === "ai-prompt")
```

### 4.3 保留原有 topic 卡片布局

topic 卡片（keyword/listing/ppc/review/selection/ai-search/tools）仍可以保留，但文章列表改为 `RecommendedOrder` 组件自动读取（已在 topic 页面使用），不再手工维护 `articles[]`。

## 5. 学习路径自动化设计

### 5.1 问题本质

学习路径文章（`*-learning-path.md`）的"推荐阅读顺序"和"对应已有文章卡片"手动维护的成本高且容易遗忘。

### 5.2 替代方案：组件化

不再在 learning path markdown 里写死文章列表，改为用 Astro Component：

```astro
// LearningPathArticles.astro
// 接收 topic 参数，自动按 seriesOrder 排序输出文章列表
<LearningPathArticles topic="keyword" />

// 学习路径正文只需写"为什么读"的说明文字
// 文章卡片由组件自动渲染
```

### 5.3 `seriesOrder` 字段的作用

每篇文章新增 `seriesOrder` 字段：

```yaml
---
topic: keyword
seriesOrder: 2
---
```

`LearningPathArticles` 组件：按 `topic` 过滤 → 按 `seriesOrder` 排序 → 渲染文章卡片。

### 5.4 实操任务仍需手工维护

"本周实操任务"难以自动化（涉及具体运营动作描述），建议保持手工但加上检查提醒。

## 6. 阅读量 / 点赞量方案分阶段建议

### 6.1 当前阶段（不要做）

| 原因 | 说明 |
|------|------|
| 无后端数据库 | Astro 是静态站点，无法持久化阅读量 |
| 无登录系统 | 无法识别重复阅读 |
| 对转化无直接贡献 | 阅读量不影响新手下一步动作 |
| 增加页面复杂度 | 需要加载额外 analytics 脚本 |

### 6.2 替代方案（Phase 1 可用）

| 方案 | 优点 | 缺点 |
|------|------|------|
| Pagefind 搜索热词 | 免费，已有 | 颗粒度粗 |
| Cloudflare Web Analytics | 免费，无 cookie | 需要添加 script |
| Google Search Console 查询 | 免费，已有 | 延迟 1-2 天 |
| GitHub 仓库 star/fork | 已有 | 不反映内容热度 |

**推荐：** 先用 Cloudflare Web Analytics（轻量、免费、无侵入），不需要阅读量/点赞量 UI 展示。

### 6.3 建议第二阶段（非必须）

如需内容热度信号：
1. 在 Astro 生成时注入一个 `postRank.json`（发布者手动填写优先级）
2. 根据问卷/微信回复量推断热点主题
3. 不展示 UI，仅用于 AI 阿岩助手推荐排序

## 7. 不建议现在做的功能

| 功能 | 原因 |
|------|------|
| 全文编译时自动索引 | 已经用 Pagefind，不需要额外 |
| 用户登录系统 | 无后端，无法持久化 |
| 阅读量 badge/UI | 无后端数据源 |
| 评论系统 | 需要后端，运维成本高 |
| AI 生成文章摘要 | 需要 LLM API，违背当前原则 |
| 自动生成系列编号 | 手工写 `seriesOrder` 更可控 |
| 全文重构到 CMS | 超出当前阶段目标 |
| 多语言/国际化 | 当前仅中文站 |
| API 端点 | 当前仅静态页 |

## 8. 第一阶段 Build 任务建议

### 8.1 优先级 P0（核心阻塞）

| # | 任务 | 推理等级 | 说明 |
|---|------|---------|------|
| P0-1 | 新增 frontmatter 字段规范脚本 | 中 | 建 npm run frontmatter:check 脚本，检查文章是否含 articleType / seriesOrder / resourceSlug / homepageSlot |
| P0-2 | 补齐现有文章的 articleType | 中 | 已有 33 篇文章逐篇补充 articleType |
| P0-3 | 制作 LearningPathArticles 组件 | 中 | 替代学习路径文章卡片的手工维护 |

### 8.2 优先级 P1（首页改造）

| # | 任务 | 推理等级 | 说明 |
|---|------|---------|------|
| P1-1 | index.astro 首页改为自动化推荐 | 中 | 按 homepageSlot / stage / articleType 自动聚合，取消硬编码 `topicPaths.articles` |

### 8.3 优先级 P2（优化）

| # | 任务 | 推理等级 | 说明 |
|---|------|---------|------|
| P2-1 | 新增 articleType: case-study | 中 | 为 D 组案例文章做准备 |
| P2-2 | topic 页面去掉手动卡片区 | 中 | 保留 RecommendedOrder 即可 |
| P2-3 | index.astro 增加"AI 提示词"和"资源教学"区域 | 中 | 按 articleType 自动聚合 |
| P2-4 | resourceSlug 自动生成资源页按钮 | 中 | 文章详情页如果 frontmatter 有 resourceSlug 则自动显示"配套资料"按钮 |

### 8.4 不要做的

| 任务 | 原因 |
|------|------|
| 迁移所有 topic 页面到自动推荐 | RecommendedOrder 已实现，只需去除手动区 |
| 阅读量系统 | 无后端 |
| 全文重构 | 风险高，收益不确定 |
| 重写 AI 阿岩助手 | 分阶段，不在本批次 |

## 9. 实施路径示意

```
当前状态 (Phase 0):
  文章 frontmatter 无 articleType / seriesOrder
  → 新增文章需手工改 4-6 处

Phase 1 (P0-1 ~ P0-3):
  增加 frontmatter 字段 + 补齐现有文章
  制作 LearningPathArticles 组件
  → 学习路径自动化，新增文章只改 2-3 处

Phase 2 (P1-1):
  index.astro 改为自动化聚合
  → 新增文章只改 1 处（frontmatter）

Phase 3 (P2-1 ~ P2-4):
  增加首页推荐区域 + 资源关联按钮
  → 新增文章只改 1 处（frontmatter），其余自动同步
```

## 10. 给 GPT 的回填摘要

```
270 内容编排系统只读审计完成。

核心发现：
1. 当前新增一文需手工改 4-6 处（首页 index.astro、学习路径文章、topic 页面、资源映射等），在 60 篇规划下不可持续。
2. 系统已有部分自动化能力（RecommendedOrder 按 topic 聚合、getCollection 过滤），但首页和学习路径仍是纯手工维护。
3. 缺少 articleType(文章类型) 分类是最大 gap——无法通过类型做区域推荐。
4. topic 页面存在双轨（自动组件 + 手动卡片），需要统一。

推荐方案：
1. 新增 frontmatter 字段：articleType / seriesOrder / resourceSlug / openClassSlug / homepageSlot
2. 制作 LearningPathArticles 组件替代学习路径文章卡片的手工维护
3. index.astro 改为按 homepageSlot 自动聚合，取消 topicPaths.articles 硬编码
4. 阅读量/点赞量现在不做，改用 Cloudflare Web Analytics 轻量采集

三阶段实施：
Phase 1: frontmatter 补齐 + 学习路径组件化（解决核心痛点）
Phase 2: 首页自动化（大幅降低新增成本）
Phase 3: 首页推荐区域 + 资源关联按钮（锦上添花）

不要做的：评论系统、登录系统、阅读量 UI、全文重构、接入 LLM API、多语言。
```
