# 272 首页自动聚合 Phase 2 执行报告

## 1. 任务名称
首页自动聚合 Phase 2 — 将首页推荐区从硬编码改为按 frontmatter 自动读取

## 2. 执行结论
**完成。** 7 个 topic 卡片的 articles 数组全部改为自动聚合，新增 2 个自动推荐区（ai-prompt / resource-tutorial），全部排序规则为 featured→priority→pubDate。build 62 pages / 0 error，SEO 496/0，images 49/0/0/0。

## 3. 修改文件

| 文件 | 状态 |
|------|------|
| `src/lib/content-orchestration.ts` | **新增** — 内容编排 helper |
| `src/pages/index.astro` | **修改** — 7 处 articles 替换 + 新增 2 个 slot 推荐区 + CSS |

## 4. 具体改动

### 4.1 新增 `src/lib/content-orchestration.ts`
- `getPostsByTopic(allPosts, topicId, max=4)` — 按 topic 筛选，排除 learning-path，排序取前 N
- `getPostsBySlot(allPosts, slot, max=4)` — 按 homepageSlot 筛选，排序取前 N
- 排序规则：`featured===true` 排前 → `priority` 降序 (high>medium>low>none) → `pubDate` 降序
- 导出 `ArticleLink` 类型 `{ href, title }`

### 4.2 `src/pages/index.astro` frontmatter 区
- 新增 `allPosts` 别名（复用已加载的 posts）
- 新增 `topicArticleLists` 对象，7 个 topic 各自调用 `getPostsByTopic`
- 新增 `slotArticles` 对象，3 个 slot 各自调用 `getPostsBySlot`

### 4.3 topicPaths articles 替换（7 处）

| topic | 替换前条数 | 替换后条数 | 说明 |
|-------|-----------|-----------|------|
| keyword | 4 条硬编码 | 动态取 ≤4 | 保持 4 篇不变 |
| listing | 3 条硬编码 | 动态取 ≤4 | 保持 3 篇不变 |
| ppc | 3 条硬编码 | 动态取 ≤4 | 保持 3 篇不变 |
| review | 3 条硬编码 | 动态取 ≤4 | 保持 3 篇不变 |
| selection | 3 条硬编码 | 动态取 ≤4 | 保持 3 篇不变 |
| ai-search | 5 条硬编码 | 动态取 ≤4 | 从 5 篇精简到 4 篇（去掉消费者篇） |
| tools | 1 条硬编码 | 动态取 ≤4 | 保持 1 篇不变 |

> ai-search 自动取到 4 篇（3 篇提示词 + 1 篇 rufus），去掉第 5 篇 consumer-ai-search。这是预期行为——最多 4 篇，排序靠前的先展示。featured 和 priority 相同则按 pubDate 最新的取。

### 4.4 新增 slot 推荐区（2 个）

在 ask-entry 和 main-layout 之间插入：

1. **AI 提示词专区** — `homepageSlot === "ai-prompt"` → 3 篇文章
2. **资源配套教学** — `homepageSlot === "resource-tutorial"` → 2 篇文章
3. **新手入门推荐** — `homepageSlot === "beginner-start"` → 暂无文章，不渲染

视觉上使用浅色卡片容器 + `.topic-articles` 列表样式，与首页风格一致。如果某 slot 无文章则整块不渲染（fallback）。

### 4.5 新增 CSS
- `.slot-section` — flex column 容器
- `.slot-block` — 浅色卡片（同 `.side-card` 风格）
- `.slot-heading` — 小标题样式
- `.slot-block .topic-articles` — 复用现有列表样式

## 5. 验证结果

| 检查项 | 结果 |
|--------|------|
| `npm run build` | 62 pages, 0 errors |
| `npm run seo:audit` | 496 pass, 0 fail |
| `npm run images:check` | 49/0/0/0 |
| 首页渲染 | homepageSlot 有值的文章正常显示在新推荐区 |
| 各 topic 卡片 | articles 列表正常渲染 ≤4 篇 |
| 空 slot 不渲染 | beginner-start 无文章，整块不显示 |

## 6. 风险

- **低**：未补全 frontmatter 文章不会自动出现在首页推荐区。这是预期行为——等 Phase 1 字段覆盖更多文章后自动补充。
- **低**：ai-search topic 从 5 篇降到 4 篇（max=4 截断），如果希望保留 5 篇需改 max 参数。
- **低**：`getPostsByTopic` 排除了 `articleType === "learning-path"` 的专题页，避免专题页出现在自己的 articles 列表里。

## 7. 下一步建议

1. **Phase 3**：把 topic 卡片的 guide、previews、cta 也提取成可配置字段，彻底消灭 topicPaths 硬编码
2. **覆盖更多文章**：给更多旧文章补全 articleType / homepageSlot / featured / priority 字段，让自动推荐区内容更丰富
3. **beginner-start 内容规划**：目前无文章命中该 slot，考虑创建面向绝对新手的入门文章系列
4. **数据打点**：在首页推荐链接上加 event 标记，方便后续统计点击率
5. **如果 max=4 不够**：把 max 改成从文章 frontmatter 或全局配置读取

## 8. 给 GPT 的回填摘要

```
272: 首页自动聚合 Phase 2 — 创建 src/lib/content-orchestration.ts helper（getPostsByTopic / getPostsBySlot），改造 src/pages/index.astro：7 个 topic 卡片的 articles 数组全部改为自动聚合排序（featured→priority→pubDate），新增 ai-prompt 和 resource-tutorial 自动推荐区（卡片标题+列表），beginner-start 无文章不渲染。build 62pages/0err，SEO 496/0，images 49/0/0/0。git diff: index.astro +125/-36, 1 new file (helper)。
```
