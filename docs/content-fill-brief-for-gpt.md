# 阿岩跨境笔记｜待补齐文章生产 brief（给 GPT）

> **用途**：把本文档交给 GPT，让它按规格产出 Markdown 正文 + frontmatter。  
> **产出后**：把 GPT 生成的 `.md` 文件或合并文档交回 Cursor，由 Codex 写入 `src/content/posts/` 并执行站点改动。  
> **版本**：2026-06-18  
> **基准**：当前站点已有 **63 篇**已发布文章，7 份资料包，8 门公开课。

---

## 一、项目检查结果（Codex 已核对）

### 1.1 已完成（无需 GPT 重写）

| 项 | 状态 | 说明 |
|----|------|------|
| `content.config.ts` schema | ✅ 已扩展 | 新增 `hookType`、`featured`、`resourceSlug`、`openClassSlug`、`priority`、`learningPathAutoArticles` |
| 63 篇存量 `articleType` | ✅ 已补齐 | 全部文章均有 `articleType` |
| 10 篇 case 元数据 | ✅ 已补齐 | `articleType: case-study` + `hookType` + `homepageSlot: hot-practical` |
| 核心 method 文资源关联 | ✅ 部分已补 | 如 `keyword-cleaning-method` → `resourceSlug: keyword-cleaning-sheet` |

### 1.2 尚未完成（Codex 后续执行，不由 GPT 写正文）

| 项 | 状态 |
|----|------|
| 首页 Hero 数据动态化（56/28/3 → 实际数量） | ⏳ 待做 |
| `/map/` 知识地图页 | ⏳ 待做 |
| `/cases/` 按 `hookType` 动态筛选 | ⏳ 待做 |
| `/articles/` 标签筛选 | ⏳ 待做 |
| 钩子文单一 CTA、`/lead/` 分段、`/ask/` 降噪 | ⏳ 待做 |
| build + seo:audit + indexnow | ⏳ 待做 |

### 1.3 内容缺口（**本文档核心：需 GPT 补齐**）

共 **20 篇**内容任务：

- **8 篇** method 型知识库深度文（全新）
- **5 篇** net-new 钩子案例文（全新）
- **7 篇** 现有 case 文 SEO 标题 + 正文扩写（改写，不新建 slug）

---

## 二、GPT 写作总则

### 2.1 品牌与语气

- 站点名：**阿岩跨境笔记**
- 作者人设：**阿岩**，亚马逊一线运营实操，偏「帮卖家做判断」而非鸡汤
- 语言：简体中文，口语化但专业，避免「必赚」「躺赚」等夸大表述
- 免责声明意识：方法是教学整理，不构成平台政策/投资建议

### 2.2 格式规范（必须遵守）

**文件路径**：每篇输出一个完整 `.md` 文件，文件名 = `slug.md`

**Frontmatter**：YAML，字段顺序建议如下：

```yaml
---
title: "标题"
description: "120–160 字 SEO 描述，含核心关键词"
pubDate: "2026-06-20"
category: "专题中文名"
tags: ["标签1", "标签2"]
image: "/images/articles/{slug}/cover.svg"
draft: false
topic: keyword | listing | ppc | review | selection | ai-search | tools
stage: 新手 | 进阶 | 实操
intent: 学习 | 工具 | 决策 | 避坑
articleType: method | case-study
# 钩子文额外必填：
hookType: 避坑 | 反常识 | 数字冲击 | 案例复盘 | 政策解读
featured: true          # 钩子文建议 true
homepageSlot: hot-practical  # 钩子文建议填写
resourceSlug: xxx       # 对应 /resources/ 下详情页 slug（如有）
openClassSlug: xxx      # 对应 /open-class/ 下详情页 slug（如有）
leadMagnet: "资料说明"
wechatHook: 资料领取方式以资料详情页说明为准。
relatedArticleLinks:
  - slug: some-slug
    label: 短标题
    context: 关联说明
---
```

**正文结构**：

- 用 `##` 作为 H2（目录自动生成，**H2 标题里不要 emoji**）
- 可用 callout（按需）：

```html
<div class="article-callout article-callout-blue">💡 提示内容</div>
<div class="article-callout article-callout-yellow">⚠️ 警告内容</div>
<div class="article-callout article-callout-green">✅ 正确做法</div>
<div class="article-callout article-callout-red">❌ 常见误区</div>
```

**内链**：正文里至少 **2 处** Markdown 链接到站内已有文章，格式：

```markdown
详见 [关键词清洗方法](/articles/keyword-cleaning-method/)
```

**字数**：

| 类型 | 字数 |
|------|------|
| method 深度文 | 2500–4000 字 |
| case-study 钩子文 | 1800–2800 字 |
| case 改写扩写 | 在原文基础上 +800–1200 字，保留原结构 |

**脱敏**：案例用「某家居收纳卖家」「宠物玩具类目」等代称，数据可比例缩放但逻辑真实。

**钩子文结尾 CTA**（固定句式，单独一段）：

```markdown
---

<div class="article-callout article-callout-blue">

不确定自己的情况属于哪一类？[做 30 秒资料诊断](/survey/)，我会按你的阶段推荐对应资料和阅读路径。

</div>
```

**method 文结尾**：总结 + 可选链到相关资源，不要堆多个 CTA。

### 2.3 资料包 slug 对照表

| resourceSlug | 资料名称 | URL |
|--------------|----------|-----|
| keyword-cleaning-sheet | 关键词清洗表 | /resources/keyword-cleaning-sheet/ |
| listing-checklist | Listing 自检清单 | /resources/listing-checklist/ |
| ppc-weekly-review | PPC 周复盘表 | /resources/ppc-weekly-review/ |
| review-pain-analysis | Review 痛点分析表 | /resources/review-pain-analysis/ |
| competitor-selection-matrix | 竞品矩阵拆解表 | /resources/competitor-selection-matrix/ |
| platform-rules-checklist | 平台规则避坑清单 | /resources/platform-rules-checklist/ |
| ai-tools-review-sheet | AI 工具评测表 | /resources/ai-tools-review-sheet/ |

### 2.4 GPT 交付格式

请按以下结构交付，便于 Codex 批量导入：

```
# 交付清单

## 新建文章（13 篇）
- [ ] selection-profit-5000-still-losing.md
- [ ] ...（列出全部 slug）

## 改写文章（7 篇）
- [ ] case-selection-seems-ok-dont-do.md（覆盖原文）
- [ ] ...

---

# 文件 1: selection-profit-5000-still-losing.md
（完整 markdown）

---

# 文件 2: ...
```

---

## 三、A 组：8 篇 method 知识库深度文（全新）

> `articleType: method`，**不要**填 `hookType`。  
> 目标：补知识库厚度，SEO 长尾，串联现有学习路径。

---

### A1. 否词策略：新品第一周后怎么筛搜索词

| 字段 | 值 |
|------|-----|
| **slug** | `ppc-negative-keyword-week-one` |
| **title** | PPC 第 4 篇：否词策略——新品第一周后怎么筛搜索词 |
| **topic** | `ppc` |
| **stage** | `实操` |
| **intent** | `工具` |
| **category** | 广告 PPC |
| **resourceSlug** | `ppc-weekly-review` |
| **openClassSlug** | `ppc-week-one` |

**要解决的问题**：卖家第一周跑完自动/手动广告后，搜索词报告几百条，不知道哪些该否、哪些该单独建组。

**正文大纲**：

1. 导语：第一周否词的目标不是降 ACOS，是「止损 + 留种子词」
2. 先否哪三类词：完全不相关、只看不买、竞品品牌词（举例）
3. 暂否 vs 永久否：点击阈值、花费阈值怎么定
4. 从搜索词报告到否词 SOP（5 步表格）
5. 常见误区：第一周就把所有高 CPC 词否掉
6. AI 能做什么：用 AI 批量归类搜索词；不能做什么：代替人工看 Listing 承接
7. 总结 + 链到 [新品广告第一周](/articles/new-product-ppc-week-one/) 和 [SP 广告结构](/articles/sp-ad-structure/)

**内链必含**：`new-product-ppc-week-one`、`sp-ad-structure`、`case-auto-ads-300-search-terms`

---

### A2. 主图点击率诊断：从 0.3% 到 0.8% 的检查项

| 字段 | 值 |
|------|-----|
| **slug** | `listing-main-image-ctr-checklist` |
| **title** | Listing 第 4 篇：主图点击率诊断——从 0.3% 到 0.8% 的检查 8 项 |
| **topic** | `listing` |
| **stage** | `进阶` |
| **intent** | `工具` |
| **category** | Listing 优化 |
| **resourceSlug** | `listing-checklist` |
| **openClassSlug** | `listing-conversion-check` |

**要解决的问题**：广告有点击但 CTR 低，不知道是主图问题还是词的问题。

**正文大纲**：

1. 先判断：CTR 低是词不对还是图不对（决策树）
2. 8 项主图自检：主体大小、背景、信息层级、场景感、差异化、移动端缩略图、与标题一致性、竞品对比
3. 改图优先级：先改什么后改什么
4. 用广告数据验证改图效果（观察周期）
5. 误区：盲目换风格不换表达
6. 总结 + 链到 [Listing 自检清单](/articles/listing-checklist/)

**内链必含**：`listing-five-bullets`、`case-clicks-no-orders-image-price`、`listing-checklist`

---

### A3. 利润倒推：从售价算成本能不能做

| 字段 | 值 |
|------|-----|
| **slug** | `selection-profit-reverse-calculation` |
| **title** | 选品第 4 篇：利润倒推——从售价算成本能不能做 |
| **topic** | `selection` |
| **stage** | `新手` |
| **intent** | `决策` |
| **category** | 选品 |
| **resourceSlug** | `competitor-selection-matrix` |
| **openClassSlug** | `competitor-selection-matrix` |

**要解决的问题**：新手只看搜索量和售价，不算 FBA 费、佣金、广告占比，做到月销仍亏钱。

**正文大纲**：

1. 导语：选品先看「能不能赚钱」再看「能不能做起来」
2. 利润倒推公式：售价 − 采购 − 头程 − FBA − 佣金 − 广告 − 退货损耗
3. 三个场景演算（低客单 / 中客单 / 高客单，脱敏数字）
4. 什么毛利率才值得做（经验区间，注明因类目而异）
5. 误区：把「月销 $5000」当成功
6. AI 辅助：用 AI 做 sensitivity 表；人工确认费率
7. 总结 + 链到 [市场容量判断](/articles/ai-market-size-estimate/)

**内链必含**：`ai-market-size-estimate`、`ai-competitor-matrix`、`case-selection-seems-ok-dont-do`

---

### A4. 退货数据分析：比看 Review 更早发现问题

| 字段 | 值 |
|------|-----|
| **slug** | `review-return-data-analysis` |
| **title** | Review 第 4 篇：退货数据分析——比看 Review 更早发现问题 |
| **topic** | `review` |
| **stage** | `实操` |
| **intent** | `工具` |
| **category** | Review 分析 |
| **resourceSlug** | `review-pain-analysis` |
| **openClassSlug** | `review-to-selection` |

**要解决的问题**：Review 更新慢，退货理由更及时，卖家不会看退货报告。

**正文大纲**：

1. 退货率 vs Review 评分：哪个信号更早
2. 退货理由 5 类归类法（尺寸/质量/描述不符/物流/期望落差）
3. 从退货到 Listing 修改、产品改进的闭环
4. 与 Review 痛点分析如何配合
5. 误区：只看星级不看退货
6. 总结

**内链必含**：`ai-review-analysis`、`review-analysis-matrix`、`case-review-pain-reverse-improvement`

---

### A5. 长尾词挖掘：4 种来源之外的第 5 种

| 字段 | 值 |
|------|-----|
| **slug** | `keyword-longtail-fifth-source` |
| **title** | 关键词第 5 篇：长尾词挖掘——4 种来源之外的第 5 种 |
| **topic** | `keyword` |
| **stage** | `进阶` |
| **intent** | `工具` |
| **category** | 关键词 |
| **resourceSlug** | `keyword-cleaning-sheet` |
| **openClassSlug** | `keyword-to-listing` |

**要解决的问题**：卖家只会用工具拉词，不会从 Q&A、Post、竞品 A+、广告搜索词里挖长尾。

**正文 outline**：第 5 种来源 = **广告搜索词报告 + Q&A 交叉验证**；5 步 SOP；与 [4 类来源](/articles/keyword-source-4-types/) 的关系。

**内链必含**：`keyword-source-4-types`、`keyword-cleaning-method`、`case-keyword-200-to-30-listing`

---

### A6. 账号健康自查：ODR/迟发/政策警告

| 字段 | 值 |
|------|-----|
| **slug** | `tools-account-health-self-check` |
| **title** | 工具第 2 篇：账号健康自查——ODR、迟发与政策警告怎么处理 |
| **topic** | `tools` |
| **stage** | `新手` |
| **intent** | `避坑` |
| **category** | 工具模板 |
| **resourceSlug** | `platform-rules-checklist` |
| **openClassSlug** | `platform-rules-beginner` |

**要解决的问题**：收到绩效通知不知道严重程度，不知道先查什么。

**正文大纲**：账号健康仪表盘 6 项指标、收到警告邮件后的 24h/72h 动作、与 [平台规则入门](/articles/amazon-platform-rules-beginner/) 配合。

**内链必含**：`amazon-platform-rules-beginner`、`case-rating-42-qa-risk`

---

### A7. Rufus 时代 Listing 怎么写（2026 实操版）

| 字段 | 值 |
|------|-----|
| **slug** | `ai-rufus-listing-writing-2026` |
| **title** | AI 搜索第 4 篇：Rufus 时代 Listing 怎么写（2026 实操版） |
| **topic** | `ai-search` |
| **stage** | `进阶` |
| **intent** | `工具` |
| **category** | AI 运营亚马逊 |
| **resourceSlug** | `ai-tools-review-sheet` |
| **openClassSlug** | `ai-tools-for-amazon` |

**要解决的问题**：Rufus/AI 搜索兴起，老 Listing 写法可能丢流量。

**正文大纲**：与传统 SEO 的差异、标题/五点/A+ 如何写「可被 AI 理解」、3 个自检问题；续写 [Rufus 专题](/articles/amazon-rufus-alexa-shopping/)。

**内链必含**：`amazon-rufus-alexa-shopping`、`consumer-ai-search-amazon`、`ai-listing-optimization`

---

### A8. 新卖家 90 天运营节奏表

| 字段 | 值 |
|------|-----|
| **slug** | `new-seller-90-day-operation-rhythm` |
| **title** | 运营总览：新卖家 90 天运营节奏表 |
| **topic** | `tools` |
| **stage** | `新手` |
| **intent** | `学习` |
| **category** | 运营 |
| **featured** | `true` |
| **priority** | `high` |

**要解决的问题**：新手不知道 90 天内先做什么后做什么。

**正文大纲**：

- 第 1–30 天：规则 + 选品 + Listing 打底
- 第 31–60 天：上架 + 广告测试 + Review 积累
- 第 61–90 天：否词 + 复盘 + 是否加码
- 每周 checklist 表格
- 链到 7 条学习路径文章

**内链必含**：全部 7 篇 `*-learning-path` 文章

---

## 四、B 组：5 篇 net-new 钩子案例文（全新 slug）

> `articleType: case-study`，必须填 `hookType`、`featured: true`、`homepageSlot: hot-practical`。  
> 结构：背景 → 脱敏说明 → 问题现象 → 错误路径 → 正确路径 → 结果 → 单一 CTA。

---

### B1. H1｜月销 $5000 还在亏钱

| 字段 | 值 |
|------|-----|
| **slug** | `case-5000-sales-still-losing-money` |
| **title** | 案例：月销 $5000 还在亏钱，利润到底算错在哪 |
| **hookType** | `数字冲击` |
| **topic** | `selection` |
| **intent** | `决策` |
| **resourceSlug** | 无（链到 A3 method 文） |

**场景**：月销 $5000 看起来不错，扣完成本、广告、退货后净亏；卖家只看了前台售价。

**承接**：正文内链到 `selection-profit-reverse-calculation`（A3）

---

### B2. H9｜新品第一周该加词还是该否词

| 字段 | 值 |
|------|-----|
| **slug** | `case-ppc-week-one-add-or-negative` |
| **title** | 案例：新品第一周广告复盘——该加词还是该否词 |
| **hookType** | `数字冲击` |
| **topic** | `ppc` |
| **resourceSlug** | `ppc-weekly-review` |
| **openClassSlug** | `ppc-week-one` |

**场景**：第一周跑完，15 个词有花费，3 个出单，8 个有点击无单——决策加词/否词/改 Listing。

**与现有文差异**：`case-new-product-week-one-review` 偏「看什么指标」；本篇偏「加词 vs 否词决策」。

---

### B3. H10｜差评里藏着的选品机会

| 字段 | 值 |
|------|-----|
| **slug** | `case-bad-reviews-selection-opportunity` |
| **title** | 案例：差评里藏着的选品机会——3 个脱敏复盘 |
| **hookType** | `案例复盘` |
| **topic** | `review` |
| **resourceSlug** | `review-pain-analysis` |

**场景**：3 个不同品类，从差评/Q&A 里挖出「竞品没做好但需求真实存在」的缺口。

**与现有文差异**：`case-review-pain-reverse-improvement` 偏改产品；本篇偏「发现选品机会」。

---

### B4. H11｜2026 AI 搜索 Listing 老写法丢流量

| 字段 | 值 |
|------|-----|
| **slug** | `case-ai-search-listing-old-method-losing-traffic` |
| **title** | 案例：2026 亚马逊 AI 搜索下，Listing 还按老方法写会丢哪些流量 |
| **hookType** | `政策解读` |
| **topic** | `ai-search` |
| **resourceSlug** | `ai-tools-review-sheet` |

**场景**：同一产品改写法前后，自然流量/AI 入口曝光变化（脱敏数据）。

**承接**：链到 A7 `ai-rufus-listing-writing-2026`

---

### B5. H12｜平台警告邮件来了

| 字段 | 值 |
|------|-----|
| **slug** | `case-platform-warning-email-checklist` |
| **title** | 案例：平台警告邮件来了——新手先别慌，按这张清单查 |
| **hookType** | `避坑` |
| **topic** | `tools` |
| **resourceSlug** | `platform-rules-checklist` |
| **openClassSlug** | `platform-rules-beginner` |

**场景**：收到「政策合规」或「绩效风险」邮件，卖家差点乱改 Listing/关店。

**承接**：链到 A6 `tools-account-health-self-check`

---

## 五、C 组：7 篇现有 case 改写扩写（保留原 slug）

> **不要改 slug**，在现有文件基础上：优化 title/description、扩写正文、补内链。  
> 输出时标注「覆盖原文」。

| 计划编号 | 现有 slug | 建议新 title（SEO 优化） | hookType（已有） | 扩写重点 |
|----------|-----------|--------------------------|------------------|----------|
| H2 | `case-ppc-high-acos-dont-panic` | 广告 ACOS 80% 别急着关：先查这 3 项 | 反常识 | 增加「3 项检查」独立章节，数字更具体 |
| H3 | `case-selection-seems-ok-dont-do` | 搜索量 12 万但不该入场：品牌集中度陷阱 | 案例复盘 | 强化品牌集中度数据段落 |
| H4 | `case-clicks-no-orders-image-price` | 有点击没订单：90% 是图和价格，不是关键词 | 避坑 | 增加「90%」判断逻辑与排查顺序 |
| H5 | `case-keyword-200-to-30-listing` | 200 个关键词进 Listing 反而没流量 | 数字冲击 | 强调「堆词导致相关性下降」机制 |
| H6 | `case-rating-42-qa-risk` | 4.2 分还能卖？Rating 背后的 Q&A 风险 | 避坑 | 扩写 Q&A 对转化的影响数据 |
| H7 | `case-supplier-can-make-dont-order` | 供应商说能做别急着下单：5 个必问问题 | 避坑 | 增加「5 个必问问题」清单 |
| H8 | `case-auto-ads-300-search-terms` | 自动广告跑出 300 词：不是词多就好 | 数字冲击 | 增加否词/留词比例结论 |

**保留项**（已有 hookType，本次可不改或微调）：

- `case-listing-traffic-no-conversion`
- `case-review-pain-reverse-improvement`
- `case-new-product-week-one-review`

---

## 六、文章依赖关系（写完后 Codex 会补 prev/next）

```
A3 selection-profit-reverse-calculation ← B1 case-5000-sales-still-losing-money
A1 ppc-negative-keyword-week-one ← B2 case-ppc-week-one-add-or-negative
A7 ai-rufus-listing-writing-2026 ← B4 case-ai-search-listing-old-method-losing-traffic
A6 tools-account-health-self-check ← B5 case-platform-warning-email-checklist
A4 review-return-data-analysis ← B3 case-bad-reviews-selection-opportunity
```

---

## 七、GPT 产出检查清单

每篇交付前自检：

- [ ] frontmatter 字段完整，`pubDate` 使用 2026-06-20 至 2026-06-25 之间
- [ ] `description` 含目标 SEO 关键词
- [ ] 正文至少 2 条站内 `/articles/{slug}/` 内链
- [ ] 钩子文有 `/survey/` CTA callout
- [ ] 无「保证出单」「稳赚」等违规表述
- [ ] H2 无 emoji
- [ ] 案例已脱敏

---

## 八、Codex 收到 GPT 文稿后的执行步骤（供参考）

1. 将 13 个新 slug 写入 `src/content/posts/`
2. 用 C 组覆盖 7 个现有 case 文件
3. 批量补 `prevArticle` / `nextArticle` / `relatedArticleLinks`
4. 创建占位封面 `public/images/articles/{slug}/cover.svg`（或运行配图脚本）
5. 实现 `/map/`、首页动态数据、cases 筛选、CTA 降噪
6. `npm run build && npm run seo:audit`

---

**文档结束。** 请 GPT 严格按第三节（A 组 8 篇）、第四节（B 组 5 篇）、第五节（C 组 7 篇改写）产出，合计 **20 篇内容任务**。
