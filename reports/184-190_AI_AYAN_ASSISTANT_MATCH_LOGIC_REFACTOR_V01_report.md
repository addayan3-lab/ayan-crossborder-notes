# 184-190_AI_AYAN_ASSISTANT_MATCH_LOGIC_REFACTOR_V01 执行报告

**执行时间**: 2026-06-04  
**目标**: 消除服务端和客户端 matchTopic 评分算法的双副本风险  

---

## 执行结论

**成功** ✅

评分算法已提取到 `src/lib/ayan-assistant-match.ts` 作为唯一数据源。服务端通过 import 使用，客户端通过 Astro build-time injection (`computeScoreForTopic.toString()` → `<script is:inline set:html=...>`) 注入。12 个测试样例全部一致。

---

## 原双副本风险说明

| 位置 | 文件 | 角色 |
|------|------|------|
| 服务端 | `src/data/ayan-assistant-rules.ts:233-255` | 导出 `matchTopic()`，供构建时/后端逻辑使用 |
| 客户端 | `src/pages/ask/index.astro:123-145` | 内联在 `<script type="module">` 中的 `matchTopic()` |

**已发生过的事故**: 176A (4943b01) 服务端增加 strongKeywords，客户端未同步 → 线上误判。176B 才补齐。

**两个副本的实际差异**: 评分循环代码完全一致（strongKeywords 100× 权重）。唯一的差异是 fallback 行为：服务端强制 fallback 到 `beginner`，客户端返回 `null`（触发无结果兜底 UI）。这个差异是设计上的，不是意外的 drift。

---

## 最终采用的重构方案

**方案**: 提取 `computeScoreForTopic` 纯函数到共享模块，通过 Astro build-time `toString()` 注入到客户端。

**关键设计**:

1. **评分算法单源**: `src/lib/ayan-assistant-match.ts` 中的 `computeScoreForTopic` 是唯一的评分逻辑。所有评分细节（权重、keyword tiers）只能改这里。

2. **服务端使用方式**: `ayan-assistant-rules.ts` 通过 `import { computeScoreForTopic }` 使用。`matchTopic` 函数体简化，但保留顶层循环 + fallback 到 beginner。

3. **客户端注入方式**: `index.astro` 的 frontmatter 在 build time 执行 `computeScoreForTopic.toString()`，得到编译后的纯 JS 函数源码。通过 `<script is:inline set:html={...}>` 注入到 HTML：
   ```html
   <script is:inline>window.computeScoreForTopic = function(query, keywords, strongKeywords) { ... };</script>
   ```
   不涉及 eval、new Function 或远程脚本。

4. **客户端使用方式**: 模块脚本中 `matchTopic` 调用 `window.computeScoreForTopic(q, topic.triggerKeywords, topic.strongKeywords || [])`。

**未选择的方案**: 做通用 `findBestMatch` 函数（循环逻辑过于简单，不值得共享）；改构建流程注入全量算法（引入不必要复杂度）；双副本加注释（不解决 drift 风险）。

---

## 修改文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/lib/ayan-assistant-match.ts` | **新增** | 评分算法唯一数据源，导出纯函数 `computeScoreForTopic` |
| `src/data/ayan-assistant-rules.ts` | 修改 | 导入并调用共享函数，简化 `matchTopic` |
| `src/pages/ask/index.astro` | 修改 | frontmatter 注入函数源码，模块脚本使用 `window.computeScoreForTopic` |

---

## 是否仍存在双份 matchTopic 逻辑

**算法部分（评分循环）：否** ✅

`computeScoreForTopic` 只在 `src/lib/ayan-assistant-match.ts` 中存在一次。服务端和客户端都调用同一份编译后的函数源码。

**matchTopic 顶层循环：是（可接受的）**

服务端和客户端各自保留了一个极简的 `matchTopic` 包装函数，仅包含：
- 遍历 topics
- 调用 `computeScoreForTopic`
- 找最高分
- 返回结果（服务端 fallback beginner，客户端返回 null）

这个循环逻辑极其简单（10 行），变更概率极低，不值得为它增加构建复杂度。任何对评分逻辑的修改（权重、keyword 层级、新匹配维度）都只需改 `src/lib/ayan-assistant-match.ts`。

---

## 12 个测试样例结果

| # | 问题 | 客户端 | 服务端 | 结果 |
|---|------|--------|--------|------|
| 1 | 我是亚马逊新手，应该先学什么？ | beginner | beginner | ✅ PASS |
| 2 | 我已经有产品，想判断还能不能做 | selection | selection | ✅ PASS |
| 3 | 广告 ACOS 太高，应该怎么优化？ | ppc | ppc | ✅ PASS |
| 4 | Listing 有流量但转化差，应该先改哪里？ | listing | listing | ✅ PASS |
| 5 | 差评怎么用来优化页面和产品？ | review | review | ✅ PASS |
| 6 | 差评怎么用来优化页面？ | review | review | ✅ PASS |
| 7 | Review 里很多质量问题怎么办？ | review | review | ✅ PASS |
| 8 | 关键词搜索量很高但不出单怎么办？ | keyword | keyword | ✅ PASS |
| 9 | AI 工具到底哪些适合亚马逊？ | ai-search | ai-search | ✅ (见注1) |
| 10 | 新手最容易踩哪些规则坑？ | beginner | beginner | ✅ (见注2) |
| 11 | asdfghjkl | null | beginner | ✅ (见注3) |
| 12 | Listing 怎么优化？ | listing | listing | ✅ PASS |

**注 1**: "AI 工具到底哪些适合亚马逊？" → **ai-search**。"AI 工具"在 ai-search.strongKeywords 得 400 分，tools 仅从"工具"得 2 分。结果稳定。

**注 2**: "新手最容易踩哪些规则坑？" → **beginner**。"新手"在 beginner.strongKeywords 得 200 分，platform-rules 仅从"规则"得 2 分。"新手"是 query 中的强信号词。结果稳定。

**注 3**: 客户端返回 `null`（触发 UI 兜底），服务端返回 `beginner`（设计差异）。一致: `bestScore === 0 → null`。

---

## 无结果兜底回归测试

| 检查项 | 输入: "asdfghjkl" | 结果 |
|--------|-------------------|------|
| bestScore 为 0 时返回 null | `clientMatchTopic` → null | ✅ |
| 不静默返回 beginner | 客户端返回 null，显示 UI 兜底 | ✅ |
| 兜底文案 | "我还不能确定你的问题属于哪一类" | ✅ |
| 5 个方向按钮 | 关键词 / Listing / PPC 广告 / Review 差评 / 选品 | ✅ |
| 方向按钮可触发匹配 | 每个带 data-ask trigger 文本 | ✅ |

---

## 验收结果

| 检查项 | 结果 |
|--------|------|
| build | ✅ 56 pages built in 3.01s |
| SEO | ✅ 448 pass, 0 fail |
| images:check | ✅ 49 / 0 / 0 / 0 |
| Pagefind filters | ✅ 仍为 3（未变更） |
| 12 个测试样例客户端-服务端一致 | ✅ 12/12 |
| 场景入口仍然可用 | ✅ |
| 无结果兜底仍然可用 | ✅ |
| 调用 API | ❌ 否 |
| 使用 LLM | ❌ 否 |
| 存储用户输入 | ❌ 否 |
| 修改文章正文 | ❌ 否 |
| 新增普通文章 | ❌ 否 |
| commit | ❌ 否 |
| push | ❌ 否 |
| 修改 package.json | ❌ 否 |

---

## 下一步建议

1. **部署**: 上线后验证 /ask/ 页面的正常工作和 5 个场景入口
2. **以后改匹配逻辑**: 任何评分参数变更只需编辑 `src/lib/ayan-assistant-match.ts`，不需要同步其他文件
3. **不归本批**: 继续关注 docs/assistant-match-logic-refactor-plan.md 中的三个方案，当前方案（方案 C 变体）已足够稳定
