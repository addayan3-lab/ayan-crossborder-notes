# 273 学习路径自动化只读审计报告

## 1. 执行结论

学习路径 §4（对应已有文章卡片）可以组件化自动化，但需分阶段实施：

- **§4 可以自动化** — 文章中纯粹的文章列表区域，用 `topic` + `seriesOrder` + 两个新字段即可自动渲染
- **§3 等叙事区域不能自动化** — 保留了"老师讲课感"，自动化反而伤害可读性
- **当前不具备直接自动化条件** — 4/7 篇 learning-path 无编排字段，且 `seriesOrder` 在全部文章中均未设置
- **推荐先做 ai-search 专题试点**（已有 3 篇带编排字段的文章），再逐步推广到 keyword/listing/ppc/review

## 2. 当前 learning-path 文件清单

共 7 篇，全部在 `src/content/posts/`：

| 文件 | topic | 有编排字段？ | 主读篇数 | 辅助篇数 | 总引用数 |
|------|-------|-------------|---------|---------|---------|
| keyword-learning-path.md | keyword | ❌ | 4 | 2 | 6 |
| listing-learning-path.md | listing | ❌ | 4 | 2 | 6 |
| ppc-learning-path.md | ppc | ❌ | 3 | 2 | 5 |
| review-learning-path.md | review | ❌ | 3 | 2 | 5 |
| selection-learning-path.md | selection | ✅ (articleType/homepageSlot/featured/priority) | 3 | 3 | 6 |
| ai-search-learning-path.md | ai-search | ✅ | 4 | 6 | 10 |
| tools-learning-path.md | tools | ✅ | 1 | 5 | 6 |

**关键发现**：全部 7 篇的结构完全一致（9 个章节），说明可以统一处理。

## 3. 手写维护痛点

### 3.1 每一篇 learning-path 的结构

全部 7 篇 learning-path 都包含以下 9 个章节：

```
§1 本专题解决什么问题  — 纯叙述
§2 新手先学什么       — 纯叙述（含文章推荐）
§3 推荐阅读顺序       — 纯叙述（5-6 步，每步含"为什么读"）
§4 对应已有文章卡片   — 文章列表（手写 title + href + label）
§5 本周实操任务       — 手写任务清单
§6 常见误区           — 手写误区清单
§7 公开课延伸         — 手写（但结构高度模板化）
§8 资料包领取         — 高度模板化（topic-specific PDF 名称不同）
§9 下一步学习建议     — 纯叙述
```

### 3.2 当前手动维护的 4 个痛点

**痛点 1：新增文章必须同步更新 1-3 篇 learning-path 的 §4**

例：新增一篇 keyword 文章 → 必须手动更新 `keyword-learning-path.md` §4 加入链接。如果这篇文章同时关联 review 或 listing 专题，还要同步更新对应 learning-path 的辅助阅读区。

**痛点 2：§4 的 title + href + label 与文章 frontmatter 重复维护**

```markdown
- 《如何用 AI 做亚马逊关键词表》— 工具视角入口
```
这个信息在 frontmatter `title` 中已存在，但改文章标题不会自动同步到 learning-path。

**痛点 3：`seriesOrder` 字段已存在但从未使用**

在 `docs/content-orchestration-fields.md` 中已定义 `seriesOrder`，但 grep 确认 **没有任何一篇文章设置了该字段**。理论上它可以驱动排序，但从未实际落地。

**痛点 4：不同 learning-path 间的交叉引用无校验**

比如 `keyword-learning-path.md` §4 辅助阅读引用了 `ai-competitor-matrix` 和 `new-product-ppc-week-one`。如果这些文章改名或删除，learning-path 中的引用会变成死链——没有任何脚本校验。

## 4. 可自动化区域

### 4.1 §4（对应已有文章卡片）—— 推荐自动化

**Why**：纯文章列表，格式统一（title + href + label），与 frontmatter 信息重复，无叙述内容。

**当前手写示例**（keyword-learning-path.md §4）：
```markdown
按阅读顺序：
- 《如何用 AI 做亚马逊关键词表》— 工具视角入口
- 《关键词从哪里来：把来源分成 4 类》— 来源扩展
- 《关键词清洗方法：从关键词池到可用词表》— 清洗 SOP
- 《为什么关键词表不能只看搜索量》— 判定维度

辅助阅读：
- 《AI 竞品矩阵》— 关键词在竞品侧的应用
- 《新品广告第一周怎么开》— 关键词进广告的实战
```

**自动化方案**：
```astro
<LearningPathArticles topic="keyword" />
```
组件读取当前 topic 下所有非 learning-path 文章，按 `seriesOrder` 排序，`pathRole="primary"` 的在"按阅读顺序"区，`pathRole="secondary"` 的在"辅助阅读"区，每篇显示 `pathLabel` 作为描述。

**依赖条件**：
- 该 topic 下的文章必须设置了 `seriesOrder`、`pathRole`、`pathLabel`
- 组件需要排除 learning-path 本身

### 4.2 §8（资料包领取）—— 可选模板化

**Why**：结构高度相似，但每篇的 PDF 名称不同。如果改成从 frontmatter 读取，可以减少重复。

**不建议现在做**——收益低（每篇只省 5-8 行），但可以在以后统一改模板时一并处理。

### 4.3 §7（公开课延伸）—— 可半自动化

**Why**：`openClassSlug` 字段已存在，如果设置，可以自动生成"公开课模块"卡片。

**不建议现在做**——当前 learning-path 中的公开课描述比单纯列 slug 更丰富（包含每节课名称），自动化会丢失细节。

## 5. 不应自动化区域

### 5.1 §3（推荐阅读顺序）—— 绝对不自动

**原因**：这是 learning-path 的核心价值。每步包含"为什么读这篇"的叙述，这是"老师讲课感"的来源。

**示例对比**（keyword-learning-path §3）：
```markdown
第一步，建立工具视角。读《AI 关键词表》，知道字段结构。
第二步，扩展来源。读《关键词来源 4 类》，把搜索下拉和 Review 作为收词渠道补上。
```

如果这部分自动化，会退化成"第 1 步：读《xxx》"，失去教学价值。

### 5.2 §1（本专题解决什么问题）+ §2（新手先学什么）

**原因**：纯叙述 + 上下文建立，自动化会丢失针对性。

### 5.3 §5（本周实操任务）

**原因**：每个 topic 的实操任务完全不同（keyword 是收词洗词，listing 是卖点提炼），无法抽象成通用模板。

### 5.4 §6（常见误区）

**原因**：Domain expertise 的结晶，每篇 5 条误区都是针对 topic 的运营经验。

### 5.5 §9（下一步学习建议）

**原因**：跨路径的引导，需要理解整个内容体系的知识图谱才能写好，自动化会生硬。

## 6. 推荐字段设计

### 6.1 新增字段

| 字段 | 类型 | 必填 | 用途 | 可选值 |
|------|------|------|------|--------|
| `pathRole` | string | 否 | 在学习路径中的角色 | `"primary"`（主读）, `"secondary"`（辅助阅读） |
| `pathLabel` | string | 否 | 学习路径卡片中显示的短标签（2-6 字） | 如 `"工具视角入口"`, `"来源扩展"` |

### 6.2 复用已有字段

| 字段 | 用途 |
|------|------|
| `topic` | 过滤同一专题的文章 |
| `seriesOrder`（已有但未用） | 学习路径内的阅读顺序 |
| `title` | 文章标题 |
| `href`（由组件自动生成） | 文章链接 |

### 6.3 完整字段示例

```yaml
# keyword-topic article frontmatter
---
title: "如何用 AI 做亚马逊关键词表"
topic: keyword
seriesOrder: 1
pathRole: primary
pathLabel: "工具视角入口"
---
```

### 6.4 组件输出示意

```astro
---
// LearningPathArticles.astro
// Props: topic (string)
// 自动读取所有 topic 匹配的文章，按 seriesOrder 排序
// pathRole="primary" → "按阅读顺序"区域
// pathRole="secondary" → "辅助阅读"区域
// 每篇显示: title + pathLabel
---
```

### 6.5 与现有 RecommendedOrder.astro 的关系

**区别**：
| 维度 | RecommendedOrder.astro | LearningPathArticles.astro（新） |
|------|----------------------|-------------------------------|
| 位置 | topic 页面（/selection/） | learning-path 文章 §4 |
| 排序 | pubDate | seriesOrder |
| 显示内容 | 标题 + description（长） | 标题 + pathLabel（短标签） |
| 角色区分 | 无（一个列表） | primary / secondary 两个区 |
| 是否含 learning-path | 含（排在首位） | 不含 |
| 备选逻辑 | 有（categoryFallbackMap） | 无（给空就不渲染） |

**互不冲突**，两个组件服务于不同场景。

## 7. 推荐试点专题

### 7.1 首选：ai-search

**核心理由**：已有 3 篇带编排字段的文章（prompt-structure、ai-listing-prompt、ai-keyword-cleaning），试点时需要补齐的字段最少。

**需要补齐的字段**：

| 文章 | 已有字段 | 需补齐 |
|------|---------|--------|
| prompt-structure-for-amazon-sellers | articleType, homepageSlot, featured, priority | seriesOrder, pathRole, pathLabel |
| ai-listing-prompt-template | articleType, homepageSlot, featured, priority | seriesOrder, pathRole, pathLabel |
| ai-keyword-cleaning-prompts | articleType, homepageSlot, featured, priority | seriesOrder, pathRole, pathLabel |
| amazon-rufus-alexa-shopping | 无编排字段 | topic, articleType, seriesOrder, pathRole, pathLabel |
| consumer-ai-search-amazon | 无编排字段 | topic, articleType, seriesOrder, pathRole, pathLabel |
| 2026-amazon-ai-operations | 无编排字段 | topic, articleType, seriesOrder, pathRole, pathLabel |
| ai-competitor-matrix | 无编排字段 | topic, articleType, seriesOrder, pathRole, pathLabel |

**工作量**：① 补齐 4 篇文章字段 ② 新增 3 个非 learning-path 文章字段 ③ 创建 LearningPathArticles 组件 ④ 替换 ai-search-learning-path.md §4

**复杂度**：中等（10 篇文章中 4 篇已有字段，6 篇需补）

### 7.2 备选：selection

**核心理由**：结构最简单（3 主读 + 3 辅助），learning-path 本身已带编排字段。

**需要补齐的字段**：6 篇引用文章全部从零开始。工作量更大。

**不推荐 ppc 和 review**：引用文章最少（各 5 篇），但有交叉引用（跨 topic），试点价值低于 ai-search。

### 7.3 不推荐试点：tools

**原因**：tools 的 §4 结构不同——它不是按阅读顺序排列，而是按"用途分类"排列的。且只有 1 篇主读文章。自动化成本高、收益低。

## 8. 第一阶段 Build 任务建议

### Step 1：补齐字段

| # | 任务 | 说明 |
|---|------|------|
| 1 | 新增 `pathRole`, `pathLabel` 字段定义到 docs/content-orchestration-fields.md | 更新字段规范文档 |
| 2 | 选择试点 topic（推荐 ai-search），补齐所有引用文章的 seriesOrder / pathRole / pathLabel | 6 篇文章需补字段 |

### Step 2：创建组件

| # | 任务 | 说明 |
|---|------|------|
| 3 | 创建 `src/components/LearningPathArticles.astro` | 新组件，按 seriesOrder 排序，分 primary/secondary 两区 |
| 4 | 扩展 `src/lib/content-orchestration.ts` 添加 `getLearningPathArticles(topic)` 函数 | 复用现有过滤逻辑，增加 pathRole/pathLabel 输出 |
| 5 | 在 ai-search-learning-path.md §4 替换为 `<LearningPathArticles topic="ai-search" />` | 移除手写列表 |

### Step 3：验证

| # | 任务 | 说明 |
|---|------|------|
| 6 | build + seo:audit + images:check | 确保无报错 |
| 7 | 对照原手写内容检查渲染结果 | 文章条目、顺序、标签一致 |

### Step 4：推广

| # | 任务 | 说明 |
|---|------|------|
| 8 | 补齐 keyword 所有引用文章的字段 | 4 篇主读 + 2 篇辅助 |
| 9 | 替换 keyword-learning-path.md §4 | 试点成功后快速复制 |
| 10 | 补齐 listing/ppc/review/selection/tools 引用文章字段 + 替换 | 完成全部 7 篇 |

### 不做

| 任务 | 原因 |
|------|------|
| 改造 §7 公开课延伸 | 依赖 openClassSlug，但描述文本需要人工写 |
| 改造 §8 资料包领取 | 收益低，模板化反而损失灵活性 |
| 自动生成 §3 推荐阅读顺序 | 会破坏"老师讲课感" |
| 迁移 RecommendedOrder.astro | 它服务于 topic 页面，与 LearningPathArticles 用途不同 |
| 合并两个组件 | 职责不同，强行合并增加复杂度 |

## 9. 风险

### 9.1 自动化后与原先渲染差异

**风险等级：低**。组件输出与手写 markdown 的最终渲染结果都是 HTML 文章列表，视觉上完全一致。组件可以精确复用 `.topic-articles` 或 `.learning-order` 样式。

### 9.2 组件空数据时的 fallback

**风险等级：低**。如果某 topic 下文章缺少 seriesOrder，组件应该静默不渲染 §4。现有的手写内容可以保留作过渡（= 先加组件，再逐步拆手写内容）。

**建议过渡策略**：
1. 先把 `<LearningPathArticles>` 组件插入 §4 位置
2. 手写内容保留在组件下方（用 `{#if !hasAutoArticles}` 控制）
3. 等该 topic 所有文章补齐字段后，删掉手写内容

### 9.3 SEO 影响

**风险等级：无**。组件渲染后输出静态 HTML，与手写 markdown 编译结果一样。URL 结构、heading 层级、文字内容不变。Google 无法区分是组件渲染还是手写。

### 9.4 Pagefind 索引影响

**风险等级：无**。Pagefind 对 HTML 中的 `<a>` 链接做全文索引，组件渲染的文章列表与手写的 `<a>` 链接结构相同。索引结果完全一致。

### 9.5 字段不全导致组件空白

**风险等级：中**。如果 `seriesOrder` 或 `pathRole` 为空，组件可能无法正确排序或分区。需要组件内置 fallback 逻辑：

- 无 `seriesOrder` → 按 `priority` 排序 → 按 `pubDate` 排序
- 无 `pathRole` → 默认视为 primary
- 无 `pathLabel` → 不显示标签（只显示标题）

### 9.6 多步骤替换时的中间状态

**风险等级：低**。如果在同一篇 learning-path 中同时保留手写内容和组件（过渡期），可能出现文章重复显示。需要在手写内容外面加条件渲染：

```astro
{#if autoArticles.length === 0}
  <!-- 手写的 §4 内容（过渡期保留） -->
{/else}
  <LearningPathArticles topic="..." />
{/if}
```

## 10. 给 GPT 的回填摘要

```
273 学习路径自动化只读审计完成。

核心发现：
- 7 篇 learning-path 共享相同 9 节结构，§4（对应已有文章卡片）是主要手动维护负担
- seriesOrder 字段已存在但从未使用（0 篇文章设置）
- 4/7 篇learning-path无编排字段，不具备直接自动化条件
- RecommendedOrder.astro 已按 topic 聚合，但排序用 pubDate、描述用 description、包含 learning-path 自身——与 learning-path §4 需求不同

可自动化：§4（文章卡片列表）——用 topic + seriesOrder + pathRole(primary/secondary) + pathLabel 驱动
不可自动化：§3 推荐阅读顺序（保留核心叙事价值）、§5 实操任务、§6 常见误区

推荐新字段：
- pathRole: "primary"（主读）/ "secondary"（辅助阅读）
- pathLabel: 短标签（2-6 字），如"工具视角入口"

推荐试点：ai-search-learning-path（已有 3 篇带编排字段的文章，工作量最小）
备选试点：selection-learning-path（结构简单但需补字段更多）

第一阶段 Build：
1. 新增 pathRole/pathLabel 字段定义
2. 补齐试点 topic 引用文章的 seriesOrder/pathRole/pathLabel
3. 创建 LearningPathArticles 组件（扩展 content-orchestration.ts）
4. 替换试点 learning-path §4
5. 推广到全部 7 篇

风险：低。SEO/Pagefind 无影响，组件 fallback 可用条件渲染控制过渡期，老师讲课感保留在 §3 等叙事章节。
```
