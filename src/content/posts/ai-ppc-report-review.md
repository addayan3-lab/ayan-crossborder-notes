---
title: "PPC 第 3 篇：用 AI 复盘广告报表"
description: "用 AI 辅助复盘亚马逊广告报表，从 ACOS、TACOS、CTR、CVR、搜索词和订单转化判断广告问题。"
pubDate: "2026-05-31"
category: "广告 PPC"
tags: ["PPC", "广告复盘", "ACOS"]
topic: ppc
stage: 实操
intent: 工具
relatedTopics:
  - keyword
  - listing
  - tools
publicLessonUse: 适合作为 PPC 公开课的报表诊断演示，带学员从搜索词、花费和转化判断广告问题。
leadMagnet: PPC 报表诊断模板
wechatHook: 资料领取方式以资料详情页说明为准。
draft: false
image: "/images/articles/ai-ppc-report-review/cover.svg"
articleType: method
resourceSlug: ppc-weekly-review
openClassSlug: ppc-week-one
prevArticle: sp-ad-structure
nextArticle: ppc-negative-keyword-week-one
relatedArticleLinks:
  - slug: sp-ad-structure
    label: "SP 广告结构"
    context: "PPC第 2 篇"
  - slug: ppc-negative-keyword-week-one
    label: "新品第一周否词策略"
    context: "PPC第 4 篇"
---

很多新手一打开广告后台，第一眼只看 ACOS。

ACOS 高，就想降竞价；ACOS 低，就想加预算。这个判断太粗，尤其是新品第一周，很容易把还在测试的数据提前掐掉。

AI 复盘 PPC 报表的价值，不是让 AI 替你决定“加预算还是关广告”，而是帮你把搜索词、点击、花费、订单、CTR、CVR、ACOS 和 TACOS 放到同一个判断框架里。

## 先准备哪些报表

至少准备 3 类数据：

第一，广告 Campaign 和 Ad Group 维度数据。

看花费、曝光、点击、订单、销售额、ACOS、CTR、CPC。它告诉你整体结构有没有明显失衡。

第二，Search Term Report。

这是最关键的报表。你要看哪些词花钱、哪些词出单、哪些词只有点击没订单、哪些词曝光多但点击低。

第三，业务总表。

如果只看广告后台，你不知道广告有没有带动自然订单。最好同时看 Session、总订单、总销售额、TACOS、库存和价格变化。

## AI 可以帮你做什么

AI 最适合做三件事。

第一，分类。

把搜索词分成“已出单词”“高点击无订单词”“低点击高曝光词”“低相关词”“需要继续观察词”。

第二，解释。

它可以帮你把数据异常翻译成运营问题。例如 CTR 低可能是主图或标题问题，CVR 低可能是价格、Review、页面承接问题，CPC 高但转化低可能是词太宽或竞价过激。

第三，生成复盘动作。

比如哪些词可以单独拉 Exact，哪些词先降竞价，哪些词需要否掉，哪些词还不能急着处理。

AI 不适合做最终决定。因为它不知道你的毛利、库存压力、现金流、类目竞争和新品阶段目标。

## 一个可用的判断框架

先看曝光和 CTR。

曝光高但 CTR 低，说明产品被展示了，但买家不愿意点。优先检查主图、标题、价格、Coupon、评分和配送承诺，不要只调广告。

再看点击和 CVR。

点击多但不出单，说明流量进来了但页面没有承接。优先检查 Listing、Review、价格、变体、图片和 Q&A。

再看花费和订单。

花费高但没有订单，不一定立刻否词。新品第一周要看点击量是否达到判断样本。如果一个词只有 2 次点击，不要急着下结论；如果 30 次点击仍然没订单，就要重点处理。

最后看 ACOS 和 TACOS。

ACOS 是广告效率，TACOS 是整体经营效率。ACOS 上升但自然订单也起来，可能是新品冷启动阶段正常投入；ACOS 下降但 TACOS 不降，可能只是广告缩了，整体生意并没有变好。

## 给 AI 的复盘提示词

可以这样问：

```text
你是亚马逊 PPC 广告复盘助手。
我会给你一份 Search Term Report 和一份广告汇总表。
请按以下规则分析：
1. 先把搜索词分为：可加 Exact、继续观察、需要降价/降竞价、建议否词、需要检查 Listing；
2. 不要只根据 ACOS 下结论，要同时看点击数、订单数、CTR、CVR、花费和销售额；
3. 点击少于 8 次的词不要给强结论，只标记为观察；
4. 输出每个建议背后的数据理由；
5. 最后给出下一周的 5 个动作。
```

这个提示词里最重要的是第 3 点：样本太少不要强行判断。AI 如果没有这个约束，很容易把随机波动当成趋势。

## 新品第一周怎么用

新品第一周不要追求报表好看，而是要让广告帮你回答几个问题：

- 哪些词真的有人点？
- 哪些词点击后有购买可能？
- 哪些词明显跑偏？
- Listing 哪些地方影响转化？
- 预算是否集中在少数无效词上？

所以第一周复盘的重点不是“把 ACOS 压低”，而是“把搜索词分层，把下一周测试方向变清楚”。

## 最后落到 5 个动作

每次复盘结束，只输出 5 个动作就够了：

1. 新增哪些 Exact 词。
2. 哪些词降竞价。
3. 哪些词加入否词。
4. 哪些 Listing 问题需要修。
5. 下周预算怎么分配。

如果复盘结果超过 20 条建议，新手反而执行不了。AI 的任务是帮你减法，不是制造更多待办。
