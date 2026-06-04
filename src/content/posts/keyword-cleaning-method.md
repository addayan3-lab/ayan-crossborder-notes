---
title: "关键词第 2 篇：关键词清洗方法"
description: "把收了一堆词变成能写进 Listing 和广告的可用词表。讲清去重、归一、聚类与优先级排序四步，以及 AI 在清洗里的边界。"
pubDate: "2026-06-02"
category: "关键词"
tags: ["关键词", "AI 提效", "工具"]
image: "/images/articles/keyword-cleaning-method/cover.svg"
draft: false
topic: keyword
stage: 实操
intent: 工具
relatedTopics:
  - ai-keyword-table
  - keyword-source-4-types
  - keyword-search-volume-trap
publicLessonUse: 适合作为关键词公开课的清洗演示,带学员把 200 个散乱词清洗到 50 个可用的核心词。
leadMagnet: 关键词清洗 SOP 模板
wechatHook: 回复关键词"清洗",领取关键词清洗 SOP 模板。
prevArticle: keyword-source-4-types
nextArticle: keyword-search-volume-trap
relatedArticleLinks:
  - slug: keyword-source-4-types
    label: 关键词 4 类来源
    context: 关键词第 1 篇
  - slug: keyword-search-volume-trap
    label: 搜索量陷阱
    context: 关键词第 3 篇
---

<div class="article-callout article-callout-blue">
  <strong>💡 这篇想解决：</strong>
  你从 4 类来源（搜索下拉、工具、Review、平台外）收了一堆词，但词表里拼写变体、复数、同义词混在一起，没法直接用。这篇把"清洗"拆成 4 步，每步都有可执行动作。
</div>

上一篇讲了关键词从哪来。这篇接上：词到了手里，怎么把它变成一张能写进 Listing、能投进广告的"可用词表"。

不做清洗的词表，等于给自己挖坑。词表里重复词越多，后面的判断就越乱。

## 一、清洗的 4 步

把清洗拆成 4 步，每步的输入和输出都明确。

第一步：去重。

把"under sink organizer"、"under-sink organizer"、"under-sink-organizer"统一为一种。复数变体（organizer / organizers）、大小写、连字符、空格这些都属于去重范围。

第二步：归一。

把同义词合并。"storage box"、"storage bin"、"storage container"如果在你的产品语境里指向同一类东西，归成"storage box"作为标准词，其他作为变体保留。

第三步：聚类。

把同主题的词分到一组。例如"kitchen storage / cabinet organizer / pantry organizer"归到"厨房收纳"组，"under sink / cabinet shelf / counter shelf"归到"柜下收纳"组。聚类的作用是后面写 Listing 和建广告组时按组使用。

第四步：排序。

按优先级排序。优先级 = 相关性 × 意图深度 ÷ 竞争度（上一篇讲过）。这步不靠 AI，靠你自己打分。

## 二、每一步怎么做

第一步去重，最便宜的方法是用 Excel 或 Google Sheets 的 UNIQUE 函数。把原始词列粘进去，去重后看剩多少。如果有 1000 个词去重后剩 600 个，说明你的原始来源重复率 40%。

不要人工去重。1000 个词你人工看 100 个就开始烦躁，AI 看 10000 个还是同样的注意力。

第二步归一，AI 最擅长。让 AI 做两件事：

- 列出同义词组（例如"storage container / storage bin / storage tote"）
- 推荐每组的标准词

推荐的标准词要从买家视角选：哪个词在 Amazon 搜索框下拉建议里出现次数最多，哪个就是标准词。

第三步聚类，靠主题词 + 工具组合。先列主题词（kitchen、bathroom、outdoor、kids），再用工具里的"相关词"功能扩展每个主题。最后让 AI 把词归到对应主题下。

聚类的输出是"主题 → 词列表"，不是"主题 → 词数量"。词数量是结果，不是目的。

第四步排序，靠三列人工打分：

- 相关性（1-5）：这个词和你的产品有多相关
- 意图深度（1-5）：搜这个词的人购买意图有多明确
- 竞争度（1-5）：首页是大卖还是普通卖家

总分 = 相关性 × 意图深度 ÷ 竞争度。这是粗略公式，作用是排序，不是精确计算。

## 三、AI 在清洗里的边界

AI 适合做：

- 去重（完全交给 AI）
- 归一（同义词组 + 标准词推荐）
- 聚类（按主题词分组）
- 输出"主题 → 词列表 → 用途建议"的结构化表

AI 不适合做：

- 判断相关性（这是你对自己产品的理解）
- 判断意图深度（这是你作为运营的判断）
- 判断竞争度（这是数据 + 经验的组合）

把 AI 当"数据搬运工"用，把判断留给自己。

## 四、清洗后词表的最低字段

不管你用哪类工具，清洗后的词表应该至少包含这 8 个字段：

- 关键词（标准形式）
- 主题组（聚类结果）
- 来源（4 类来源里哪一类）
- 月搜索量（参考，不做主排序）
- 相关性评分（1-5）
- 意图深度评分（1-5）
- 竞争度评分（1-5）
- 用途（标题 / 五点 / Search Terms / 精准广告 / 词组广告 / 广泛广告）

字段越多越好判断，字段越少后面越被动。

## 五、清洗的节奏

不要一次性清洗完。建议的节奏：

- 收词阶段：4 类来源同时收，原始表只标"来源"和"原文"
- 清洗阶段：每周一次批量去重 + 归一 + 聚类
- 排序阶段：新词进来随时打 3 个评分，不积压
- 应用阶段：按主题组写 Listing 段落、建广告组

每两周做一次"未使用词"复盘：词表里有没有始终没被用上的词？为什么？是不是判断错了？

## 六、避坑

- 不要把"AI 推荐的归一"直接当标准词。AI 推荐的标准词是统计意义上的"最常见"，不一定是"最合适你"。
- 不要聚类太细。10 个主题比 30 个主题好用。
- 不要评分太频繁。新词进来打 3 个分，3 周后回看，不变就不动。
- 不要用搜索量做主排序。上一篇已经讲过：搜索量是参考，不是价值。
- 不要省略"用途"字段。没有"用途"字段的词表，最后会变成一个庞大的"待办词"列表。

下一篇会写：清洗后的词怎么写进 Listing 的标题、五点、Search Terms，以及怎么建第一套广告组结构。关键词体系就完整了。
