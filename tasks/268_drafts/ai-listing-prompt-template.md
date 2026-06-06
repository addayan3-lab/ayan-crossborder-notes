---
title: "用 AI 写亚马逊 Listing 的通用提示词模板"
description: "给亚马逊新手卖家的 Listing 提示词模板：从产品信息、关键词、竞品卖点到标题、五点、描述，一步步让 AI 生成可检查的初稿。"
topic: ai-search
stage: 实操
intent: 工具
relatedTopics:
  - listing
  - keyword
  - tools
publicLessonUse: "Listing 优化公开课的 AI 写作示例"
leadMagnet: "Listing 自检清单"
wechatHook: "资料领取方式以资料详情页说明为准"
cover: "/images/og-default.svg"
---

用 AI 写亚马逊 Listing，最怕的不是写不出来，而是写得太像“万能广告文案”。

很多新手输入一句：

> 帮我写一个亚马逊 Listing。

AI 很快就能输出标题、五点、描述。但问题是：它可能没有关键词逻辑，没有场景顺序，也没有区分哪些卖点该放标题，哪些该放五点。

更稳的做法是：让 AI 先按你的素材写初稿，再用 Listing 自检清单逐条检查。

---

## 一、这个提示词解决什么问题

这条提示词适合你已经有以下素材时使用：

- 产品基础信息
- 3-8 个核心关键词
- 竞品页面里常见卖点
- Review 里出现过的用户痛点
- 产品真实功能和限制

它不适合在完全没有素材时直接用。没有素材时，AI 只能编，编出来的 Listing 通常不能直接上线。

---

## 二、完整提示词

复制下面这段，把方括号里的内容替换成你的产品信息。

```text
你现在是一名亚马逊美国站 Listing 优化顾问，熟悉标题、五点描述、产品描述和关键词布局。

请根据我提供的产品信息，帮我生成一版亚马逊 Listing 初稿。

产品信息：
- 产品名称：【填写产品名称】
- 使用场景：【填写使用场景】
- 目标人群：【填写目标人群】
- 核心功能：【填写真实功能】
- 材质/尺寸/规格：【填写参数】
- 价格段：【填写价格段】
- 不能夸大的点：【填写限制，例如不能说防水、不能说医疗效果】

关键词：
- 主关键词：【填写 1-3 个主关键词】
- 长尾关键词：【填写 5-10 个长尾关键词】
- 不想使用的词：【填写不适合的词】

竞品卖点参考：
【复制 3-5 条竞品常见卖点，不要复制品牌名】

Review 痛点：
【复制用户常见抱怨，例如太难清洗、安装复杂、尺寸不合适】

请遵守：
1. 不要编造产品没有的功能。
2. 不要使用绝对化表达，例如 best、perfect、guaranteed。
3. 不要写医疗、治疗、治愈等敏感表达。
4. 关键词要自然融入，不要硬塞。
5. 标题优先放主关键词和最核心卖点。
6. 五点描述按“场景痛点 → 产品特征 → 用户好处”写。
7. 如果信息不足，请先列出缺失信息。

请按以下格式输出：
1. Listing 标题：1 条
2. 五点描述：5 条
3. 产品描述：1 段
4. 关键词使用说明：说明哪些关键词放在了哪里
5. 风险提醒：哪些表达上线前需要人工确认
6. 下一步优化建议
```

---

## 三、提示词拆解

这条提示词分成 5 层。

### 1. 产品信息

产品信息越具体，AI 输出越稳定。  
新手至少要填写：

- 产品名称
- 使用场景
- 目标人群
- 核心功能
- 产品限制

“产品限制”很重要。比如你的产品只是防泼水，就不要让 AI 写 waterproof。

### 2. 关键词

关键词不要一次放太多。  
第一版 Listing 建议只给 AI：

- 1-3 个主关键词
- 5-10 个长尾关键词

如果给 100 个关键词，AI 反而会乱塞。

### 3. 竞品卖点

这里不是让 AI 抄竞品，而是让它知道这个类目的常见表达。

你可以复制类似：

```text
easy to clean
space saving design
quick installation
durable for daily use
```

不要复制品牌名，不要复制完整竞品文案。

### 4. Review 痛点

Review 痛点能让 Listing 更像真实用户语言。

例如：

```text
用户抱怨：尺寸不清楚、安装步骤复杂、清洗麻烦。
```

AI 就可以把卖点写成：

```text
Clear size details help you check fit before purchase.
```

这种表达比“high quality”更有用。

### 5. 输出格式

让 AI 同时输出“关键词使用说明”和“风险提醒”，是为了方便你检查，而不是直接复制上线。

---

## 四、输出示例

假设产品是厨房水槽沥水架，AI 可能输出：

```text
Listing 标题：
Foldable Dish Drying Rack for Kitchen Sink, Space Saving Sink Organizer for Plates, Bowls and Cups, Easy to Store Kitchen Counter Drying Rack

五点描述 1：
Space-Saving Foldable Design
Designed for small kitchens, apartments, and limited counter space, this foldable dish drying rack helps keep your sink area organized without taking up extra counter space.
```

你接下来要检查：

- 标题是否过长？
- 主关键词是否靠前？
- 五点是否都在讲不同卖点？
- 有没有产品没有的功能？
- 是否和主图、A+ 内容一致？
- 是否符合你的真实材质和尺寸？

---

## 五、常见翻车场景

### 1. AI 写得太“广告腔”

比如：

```text
Experience the ultimate kitchen revolution.
```

这种表达看起来高级，但不适合大多数亚马逊 Listing。  
你可以追加：

```text
请改成更直接、具体、偏亚马逊页面风格的表达，不要写品牌广告语。
```

### 2. AI 忽略关键词

如果关键词没有自然出现，让 AI 重新输出：

```text
请保留原本卖点结构，但自然加入以下关键词：...
```

不要要求它“每个关键词都必须出现”。这样会造成硬塞。

### 3. AI 写了没有的功能

这是最危险的。  
比如产品没有 BPA-free 认证，AI 不应该写 BPA-free。

追加：

```text
请检查上面的 Listing，标出所有可能需要证据支持的表达。
```

---

## 六、不适合用 AI 的场景

以下内容不要直接让 AI 拍板：

- 是否能使用某个类目词
- 是否能写某个功效
- 是否涉及专利或侵权
- 是否符合平台最新政策
- 是否能承诺结果
- 是否使用竞品品牌词

这些要靠人工、平台规则和合规检查确认。

---

## 七、怎么接到实际运营

建议按这个顺序用：

1. 先用关键词清洗表整理关键词
2. 再用这条提示词生成 Listing 初稿
3. 用 Listing 自检清单检查标题、五点、描述
4. 根据广告数据和转化率继续修改
5. 把 Review 反馈重新喂给 AI 做二次优化

AI 写 Listing 不是一次完成，而是帮你把“空白页面”变成“可检查初稿”。

---

## 配套资源

- Listing 自检清单：检查标题、五点、描述是否完整
- 关键词清洗表：整理主关键词和长尾词
- AI 工具评测表：判断哪个工具更适合写文案

对应公开课：Listing 转化检查课、AI 工具辅助运营课。
