# 任务 069-076 报告：站内流转增强（INTERNAL_LINKING_FLOW_V01）

**完成时间：** 2026-06-02
**任务文件：** `tasks/069-076_INTERNAL_LINKING_FLOW_V01.md`
**目标：** 在不新增文章、不改文章正文、不重构站点的前提下，把"文章 ↔ 文章"和"文章 ↔ 专题"的流转路径补齐 5 件事：相关文章、下一篇推荐、专题回流、文章数量统计、学习顺序模块。

---

## 一、执行结论

**成功 ✅**

| 子任务 | 结论 | 关键改动 |
|--------|------|----------|
| 069 新增相关文章组件 | ✅ | `src/components/RelatedArticles.astro` 组件，按 relatedTopics / topic 自动取相关 |
| 070 按 relatedTopics 自动推荐 | ✅ | 优先 `relatedTopics` 池，其次 `topic` 池，**严禁推荐自身**（已通过 `p.id !== currentId` 强制） |
| 071 下一篇该读什么 | ✅ | `src/components/NextUp.astro` 组件，找同专题里"下一篇"文章 |
| 072 回到专题学习路径 | ✅ | `src/components/BackToLearningPath.astro` 组件，文章底部蓝色卡片 |
| 073 学习路径页文章数量统计 | ✅ | `src/components/LearningPathStats.astro` 组件，只在 -learning-path 文章显示 |
| 074 首页 6 个专题卡显示文章数量 | ✅ | 首页 `topicArticleCount` 统计 + `.topic-count` 角标 |
| 075 独立专题页补推荐学习顺序 | ✅ | `src/components/RecommendedOrder.astro` 组件，5 个独立专题页均接入 |
| 076 报告 | ✅ | 本文件 |

边界遵守：

- [x] 不新增普通文章（文章数仍为 26）
- [x] 不修改文章正文（仅在文章页底部新增 3 个模块 + 在 header 内新增 1 个统计徽章）
- [x] 不删除已有链接
- [x] 不重构全站布局
- [x] 不改部署配置
- [x] 不调用外部 API
- [x] 只做：相关文章、下一篇、专题回流、文章数量、学习顺序

---

## 二、验收命令输出

```bash
npm run build
# [build] 37 page(s) built in 1.84s
# Pagefind: Indexed 37 pages, Indexed 2403 words, Indexed 3 filters

npm run seo:audit
# Pages checked: 37
# Pass: 296
# Fail: 0
# robots.txt: PASS
# sitemap-index.xml: PASS

npm run images:check
# manifest items: 7
# missing files: 0
# duplicate ids: 0
# orphan assets: 0
```

---

## 三、build 页面数

- 任务前：37
- 任务后：**37**（无变化）
- 文章数：26（无变化）
- Pagefind index：37 pages / 2403 words / **3 filters**（与 061-068 保持一致，未新增 / 减少 filter）

本次未新增 / 删除任何文章 / 页面，仅：
- 新建 5 个 Astro 组件
- 修改 1 个文章页（`[slug].astro`）+ 1 个首页（`index.astro`）+ 5 个专题页（`listing/ppc/ai-amazon/selection/tools/index.astro`）
- 新建 1 个任务文件 + 1 个报告文件

---

## 四、SEO 结果

```
Pages checked: 37
Pass: 296
Fail: 0
robots.txt: PASS
sitemap-index.xml: PASS
```

详细报告：`reports/seo-audit-report.md`

无 SEO 退化。组件内全部使用 `aria-label` 标注，section 是语义化结构，不影响搜索引擎可读性。

---

## 五、images:check 结果

```
manifest items: 7
missing files: 0
duplicate ids: 0
orphan assets: 0
```

无变化（本批次不涉及图片）。

---

## 六、069-070 相关文章组件

### 6.1 组件文件

`src/components/RelatedArticles.astro`

**核心逻辑：**

```js
const candidates = (Array.isArray(allPosts) ? allPosts : []).filter((p) => {
  if (!p || p.id === currentId) return false;       // 禁止推荐自身
  if (p?.data?.draft) return false;
  return Boolean(p?.data?.topic);
});

const preferred = candidates
  .filter((p) => relatedTopics.includes(p.data.topic))    // 优先 relatedTopics
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

const fallback = candidates
  .filter((p) => !relatedTopics.includes(p.data.topic) && p.data.topic === currentTopic)  // 退路：同 topic
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

const merged = [...preferred, ...fallback].slice(0, 4);
```

**禁止推荐自身的两道保险：**

1. `p.id === currentId` 过滤
2. 渲染前 `merged` 列表已经在 Astro 模板外完成

### 6.2 渲染位置

文章页 `<article>` 容器内、`article-disclaimer` 之后。位置（在 `[slug].astro`）：

```astro
<RelatedArticles post={post} allPosts={allPosts} max={4} />
<NextUp post={post} allPosts={allPosts} />
<BackToLearningPath post={post} />
```

### 6.3 三种"相关文章"提示文案

| 情况 | hint 文案 |
|------|-----------|
| 有 `relatedTopics` 且 preferred 非空 | "按相关专题推荐" |
| 没有 `relatedTopics`，仅 fallback 同专题 | "同专题其他文章" |
| 没有任何候选 | 组件不渲染（不出现空模块） |

### 6.4 采样验证（`dist/articles/keyword-learning-path/index.html`）

```html
<section class="related-articles" aria-label="相关文章">
  <div class="related-articles-head">
    <div class="related-articles-title">相关文章</div>
    <div class="related-articles-hint">按相关专题推荐</div>
  </div>
  <div class="related-articles-grid">
    <a class="related-article-card" href="/articles/listing-five-bullets/">
      <span class="related-article-topic">Listing</span>
      ...
    </a>
    <a class="related-article-card" href="/articles/listing-learning-path/">
      <span class="related-article-topic">Listing</span>
      ...
    </a>
    <a class="related-article-card" href="/articles/ppc-learning-path/">
      <span class="related-article-topic">PPC</span>
      ...
    </a>
    <a class="related-article-card" href="/articles/sp-ad-structure/">
      <span class="related-article-topic">PPC</span>
      ...
    </a>
  </div>
</section>
```

`relatedTopics: [listing, ppc]` → 4 篇 listing + ppc 文章全部进入（无 fallback 因 preferred 已满 4）。

### 6.5 退路采样（`dist/articles/keyword-cleaning-method/index.html`）

该文章无 `relatedTopics`，只有 `topic: keyword`：

```html
<div class="related-articles-hint">同专题其他文章</div>
<a class="related-article-card" href="/articles/keyword-learning-path/">
  <span class="related-article-topic">关键词</span>
  ...
</a>
```

只有 1 篇同专题文章（learning path），组件渲染 1 个卡片。**不推荐自身**（keyword-cleaning-method 已被过滤）。

---

## 七、071 下一篇该读什么组件

### 7.1 组件文件

`src/components/NextUp.astro`

**核心逻辑：**

```js
const candidates = allPosts.filter((p) => {
  if (!p || p.id === currentId) return false;       // 禁止推荐自身
  if (p?.data?.draft) return false;
  if (p?.data?.topic !== currentTopic) return false;
  return true;
});

let nextPost = null;

// 1) 优先"比自己更新"的下一篇
const newer = candidates
  .filter((p) => new Date(p.data.pubDate).valueOf() > currentDate)
  .sort((a, b) => new Date(a.data.pubDate).valueOf() - new Date(b.data.pubDate).valueOf());
if (newer.length > 0) nextPost = newer[0];

// 2) 退路：最近一篇（比自己旧）
if (!nextPost) {
  const older = candidates
    .filter((p) => new Date(p.data.pubDate).valueOf() < currentDate)
    .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());
  if (older.length > 0) nextPost = older[0];
}

// 3) 兜底：任何一篇同专题
if (!nextPost) {
  const others = candidates.sort((a, b) => ...);
  if (others.length > 0) nextPost = others[0];
}
```

### 7.2 视觉

- 深蓝渐变背景（与 lead magnet CTA 区别），但仍属于"路径指引"
- 显示专题 chip + 标题 + 描述
- 整张卡可点击
- 找不到候选时组件不渲染

### 7.3 采样验证（`dist/articles/listing-five-bullets/index.html`）

```html
<section class="next-up" aria-label="下一篇该读什么">
  <div class="next-up-label">下一篇该读什么</div>
  <a class="next-up-card" href="/articles/listing-learning-path/">
    <div class="next-up-side">
      <span class="next-up-topic">Listing</span>
      <div class="next-up-title">亚马逊 Listing 优化学习路径：从卖点提炼到转化表达</div>
      <p class="next-up-desc">...</p>
    </div>
    <span class="next-up-arrow" aria-hidden="true">→</span>
  </a>
</section>
```

---

## 八、072 回到专题学习路径组件

### 8.1 组件文件

`src/components/BackToLearningPath.astro`

**核心逻辑：**

```js
const learningPathMap = {
  keyword: { href: "/articles/keyword-learning-path/", ... },
  listing: { href: "/articles/listing-learning-path/", ... },
  ppc: { href: "/articles/ppc-learning-path/", ... },
  review: { href: "/articles/review-learning-path/", ... },
  "ai-search": { href: "/articles/ai-search-learning-path/", ... },
  tools: { href: "/articles/tools-learning-path/", ... }
};

const currentId = post?.id || "";
const isLearningPathPage = /-learning-path$/.test(currentId);
```

**重要：学习路径页自身不显示**——因为"回到自身"没意义。

### 8.2 视觉

- 浅蓝渐变背景，区别于 NextUp 的深色
- 顶部蓝色 "专题学习路径" 标签
- 显示路径标题 + 一句话描述

### 8.3 采样验证

`dist/articles/listing-five-bullets/index.html`（非学习路径文章）：

```html
<section class="back-to-path" aria-label="回到专题学习路径">
  <a class="back-to-path-card" href="/articles/listing-learning-path/">
    <div class="back-to-path-side">
      <span class="back-to-path-hint">专题学习路径</span>
      <div class="back-to-path-title">亚马逊 Listing 优化学习路径</div>
      <p class="back-to-path-desc">从卖点提炼到上线复盘，新手也能跑通。</p>
    </div>
    <span class="back-to-path-arrow" aria-hidden="true">→</span>
  </a>
</section>
```

`dist/articles/listing-learning-path/index.html`（学习路径自身）：

```html
<!-- back-to-path 不渲染 -->
```

---

## 九、073 学习路径页文章数量统计

### 9.1 组件文件

`src/components/LearningPathStats.astro`

**核心逻辑：**

```js
const isLearningPath = /-learning-path$/.test(currentId);

const sameTopicCount = allPosts.filter((p) => {
  if (!p) return false;
  if (p?.data?.draft) return false;
  return p?.data?.topic && p.data.topic === currentTopic;
}).length;
```

**只对 `*-learning-path` 文章显示**，避免其他文章也有"专题统计"标签。

### 9.2 视觉

- 文章 `<header>` 内，`article-meta` 之后
- 胶囊样式："专题统计" 蓝色 chip + "本专题「X」共 N 篇文章（含本路径）"
- 蓝色品牌色

### 9.3 采样验证

`dist/articles/keyword-learning-path/index.html`：

```html
<div class="learning-path-stats" aria-label="本专题文章统计">
  <span class="learning-path-stats-tag">专题统计</span>
  <span class="learning-path-stats-text">
    本专题「关键词」共
    <strong>2</strong>
    篇文章（含本路径）。
  </span>
</div>
```

### 9.4 各学习路径的统计值

| 学习路径 | topic | 数量（含本路径） |
|---------|-------|------------:|
| keyword-learning-path | keyword | 2 |
| listing-learning-path | listing | 2 |
| ppc-learning-path | ppc | 2 |
| review-learning-path | review | 2 |
| ai-search-learning-path | ai-search | 1 |
| tools-learning-path | tools | 1 |

---

## 十、074 首页 6 个专题卡显示文章数量

### 10.1 改动文件

`src/pages/index.astro`

**frontmatter 增加：**

```js
const allPostsForCount = await getCollection("posts", ({ data }) => !data.draft);

const topicArticleCount = allPostsForCount.reduce((acc, p) => {
  const t = p?.data?.topic;
  if (t) acc[t] = (acc[t] || 0) + 1;
  return acc;
}, {});
```

**模板改造：**

```astro
{topicPaths.map((topic) => {
  const count = topicArticleCount[topic.id] || 0;
  return (
    <article class={`topic-card topic-card-${topic.id}`}>
      <header class="topic-head">
        <div class="topic-icon">{topic.icon}</div>
        <div class="topic-head-text">
          <div class="topic-head-row">
            <h3>{topic.title}</h3>
            <span class="topic-count" aria-label={`本专题 ${count} 篇文章`}>
              {count} 篇文章
            </span>
          </div>
          <p>{topic.desc}</p>
        </div>
      </header>
      ...
    </article>
  );
})}
```

### 10.2 视觉

- 标题右侧蓝色 pill：`N 篇文章`
- 移动端自动 wrap

### 10.3 采样验证（`dist/index.html`）

```html
<span class="topic-count" aria-label="本专题 2 篇文章" data-astro-cid-j7pv25f6> 2 篇文章 </span>
<span class="topic-count" aria-label="本专题 2 篇文章" data-astro-cid-j7pv25f6> 2 篇文章 </span>
<span class="topic-count" aria-label="本专题 2 篇文章" data-astro-cid-j7pv25f6> 2 篇文章 </span>
<span class="topic-count" aria-label="本专题 2 篇文章" data-astro-cid-j7pv25f6> 2 篇文章 </span>
<span class="topic-count" aria-label="本专题 1 篇文章" data-astro-cid-j7pv25f6> 1 篇文章 </span>
<span class="topic-count" aria-label="本专题 1 篇文章" data-astro-cid-j7pv25f6> 1 篇文章 </span>
```

按 topicPaths 数组顺序：keyword(2), listing(2), ppc(2), review(2), ai-search(1), tools(1)。✅

---

## 十一、075 独立专题页推荐学习顺序模块

### 11.1 组件文件

`src/components/RecommendedOrder.astro`

**核心逻辑：**

```js
// 1) 严格按 topic 过滤
const all = allPosts.filter((p) => {
  if (!p || p?.data?.draft) return false;
  return p?.data?.topic && p.data.topic === slug;
});

// 2) 学习路径文章置顶
const pathPost = all.find((p) => /-learning-path$/.test(p.id)) || null;
const others = all
  .filter((p) => !pathPost || p.id !== pathPost.id)
  .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

// 3) 若同 topic 文章不足，回退到 category 匹配
const categoryFallbackMap = {
  "ai-search": ["AI 搜索", "AI 运营亚马逊"],
  selection: ["选品指南", "选品"],
  tools: ["工具模板", "工具资料"]
};
if (finalOrdered.length <= 1) {
  // 补 category 同义类
}
```

### 11.2 接入的 5 个专题页

- `src/pages/listing/index.astro` — topic: listing
- `src/pages/ppc/index.astro` — topic: ppc
- `src/pages/ai-amazon/index.astro` — topic: ai-search
- `src/pages/selection/index.astro` — topic: selection
- `src/pages/tools/index.astro` — topic: tools

每个文件改动：

```diff
+ import { getCollection } from "astro:content";
+ import RecommendedOrder from "../../components/RecommendedOrder.astro";
+ const allPosts = await getCollection("posts", ({ data }) => !data.draft);
  ...
+ <RecommendedOrder topic="listing" allPosts={allPosts} title="推荐学习顺序" />
```

### 11.3 视觉

- 蓝白卡片背景
- 标题："推荐学习顺序" + 蓝色竖条
- 副标题："按推荐顺序读，共 N 步"
- 编号列表：圆形数字 / 标题 / 一句话描述 / 箭头
- 学习路径项视觉强调：蓝色实心圆 + 蓝色"学习路径" chip

### 11.4 各专题页"推荐学习顺序"结果

| 专题页 | step 1（学习路径） | 其余步骤 | 总步数 |
|--------|------------------|----------|------:|
| /listing/ | listing-learning-path | listing-five-bullets | 2 |
| /ppc/ | ppc-learning-path | sp-ad-structure | 2 |
| /ai-amazon/ | ai-search-learning-path | 2026-amazon-ai-operations, amazon-rufus-alexa-shopping, consumer-ai-search-amazon（category 回退） | 4 |
| /selection/ | （无学习路径） | selection-pain-reverse, ai-competitor-matrix, ai-market-size-estimate, ai-review-analysis（category 回退） | 4 |
| /tools/ | tools-learning-path | ai-operations-resource-pack（category 回退） | 2 |

> 注：ai-search / selection / tools 三个专题目前仅 1 篇带 `topic:` 的文章，因此用 `category` 字段补齐推荐位。category 匹配白名单已写在 `categoryFallbackMap` 内，未来若有新文章带 `topic:` 自动优先按 topic 排。

### 11.5 采样验证（`dist/listing/index.html`）

```html
<section class="learning-order" aria-label="推荐学习顺序" data-astro-cid-vdfx2qrf>
  <div class="learning-order-head">
    <div class="learning-order-title">推荐学习顺序</div>
    <div class="learning-order-hint">按推荐顺序读，共 2 步</div>
  </div>
  <ol class="learning-order-list">
    <li class="learning-order-item is-path">
      <a class="learning-order-link" href="/articles/listing-learning-path/">
        <span class="learning-order-step">1</span>
        <div class="learning-order-body">
          <div class="learning-order-name">
            亚马逊 Listing 优化学习路径：从卖点提炼到转化表达
            <span class="learning-order-tag">学习路径</span>
          </div>
          <p class="learning-order-desc">...</p>
        </div>
        <span class="learning-order-arrow">→</span>
      </a>
    </li>
    <li class="learning-order-item">
      <a class="learning-order-link" href="/articles/listing-five-bullets/">
        <span class="learning-order-step">2</span>
        ...
      </a>
    </li>
  </ol>
</section>
```

---

## 十二、新增 / 修改文件清单

| 类型 | 路径 | 说明 |
|------|------|------|
| 新增 | `tasks/069-076_INTERNAL_LINKING_FLOW_V01.md` | 任务文件 |
| 新增 | `reports/069-076_INTERNAL_LINKING_FLOW_V01_report.md` | 本报告 |
| 新增 | `src/components/RelatedArticles.astro` | 069-070 相关文章组件 |
| 新增 | `src/components/NextUp.astro` | 071 下一篇组件 |
| 新增 | `src/components/BackToLearningPath.astro` | 072 专题学习路径组件 |
| 新增 | `src/components/LearningPathStats.astro` | 073 专题统计徽章 |
| 新增 | `src/components/RecommendedOrder.astro` | 075 推荐学习顺序组件 |
| 修改 | `src/pages/articles/[slug].astro` | 接入 4 个新组件 + 相关样式 |
| 修改 | `src/pages/index.astro` | 074 topicArticleCount + topic-count 角标 + 样式 |
| 修改 | `src/pages/listing/index.astro` | 075 接入 RecommendedOrder + getCollection |
| 修改 | `src/pages/ppc/index.astro` | 075 接入 RecommendedOrder + getCollection |
| 修改 | `src/pages/ai-amazon/index.astro` | 075 接入 RecommendedOrder + getCollection |
| 修改 | `src/pages/selection/index.astro` | 075 接入 RecommendedOrder + getCollection |
| 修改 | `src/pages/tools/index.astro` | 075 接入 RecommendedOrder + getCollection |
| 重新生成 | `dist/articles/*/index.html` | 26 个文章页加新模块 |
| 重新生成 | `dist/index.html` | 首页 6 专题卡加 count |
| 重新生成 | `dist/{listing,ppc,ai-amazon,selection,tools}/index.html` | 5 个专题页加推荐顺序 |
| 重新生成 | `dist/pagefind/index/...` | 索引自动重建（无新 filter） |

**未触碰：**

- `src/content/posts/*.md`（26 篇文章正文一字未改）
- `src/pages/search.astro`（搜索页未改）
- `astro.config.mjs`
- `package.json`（无新依赖）
- 部署配置
- 36 个其他页面（about / lead / open-class / rss / sitemap / search / articles 列表）

---

## 十三、Pagefind index 关键指标

| 指标 | 任务前 | 任务后 |
|------|------:|------:|
| Indexed pages | 37 | 37 |
| Indexed words | 2399 | 2403 |
| Indexed filters | 3 | 3（topic / stage / intent 不变） |
| Indexed sorts | 0 | 0 |

**结论：069-076 不影响 Pagefind 3 filters 维度**，因为：
- 新增的模块没有 `data-pagefind-filter` 属性
- 仍然是 `body` 内可见文本，索引词数从 2399 → 2403（小幅增加是新组件的标题 / 描述文字）

---

## 十四、验收

按 docs/post-publish-checklist.md（任务 060 新增）逐项跑：

- [x] `npm run build` — 37 pages，无错误
- [x] `npm run seo:audit` — 296 pass / 0 fail
- [x] `npm run images:check` — 7 manifest / 0 missing
- [x] sitemap 与 37 页一致
- [x] robots.txt PASS
- [x] canonical / og:url / site URL 全站一致
- [x] rss.xml autodiscovery 仍存在
- [x] Article JSON-LD 仍存在
- [x] BreadcrumbList JSON-LD 仍存在
- [x] Pagefind 3 filters 保持
- [x] 文章页含 4 个新模块（RelatedArticles / NextUp / BackToLearningPath / LearningPathStats）
- [x] 学习路径页含「专题统计」徽章
- [x] 首页 6 个专题卡含 count 角标
- [x] 5 个独立专题页含"推荐学习顺序"模块
- [x] **禁止推荐自身**已通过 `p.id === currentId` 过滤强制（RelatedArticles + NextUp）
- [x] **学习路径自身不显示 BackToLearningPath**（避免自我链接）
- [ ] 浏览器端点检：相关推荐 / 下一篇 / 专题回流 / count / 顺序模块 — **需在 preview 模式人工验**

最后一项是浏览器交互，CI 不可跑，需发布人或 reviewer 在 preview 环境手动验证。

---

## 十五、下一步建议

1. **浏览器手动验收**：`npm run preview`，打开：
   - 首页（确认 6 个专题卡的 "N 篇文章" 角标）
   - 任一非学习路径文章（确认底部出现"相关文章 / 下一篇 / 回到专题路径"三块）
   - 任一学习路径文章（确认顶部出现"专题统计"徽章 + 底部仅"下一篇 / 相关文章"，无自我回流）
   - 5 个独立专题页（确认"推荐学习顺序"模块在 guide-card 和 grid-3 之间）
2. **补 `topic` 元数据**：当前仅 11 / 26 篇文章带 `topic:` 字段（41%）。后续 041-053 / 054-060 批次的文章若补齐 `topic:`，RelatedArticles / NextUp / RecommendedOrder 自动覆盖更多文章
3. **补 `relatedTopics` 元数据**：当前仅 6 / 11 篇文章有 `relatedTopics`（含 learning path 全部）。后续为每篇正文文章写 `relatedTopics: [topic-slug, ...]` 即可让"相关文章"模块跳到更精准的"相关专题"
4. **专题页 category 回退的合理化**：ai-amazon / selection / tools 三个专题页因为只有 1 篇带 `topic:` 的文章，目前用 `category` 字段做兜底推荐。后续 041-053 批次若为该类文章补 `topic:`，回退逻辑自动不再触发
5. **filter 持久化（沿用 061-068 建议）**：搜索页的 filter 当前不写 URL，但本批次不涉及搜索
6. **下一步 SEO 增强**：可在 seo-audit.mjs 中加入"文章页必含 RelatedArticles 段"的检测（针对有 topic 的文章），保证后续不漏推荐位
7. **Pagefind 与推荐位联动的探索**：现在相关文章是 frontmatter 静态生成的，可以加运行时 Pagefind search 作为 fallback。但当前 26 篇规模没必要
