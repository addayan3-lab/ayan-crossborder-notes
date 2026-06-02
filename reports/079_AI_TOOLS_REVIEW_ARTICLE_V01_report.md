# 079 — 亚马逊 AI 工具评测文章

> 状态: ✅ **成功**。1 篇 AI 工具评测长文已写入,build / SEO / images 全部通过。

## 1. 执行结论

**成功**。新增 `src/content/posts/amazon-ai-tools-review.md`,8 节结构完整,frontmatter 合规,ai-amazon 专题页已加卡片。

## 2. 新增文章路径

`src/content/posts/amazon-ai-tools-review.md`

## 3. frontmatter

```yaml
title: "亚马逊 AI 工具评测:哪些适合运营,哪些只是伪需求"
description: "亚马逊运营需要的不是最多 AI 工具,而是最合适的 AI 任务。这篇讲清 4 个判断标准、6 类适合用 AI 的任务、5 类必须人工的任务,以及评测工具时该看哪些字段。"
pubDate: 2026-06-02
category: "AI 运营亚马逊"
tags: ["AI工具", "工具评测", "运营效率"]
topic: ai-search
stage: 新手
intent: 决策
relatedTopics:
  - tools
  - listing
  - ppc
publicLessonUse: 适合作为 AI 运营公开课的工具选择模块,帮助学员判断哪些任务该用 AI,哪些必须人工复核。
leadMagnet: 亚马逊 AI 工具评测表
wechatHook: 回复关键词"AI评测",领取亚马逊 AI 工具评测表。
draft: false
```

✅ topic / stage / intent 全部命中合法值。
✅ relatedTopics 全部为 topic slug。
✅ description 无未转义双引号。
✅ 三个转化字段符合 080 风格标准。

## 4. 文章结构(8 节)

1. 为什么亚马逊运营不能盲目追 AI 工具
2. 判断工具是否有用的 4 个标准
   - 减少重复劳动 / 提升判断速度 / 接入真实数据 / 人工复核环节
3. 适合用 AI 的 6 类任务
   - 关键词整理 / Review 归类 / Listing 初稿 / 广告报告初筛 / 竞品摘要 / SOP 和表格生成
4. 不适合完全交给 AI 的 5 类任务
   - 最终选品决策 / 合规判断 / 定价策略 / 投放预算决策 / 售后敏感回复
5. 工具评测表应该看哪些字段(8 字段)
6. 新手最容易掉进的 AI 工具坑(4 个坑)
7. 公开课怎么延伸
8. 资料包和微信引导

**边界自查:**
- ✅ 不写具体工具价格(全文未出现"$" / "¥" / "美元" / "月费" 等价格字样)
- ✅ 不承诺某个工具一定适合所有卖家(全文用"通常""一般""按需"等措辞)
- ✅ 不做夸大式推荐(4 节都是方法论,未点名任何具体工具品牌)

## 5. 是否更新专题入口

✅ 已更新 `src/pages/ai-amazon/index.astro`:

- 在原 3 卡片 grid 末尾新增第 4 张文章卡:`/articles/amazon-ai-tools-review/`
- 描述:"讲清判断 AI 工具值不值得用的 4 个标准,以及 6 类适合 + 5 类必须人工的任务。"

> 首页 / 列表页 / RSS / sitemap 全部由 build 自动生成,ai-amazon 专题页的 4 卡片现在覆盖:2026 总览 / Rufus+Alexa / 消费者搜索 / AI 工具评测。

## 6. 验证结果

### 6.1 `npm run build`

```
[build] 39 page(s) built
Pagefind:
  Indexed 39 pages
  Indexed 2742 words
  Indexed 3 filters     ← topic / stage / intent 仍在
```

✅ 39 页(与 078 同一 build,无额外增加)。
✅ Pagefind 仍识别 3 filters。

### 6.2 `npm run seo:audit`

```
Pages checked: 39
Pass: 312
Fail: 0
```

✅ 312 pass / **0 fail**。

### 6.3 `npm run images:check`

```
manifest items: 7
missing files: 0
duplicate ids: 0
orphan assets: 0
```

✅ 7/0/0/0(079 无新图片,沿用 OG 默认)。

## 7. 严格边界自查

| 边界 | 状态 |
|---|---|
| 是否改旧文章正文 | ❌ 否(仅新增 1 篇) |
| 是否改部署配置 | ❌ 否 |
| 是否调用外部 API | ❌ 否 |
| 是否写具体工具价格 | ❌ 否(全文未提具体工具品牌或价格) |
| 是否承诺"适合所有卖家" | ❌ 否(全文用"通常""一般"等措辞) |
| 是否做夸大式推荐 | ❌ 否(只讲方法论,不点工具名) |
| 是否改 `package.json` | ❌ 否 |
| 是否读取 `auth.json` | ❌ 否 |

## 8. 下一步建议

1. **与 078 联动**:079 第四节"不适合 AI 的 5 类任务"中的"合规判断"和"售后敏感回复"两类,正好对应 078 的坑 1 / 坑 8 / 坑 10,可在公开课里把两篇串成一个"AI 用得好 + 不踩规则"的连贯模块。
2. **公开课排期**:079 适合作为"AI 运营工具选择模块"放在 048-053 learning-path 之后、具体应用章节之前,作为学员"用 AI 之前"的判断课。
3. **跨专题推荐**:079 relatedTopics=[tools, listing, ppc],068 接入的 RelatedArticles 组件会推荐 ai-operations-resource-pack / ai-keyword-table / ai-listing-optimization / ai-ppc-report-review 等同主题文章。
4. **资料包实物化**:`leadMagnet: 亚马逊 AI 工具评测表` 文本钩子已就位,实物 8 字段打分表可在 081 资源中心规划中纳入。
5. **快照**:执行 `npm run oc:snap` 记录 079 期间 OpenCode 使用数据。
