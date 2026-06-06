# 报告 274C —— 学习路径试点保护与位置修复

## 1. 执行结论

✅ 修复完成。采用方案 A（显式守护字段 `learningPathAutoArticles`），仅 ai-search 学习路径启用自动文章列表渲染，其他 learning-path 页面不再受影响。

## 2. 修复了 274B 哪些问题

| 274B 问题 | 状态 |
|---|---|
| selection/tools 重复列表（P0） | ✅ 已修复 |
| 自动列表位置偏离 §4（P1） | ⚠️ 已通过文案处理（见第 6 节） |
| amazon-ai-tools-review 缺少字段（P2） | ✅ 已修复 |
| 其他 topic 缺少 frontmatter（P3） | ⏸ 未处理（不在本任务范围） |

## 3. 最终采用的方案

**方案 A（显式守护字段）**。

不采用方案 B（回退到手写）是因为组件已开发和测试完成，回退是倒退。不采用方案 C（MDX）是因为项目未引入 MDX 依赖，且 AGENTS.md 禁止引入重型依赖。

## 4. 是否仍自动渲染 ai-search

✅ 是。`learningPathAutoArticles: true` 仅存在于 ai-search-learning-path.md 的 frontmatter 中，其余学习路径无此字段，故不会触发渲染。

## 5. selection/tools 是否已不再被影响

✅ 已保护。`[slug].astro` 条件从 `post.data.articleType === "learning-path"` 改为 `post.data.learningPathAutoArticles === true`。

selection-learning-path.md 和 tools-learning-path.md 的 frontmatter 未做任何修改，保留了 `articleType: learning-path`。它们的 §4 手写列表正常工作，无自动列表干扰。

## 6. 自动列表位置问题如何处理

位置问题（§4 预期 vs 页面底部实际）**无法通过纯 Astro + .md 方案完美解决**，原因：

- Astro 的 `<Content />` 将整个 markdown 渲染为一个不透明的 HTML 块，无法在其中插入组件
- 引入 MDX（允许在 markdown 中嵌入组件）会增加构建复杂度和依赖，违反"禁止引入重型依赖"规则
- 将组件渲染到 §4 附近需要重构文章模板（如自定义 renderer 或 split 渲染），属于大规模重构

**本次处理方式**：更新 §4 文案，从"以下文章列表根据各文章的 frontmatter 字段自动生成"改为"主专题文章卡片列表见本页底部（字段自动生成，按推荐阅读顺序排列）"。明确了列表的实际位置，避免读者在 §4 附近找不到列表的困惑。

未来如需精确定位到 §4，建议：
- 引入 MDX（需评估依赖影响）
- 或将学习路径页改用 Astro page 而非 markdown 生成

## 7. amazon-ai-tools-review.md 如何处理

确认属于 ai-search 学习路径，补充了：
- `seriesOrder: 7`（排在 6 篇已标记文章之后）
- `pathRole: secondary`（属于辅助阅读，非必读主线）
- `pathLabel: "工具评测"`

判断依据：该文 topic=ai-search，内容为 AI 工具评测与选择标准，适合作为学习路径中"工具理解"阶段的辅助参考。

## 8. 修改文件（5 文件修改，0 新增）

| 文件 | 改动 |
|---|---|
| `src/pages/articles/[slug].astro` | 渲染条件：`articleType === "learning-path"` → `learningPathAutoArticles === true`（1 行） |
| `src/content/posts/ai-search-learning-path.md` | frontmatter 加 `learningPathAutoArticles: true`；§4 文案明确"见本页底部"（2 处） |
| `src/content/posts/amazon-ai-tools-review.md` | 补 `seriesOrder: 7` `pathRole: secondary` `pathLabel: 工具评测`（3 字段） |
| `docs/content-orchestration-fields.md` | 字段表增加 `learningPathAutoArticles` 定义（1 行） |

selection-learning-path.md 和 tools-learning-path.md 未修改。

## 9. 验证结果

- `npm run build`：62 pages，0 错误
- `npm run seo:audit`：496 pass，0 fail
- `npm run images:check`：49 items，0 issues
- `reports/seo-audit-report.md`：已 restore 到 HEAD（非本任务修改）

## 10. 是否建议继续推广

**暂不建议全量推广**，因为位置问题未彻底解决。但可在以下条件满足后推广：

1. 引入 MDX 或改用 Astro page 实现精确定位到 §4
2. 或接受页底定位作为约定，并统一各 topic 的 frontmatter 字段

推广优先级：keyword > listing > ppc > review > selection > tools（按读者基数排序）。

## 11. 给 GPT 的回填摘要

> 274C 完成：采用方案 A（`learningPathAutoArticles` 守护字段）修复 274B 审计发现的问题。`[slug].astro` 条件从 `articleType === "learning-path"` 改为 `learningPathAutoArticles === true`，仅 ai-search 试点页面渲染自动列表。selection/tools 不再受影响。§4 文案改为"见本页底部"明确位置。amazon-ai-tools-review 补了 pathRole/pathLabel/seriesOrder。build/seo/images 全通过。位置精确定位需 MDX，暂未引入。
