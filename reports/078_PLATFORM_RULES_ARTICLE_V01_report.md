# 078 — 亚马逊平台规则入门文章

> 状态: ✅ **成功**。1 篇新手规则避坑长文已写入,build / SEO / images 全部通过。

## 1. 执行结论

**成功**。新增 `src/content/posts/amazon-platform-rules-beginner.md`,14 节结构完整,frontmatter 合规,tools 专题页已更新入口卡片。

## 2. 新增文章路径

`src/content/posts/amazon-platform-rules-beginner.md`

## 3. frontmatter

```yaml
title: "亚马逊平台规则入门:新手最容易踩的 10 个坑"
description: "新手卖家最容易因为不懂平台规则而被警告、限流甚至封店。这篇不讲具体条款编号,只讲运营中 10 个最容易出问题的高频场景,以及怎么提前避免。"
pubDate: 2026-06-02
category: "工具模板"
tags: ["平台规则", "新手避坑", "合规"]
topic: tools
stage: 新手
intent: 避坑
relatedTopics:
  - listing
  - review
  - selection
publicLessonUse: 适合作为公开课的风险提醒模块,帮助新手先建立规则边界,再进入选品、Listing 和广告实操。
leadMagnet: 亚马逊新手规则避坑清单
wechatHook: 回复关键词"规则",领取亚马逊新手规则避坑清单。
draft: false
```

✅ topic / stage / intent 全部命中 `content.config.ts` 合法值。
✅ relatedTopics 全部为 topic slug(`listing` / `review` / `selection`),无文章 slug。
✅ description 无未转义双引号。
✅ 三个转化字段符合 080 风格标准(具体、克制、可执行)。

## 4. 文章结构(14 节,1 列表格 = 7 项发版前 checklist)

1. 为什么新手不能只学运营技巧,还要懂平台规则
2. 坑 1:Listing 夸大宣传
3. 坑 2:变体滥用
4. 坑 3:索评和操纵 Review
5. 坑 4:侵权和图片素材来源不清
6. 坑 5:类目和认证要求没查清
7. 坑 6:价格、库存和发货承诺不匹配
8. 坑 7:广告词和页面词不一致
9. 坑 8:售后回复用语不当
10. 坑 9:多账号和关联风险
11. 坑 10:用 AI 生成内容但不做人工审核
12. 新手安全检查清单(7 项发版前 checklist)
13. 公开课怎么延伸
14. 资料包和微信引导

**边界自查:**
- ✅ 不写具体条款编号(只讲"绝对化表达""刷评"等行为类型)
- ✅ 不写"保证安全""一定不会违规"等绝对化表述(全文用"会降低概率""可能"等措辞)

## 5. 是否更新专题入口

✅ 已更新 `src/pages/tools/index.astro`:

- 在 `guide-card` 与 `RecommendedOrder` 之间新增 `.topic-articles` 区块
- 新增 1 张文章卡:`/articles/amazon-platform-rules-beginner/`
- 配套新增 3 段 CSS(`.topic-articles` / `.topic-articles-title` / 蓝色竖条指示器)

> 首页 / 列表页 / RSS / sitemap 全部由 build 自动生成,无需手动改数量或写 dist。

## 6. 验证结果

### 6.1 `npm run build`

```
[build] 37 page(s) built in 1.70s
[build] Complete!
Pagefind v1.5.2 (Extended)
  Indexed 1 language
  Indexed 39 pages      ← 077A 后 37,+2 = 078/079 各 1 页
  Indexed 2742 words    ← 077A 后 2404,+338(2 篇新长文)
  Indexed 3 filters     ← topic / stage / intent 仍在
  Indexed 0 sorts
```

✅ 39 页(从 37 → 39,+2)。
✅ Pagefind 仍识别 3 filters。

### 6.2 `npm run seo:audit`

```
Pages checked: 39
Pass: 312           ← 077A 后 296,+16(每篇新增约 8 个 SEO 检查项)
Fail: 0
robots.txt: PASS
sitemap-index.xml: PASS
```

✅ 312 pass / **0 fail**。

### 6.3 `npm run images:check`

```
manifest items: 7
missing files: 0
duplicate ids: 0
orphan assets: 0
```

✅ 7/0/0/0(078 无新图片,沿用 OG 默认)。

## 7. 严格边界自查

| 边界 | 状态 |
|---|---|
| 是否改旧文章正文 | ❌ 否(仅新增 1 篇) |
| 是否改部署配置 | ❌ 否 |
| 是否新增复杂功能 | ❌ 否(仅 1 个 section + 3 段 CSS) |
| 是否调用外部 API | ❌ 否 |
| 是否写具体条款编号 | ❌ 否(全文只描述行为类型) |
| 是否写绝对化表述 | ❌ 否(全文用"可能""通常""一般"等措辞) |
| 是否改 `package.json` | ❌ 否 |
| 是否读取 `auth.json` | ❌ 否 |

## 8. 下一步建议

1. **080 复用本篇模板**:078 的 3 个转化字段已符合 080 标准(具体资料包名 / 公开课具体用法 / 标准微信承接句式),080 可重点检查其他 25 篇,无需回头改 078。
2. **079 紧接**:下一篇 047 替代稿 `amazon-ai-tools-review.md`,同样落在 topic=ai-search 专题。
3. **公开课排期**:这篇适合放在"零基础新手班"开班第一节,作为"风险边界"模块,后续接选品 / Listing / 广告实操。
4. **资料包实物化**:目前 `leadMagnet: 亚马逊新手规则避坑清单` 是文本钩子,可与 081 资料包中心规划对接,准备 PDF 实物。
5. **快照**:执行 `npm run oc:snap` 记录 078 期间 OpenCode 使用数据。
