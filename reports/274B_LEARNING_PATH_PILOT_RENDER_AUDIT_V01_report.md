# 274B 学习路径试点渲染审查报告

## 1. 执行结论

**有风险，暂不建议直接推广到其他 topic。**

274 的 ai-search 自动化试点本身正确运行，但 `[slug].astro` 的全局条件渲染影响了另外 2 个未激活 topic 的学习路径页面（selection、tools），造成重复文章列表。

## 2. ai-search 页面渲染检查

ai-search-learning-path 页面正确渲染：
- §4 标题下方显示"以下文章列表根据各文章的 frontmatter 字段自动生成"说明文字
- 组件在文章内容末尾渲染（`article-content` 内，`<Content />` 之后）
- 6 篇已标记文章按 seriesOrder 排序，primary 优先显示在"按阅读顺序"下，secondary 在"辅助阅读"下
- 标签（pathLabel）正确显示为蓝色胶囊色

**发现 1 个遗漏：** `amazon-ai-tools-review.md`（topic: ai-search）未设置 `pathRole`/`pathLabel`/`seriesOrder`，默认归入 primary（seriesOrder=999），排在列表末尾无标签。建议补充。

## 3. 其他 learning-path 页面影响

| 文件 | articleType: learning-path? | topic | 组件渲染? | 手写 §4? | 重复? |
|---|---|---|---|---|---|
| ai-search | ✅ 是 | ai-search | ✅ 渲染（已移除手写列表） | 已替换为说明 | ✅ 无重复 |
| selection | ✅ 是 | selection | ✅ 渲染 | 有手写列表 | ❌ **重复** |
| tools | ✅ 是 | tools | ✅ 渲染 | 有手写列表 | ❌ **重复** |
| keyword | 无此字段 | keyword | ❌ 不渲染 | 有手写列表 | 无影响 |
| listing | 无此字段 | listing | ❌ 不渲染 | 有手写列表 | 无影响 |
| ppc | 无此字段 | ppc | ❌ 不渲染 | 有手写列表 | 无影响 |
| review | 无此字段 | review | ❌ 不渲染 | 有手写列表 | 无影响 |

**关键发现：** selection 和 tools 的 §4 保留手写文章列表，而 `[slug].astro` 在它们的内容末尾额外渲染自动列表，导致同一页面出现两套文章推荐。

## 4. 是否存在重复/空白/错位/死链

| 检查项 | 结果 |
|---|---|
| 重复卡片（ai-search） | ✅ 无（手写列表已替换为文字说明） |
| 重复卡片（selection） | ❌ 有（手写列表 + 自动列表共存） |
| 重复卡片（tools） | ❌ 有（手写列表 + 自动列表共存） |
| 空标题/空标签 | ✅ 无明显问题（未设置 pathLabel 的不显示标签） |
| 死链 | ✅ href 为 `/posts/{slug}/` 格式，与路由一致 |
| 错位（位置不佳） | ⚠️ 自动列表在全文末尾（§9 之后），距 §4 标题较远 |

## 5. 是否建议推广

**暂不建议。** 需先解决以下问题：

### 必须解决的问题

1. **selection/tools 重复列表**：`[slug].astro` 条件过于宽松，导致未激活 topic 也渲染自动列表。需加一道保护：只对已标记文章 topic 渲染，或增加一个激活开关（如 `pathAuto: true` frontmatter）。
2. **位置错位**：自动列表在 §9 之后，而 §4 标题写了"以下文章列表根据各文章的 frontmatter 字段自动生成"，用户期待在 §4 附近看到列表，实际在页末。

### 建议解决的问题

3. `amazon-ai-tools-review.md` 缺少 `pathRole`/`pathLabel`/`seriesOrder`。

## 6. 推广优先级

推广前需修正的问题按优先级排列：

| 优先级 | 问题 | 解决方式 |
|---|---|---|
| P0 | selection/tools 重复列表 | 在 `[slug].astro` 增加保护条件：仅当 topic 存在至少一篇有 `pathRole` 的文章时才渲染，或在 learning-path.md frontmatter 加 `pathAuto: true` |
| P1 | 自动列表位置偏离 §4 | 将 .lp-auto-section 移到 §4 附近（需要 markdown 内可插入 Astro 组件的方案，或使用 post.render 的 slots） |
| P2 | amazon-ai-tools-review 缺少字段 | 补充 frontmatter |
| P3 | 其他 5 个 topic 文章补充 frontmatter | 按 topic 逐批补充 |

## 7. 风险

- **当前风险（中）**：selection 和 tools 学习路径页面存在重复文章列表，影响用户体验和内容可信度。
- **推广风险（高）**：若不加保护直接渲染，重复列表问题会扩散到所有未激活 topic。
- **SEO 风险**：重复链接在同一页面，Pagefind 会索引两次，但影响很小（链接锚文本相同）。
- **回退风险（低）**：删除 `[slug].astro` 第 190-194 行即可完全回退。

## 8. 给 GPT 的回填摘要

> 274B 只读审计完成。ai-search 试点本身正确（6 篇文章按 order 渲染，标签正常），但 selection/tools 两个 learning-path（已设 articleType: learning-path 但未激活 pathRole 字段）在 §4 手写列表之外额外渲染了自动列表，造成重复。推广前必须修复：① 增加保护条件避免未激活 topic 渲染 ② 解决自动列表位置偏离 §4 的问题。amazon-ai-tools-review 缺少字段需补充。build 无错误。
