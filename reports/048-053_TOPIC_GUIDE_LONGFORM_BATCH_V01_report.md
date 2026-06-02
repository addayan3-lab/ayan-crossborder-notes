# 任务 048-053 报告：6 篇专题导览长文

**完成时间：** 2026-06-02
**任务文件：** `tasks/048-053_TOPIC_GUIDE_LONGFORM_BATCH_V01.md`
**目标：** 把 6 个专题从"文章列表"升级为"学习路径"。每篇专题加一篇入口长文，明确推荐阅读顺序、实操任务和误区。

---

## 一、执行结论

**成功 ✅**

| 项 | 状态 |
|----|------|
| 新增文章 | 6/6 篇 |
| 更新专题落地页 | 6/6 个（4 个独立落地页 + 1 个首页全量更新） |
| frontmatter 校验 | 通过（schema 校验无报错） |
| build | 37 pages, 1.28s |
| seo:audit | 296 pass / 0 fail |
| images:check | 7 manifest / 0 missing / 0 orphan |
| 是否执行 046/047 | **否**（按要求跳过） |

---

## 二、新增文章清单

| # | 专题 | 文件名 | 标题 | slug |
|---|------|--------|------|------|
| 1 | 关键词 | `keyword-learning-path.md` | 亚马逊关键词学习路径：从找词、清洗到布局 | `keyword-learning-path` |
| 2 | Listing | `listing-learning-path.md` | 亚马逊 Listing 优化学习路径：从卖点提炼到转化表达 | `listing-learning-path` |
| 3 | PPC | `ppc-learning-path.md` | 亚马逊 PPC 广告学习路径：从结构搭建到数据判断 | `ppc-learning-path` |
| 4 | Review | `review-learning-path.md` | 亚马逊 Review 分析学习路径：从评价挖掘到产品优化 | `review-learning-path` |
| 5 | AI 搜索 | `ai-search-learning-path.md` | 亚马逊 AI 搜索学习路径：从工具理解到运营应用 | `ai-search-learning-path` |
| 6 | 工具资料 | `tools-learning-path.md` | 亚马逊工具资料学习路径：从表格、清单到实操 SOP | `tools-learning-path` |

每篇文章统一 9 个标准段落：

1. 本专题解决什么问题
2. 新手先学什么
3. 推荐阅读顺序（5 步走）
4. 对应已有文章卡片
5. 本周实操任务（6-7 个最小动作）
6. 常见误区（5 个）
7. 公开课延伸（4 节课拆解）
8. 资料包领取
9. 下一步学习建议

---

## 三、修改页面清单

| 页面 | 改动 |
|------|------|
| `src/pages/index.astro` | 在 6 个 topicPaths 上加 `guide` 字段；在专题卡渲染处新增"学习路径"蓝渐变推荐入口；CTA 改指向新的学习路径文章 |
| `src/pages/listing/index.astro` | 新增"学习路径"卡片（指向 `listing-learning-path`），放在 `topic-intro` 与原 `grid grid-3` 之间 |
| `src/pages/ppc/index.astro` | 新增"学习路径"卡片（指向 `ppc-learning-path`），新增 `sp-ad-structure` 卡片补足第三张 |
| `src/pages/ai-amazon/index.astro` | 新增"学习路径"卡片（指向 `ai-search-learning-path`） |
| `src/pages/tools/index.astro` | 新增"学习路径"卡片（指向 `tools-learning-path`），保留原有 3 张资料卡 |

注：keyword 与 review 没有独立落地页，由首页专题卡直接承担"落地"角色；首页 topicPaths 同步覆盖这 2 个专题。`/selection/` 是选品专题（不在 6 专题范围），未改动。

---

## 四、frontmatter 校验结果

每篇必填字段全部填齐，无 `intent: 实操`（已用合法值 `学习` / `工具`），无内嵌双引号。

校验脚本：`npm run build:astro`（Zod schema 强校验）。

示例（`keyword-learning-path.md`）：

```yaml
---
title: "亚马逊关键词学习路径：从找词、清洗到布局"
description: "把关键词这件事拆成 4 步：找来源、洗词表、判定价值、布局到 Listing 和广告。一条适合新手跟读的学习路径，按顺序读完能跑通完整闭环。"
pubDate: "2026-06-02"
category: "关键词"
tags: ["关键词", "学习路径", "AI 提效"]
image: "/images/og-default.svg"
draft: false
topic: keyword
stage: 新手
intent: 学习
relatedTopics:
  - listing
  - ppc
publicLessonUse: 本篇可作为公开课关键词模块的导览讲稿，按模块分讲
leadMagnet: 附关键词学习路径清单（PDF）
wechatHook: 回复关键词"路径"领取完整路径清单
---
```

各篇 `intent` 分布：

| 专题 | intent |
|------|--------|
| 关键词 | 学习 |
| Listing | 学习 |
| PPC | 学习 |
| Review | 学习 |
| AI 搜索 | 学习 |
| 工具资料 | **工具**（按"工具"而非"学习"标，因为本专题本质是工具介绍） |

---

## 五、SEO 结果

`npm run seo:audit` 输出：

```
SEO audit complete.
Pages checked: 37
Pass: 296
Fail: 0
robots.txt: PASS
sitemap-index.xml: PASS
```

报告：`reports/seo-audit-report.md`

6 篇新文章均通过：

- title / description 长度合规
- canonical 链接正常
- og:title / og:description / og:image 完整
- h1 / h2 结构正确（h1=1，h2=9）
- twitter:card 完整
- Article JSON-LD 完整

---

## 六、images:check 结果

`npm run images:check` 输出：

```
image-manifest check complete.
  manifest items: 7
  missing files: 0
  duplicate ids: 0
  orphan assets: 0
```

6 篇新文章复用 `og-default.svg`，未触发 manifest 变化。manifest 中 7 项均完整，无 orphan。

---

## 七、页面总数变化

| 阶段 | 页面数 | 文章数 |
|------|------:|------:|
| 任务前 | 31 | 18 |
| 任务后 | **37** | **24** |
| 变化 | +6 | +6 |

新增 6 个页面：

- `/articles/keyword-learning-path/`
- `/articles/listing-learning-path/`
- `/articles/ppc-learning-path/`
- `/articles/review-learning-path/`
- `/articles/ai-search-learning-path/`
- `/articles/tools-learning-path/`

每个新文章页面在左侧 TOC 自动显示 9 个 H2 标题，可作为后续编辑 / 阅读路径参考。

---

## 八、是否执行 046/047

**否。** 任务文件第 11 行明确要求"不要执行 046/047"，本次仅做 048-053 范围内的 6 篇文章与 6 个专题落地页更新。

---

## 九、下一步建议

1. **SEO 增量提交**：6 个新 URL 已经在 sitemap 里，可以跑 `npm run indexnow:submit` 主动推给搜索引擎
2. **公开课资料绑定**：每篇 learning path 第 8 段都标了"回复 XXX 领取"，需要资料包生成器（Lead form 后端）补齐关键词自动回复
3. **首页 CTA 强化**：当前首页每个专题卡都换成"看完整学习路径 →"；如需进一步做强，可以在首屏 hero 旁边加一个 6 专题总入口 `/articles/?topic=learning-path`
4. **046/047 待定**：046（按用户提的某个具体任务）与 047 未执行；下次任务前应确认是否要补做
5. **内容质检**：6 篇学习路径长度均匀（每篇 9 段，~170-210 行），可作为后续专题导览文章的模板复用
