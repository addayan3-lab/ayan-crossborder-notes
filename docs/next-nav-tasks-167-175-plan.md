# 下一批导航任务规划（167-175）

## 任务 167-169：AI 搜索链路接入

### 目标
将 3 篇 AI 搜索主题文章接入 ArticleNavHints 系列导航。

### 文章链路
| 顺序 | slug | title |
|------|------|-------|
| 第 1 篇 | consumer-ai-search-amazon | 消费者如何用 Amazon AI 搜索产品 |
| 第 2 篇 | amazon-rufus-alexa-shopping | Amazon Rufus / Alexa for Shopping 对卖家意味着什么 |
| 第 3 篇 | 2026-amazon-ai-operations | 2026 年亚马逊卖家如何利用 AI 提升运营效率 |

### context 命名
- AI 搜索第 1 篇
- AI 搜索第 2 篇
- AI 搜索第 3 篇

### 修改范围
- 仅修改 3 篇文章 frontmatter

### 不纳入链路的文章
- `ai-search-learning-path` — 学习路径入口页，不是系列文章
- `amazon-ai-tools-review` — 工具评测单篇，不属于系列

### 风险
- 低。只改 frontmatter，不改正文

### 验收标准
- build 通过
- SEQ 440/0
- images 49/0/0/0
- 3 篇文章正确显示 AI 搜索第 1/2/3 篇

### 是否建议交给 OpenCode：是

---

## 任务 170-172：关键词扩展与工具资料链路评估

### 170：ai-keyword-table 接入关键词链路

`ai-keyword-table`（如何用 AI 做亚马逊关键词表）是一篇关键词工具类文章，可作为关键词链路的补充，但不属于 3 篇主链。

建议方案：
- 在 `keyword-source-4-types`、`keyword-cleaning-method`、`keyword-search-volume-trap` 的 `relatedArticleLinks` 中增加 `ai-keyword-table` 条目
- 在 `ai-keyword-table` 的 `relatedArticleLinks` 中指向 3 篇主链文章

修改范围：4 篇文章 frontmatter
风险：低
建议交给 OpenCode：是

### 171：工具资料链路评估

候选文章：
- `ai-operations-resource-pack` — 资料包说明页
- `amazon-platform-rules-beginner` — 平台规则入门
- `tools-learning-path` — 工具学习路径入口

结论：**不建议形成线性链路**。这三篇文章主题差异大，强行连线对读者无帮助。
建议：保持现状，不做修改。

### 172：学习路径页是否接入导航

| slug | 建议 |
|------|------|
| `keyword-learning-path` | 不接入 — 学习路径入口页，不是系列文章 |
| `listing-learning-path` | 不接入 |
| `ppc-learning-path` | 不接入 |
| `review-learning-path` | 不接入 |
| `tools-learning-path` | 不接入 |
| `ai-search-learning-path` | 不接入 |

风险：无
建议交给 OpenCode：否（无需执行）

---

## 任务 173-175：公开课详情页导航组件

### 目标
为 8 个公开课详情页添加"上一节 / 下一节"导航。

### 方案
- 公开课详情页是 Astro 页面（非 content collection），不能复用 ArticleNavHints
- 需要新建组件（如 `LessonNav.astro`），放在 `src/components/` 下
- 在 8 个详情页中分别引入，传递 prevLesson / nextLesson 参数

### 课程顺序
| 序号 | slug | title |
|------|------|-------|
| 1 | keyword-to-listing | 从关键词到 Listing 的快速上手课 |
| 2 | ai-tools-for-amazon | AI 工具在亚马逊运营中的实战课 |
| 3 | review-to-selection | Review 反推选品逻辑课 |
| 4 | ppc-week-one | 新品 PPC 第一周实战课 |
| 5 | competitor-selection-matrix | 竞品选品矩阵搭建课 |
| 6 | listing-conversion-check | Listing 转化检查课 |
| 7 | platform-rules-beginner | 新手平台规则避坑课 |
| 8 | operation-review-system | 运营复盘体系课 |

### 修改范围
- 新文件：`src/components/LessonNav.astro`
- 修改：8 个公开课详情页（在 hero 下方或底部加入 <LessonNav />）

### 风险
- 中。需要新组件、8 个页面逐一修改
- 公开课页面不是 content collection，需要手动传递 prev/next slug

### 验收标准
- build 通过
- SEQ 440/0
- 所有 8 个详情页正确显示上一节/下一节链接
- 第 1 节无"上一节"，第 8 节无"下一节"
- 链接 target="_blank"

### 是否建议交给 OpenCode：是
