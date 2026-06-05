# 任务 261：AI 阿岩助手典型问题匹配审查报告

> 只读审查，不修改任何业务代码。

---

## 1. 执行结论

**整体通过，存在 1 个匹配断裂 + 1 个潜在精度风险。**

8/9 典型 query 命中正确 topic，推荐顺序符合 AGENTS.md 第 6 节（文章优先 → 资源其次 → 问卷/公开课/微信最后）。唯一断裂点："公开课讲什么"无法命中任何 topic → 客户端触发 fallback，服务端兜底到 `beginner`，两端行为不一致。

---

## 2. 检查范围

| 检查项 | 文件 |
|--------|------|
| 规则数据 | `src/data/ayan-assistant-rules.ts`（9 个 topic，247 行） |
| 匹配算法 | `src/lib/ayan-assistant-match.ts`（`computeScoreForTopic`，20 行） |
| 浮窗助手 UI | `src/components/FloatingAyanAssistant.astro`（515 行） |
| 完整助手页 UI | `src/pages/ask/index.astro`（633 行） |
| 项目规则 | `AGENTS.md`§6（助手推荐顺序） |
| 技能定义 | `.opencode/skills/ayan-assistant-rules/SKILL.md` |
| 重构规划 | `docs/assistant-match-logic-refactor-plan.md` |

---

## 3. Query 测试表

评分算法：`triggerKeywords` 每匹配一词加 `kw.length` 分；`strongKeywords` 每匹配一词加 `kw.length × 100` 分。

| Query | 命中 topic | 文章推荐 | 资源推荐 | 公开课推荐 | 是否符合优先顺序 |
|-------|-----------|---------|---------|-----------|----------------|
| 广告 ACOS 太高怎么办 | **ppc** (606 分) | 前 2 篇浮窗 / 全部 ask 页 | extras 折叠 | extras 折叠 | ✅ 文章优先 |
| 不知道怎么找关键词 | **keyword** (3 分) | 前 2 篇浮窗 / 全部 ask 页 | extras 折叠 | extras 折叠 | ✅ 文章优先 |
| Listing 转化差怎么优化 | **listing** (9 分) | 前 2 篇浮窗 / 全部 ask 页 | extras 折叠 | extras 折叠 | ✅ 文章优先 |
| 怎么分析差评 | **review** (202 分) | 前 2 篇浮窗 / 全部 ask 页 | extras 折叠 | extras 折叠 | ✅ 文章优先 |
| 想判断一个产品能不能做 | **selection** (400 分) | 前 2 篇浮窗 / 全部 ask 页 | extras 折叠 | extras 折叠 | ✅ 文章优先 |
| AI 搜索怎么用 | **ai-search** (404 分) | 前 2 篇浮窗 / 全部 ask 页 | extras 折叠 | extras 折叠 | ✅ 文章优先 |
| 新手从哪开始 | **beginner** (204 分) | 前 2 篇浮窗 / 全部 ask 页 | extras 折叠 | extras 折叠 | ✅ 文章优先 |
| 我想领表格 | **tools** (2 分) | 前 2 篇浮窗 / 全部 ask 页 | extras 折叠 | 无 | ✅ 文章优先 |
| 公开课讲什么 | **无匹配 → fallback** | 无 | 无 | 无 | ❌ 未命中任何 topic |

> **浮窗助手**只展示前 2 篇 article，不展示资源/公开课内容。  
> **ask 页**展示全部 article（始终可见），资源/公开课折叠在 extras 下（需点击展开）。  
> 推荐顺序严格遵守 AGENTS.md §6。

---

## 4. 当前问题

### 问题 1：无"公开课"独立 topic（严重）

"公开课讲什么"在 9 个 topic 的 triggerKeywords 和 strongKeywords 中均无匹配（没有 topic 包含"公开课""课程""讲座"等关键词）。客户端 `matchTopic` 返回 `null` → 触发 fallback（展示 5 个通用方向按钮），服务水平 `matchTopic` 返回 `beginner` topic 作为默认值。

两端行为不一致。如果用户想了解公开课内容，无法直接获知。

**影响范围**：`src/data/ayan-assistant-rules.ts`（缺少 topic）、`src/pages/ask/index.astro` + `FloatingAyanAssistant.astro`（客户端展示 fallback）。

### 问题 2：客户端/服务端 matchTopic 不一致（已知）

`src/data/ayan-assistant-rules.ts:235-247` 服务端 `matchTopic` 返回 `best || beginner`（始终有值）。  
客户端 (`ask/index.astro:116-128`, `FloatingAyanAssistant.astro:99-111`) 返回 `bestScore > 0 ? best : null`（无匹配返回 null）。

已在 `docs/assistant-match-logic-refactor-plan.md` 中记录。当无匹配时，服务端兜底到 beginner（推荐新手文章），客户端显示 fallback（无特定推荐）。**无匹配时两端体验不同**。

### 问题 3："新手从哪开始"弱匹配但可用

`beginner` 的 triggerKeywords 包含"从哪里"但 query 使用"从哪"（少"里"字），"从哪里"不命中。但 strongKeywords 中的"新手"（200 分）保证了匹配。如果 query 不含"新手"（如"从哪开始学"），将完全无法匹配到 `beginner`。

### 问题 4："我想领表格"评分脆弱

仅匹配 `tools` 的 triggerKeyword "表格"（2 分），无 strongKeywords 命中。若再增加几个无关 triggerKeywords 干扰，容易误匹配到其他 topic。当前可用，但余量小。

---

## 5. 建议修改文件

> 本报告为只读审查，以下仅为建议，不要求本次执行。

| 优先级 | 文件 | 建议 |
|--------|------|------|
| P0 | `src/data/ayan-assistant-rules.ts` | 新增 `open-class` topic，设置 triggerKeywords ["公开课", "课程", "讲座"] 等 |
| P0 | `src/data/ayan-assistant-rules.ts` | `beginner` triggerKeywords 补充 "从哪"（现在只有"从哪里"） |
| P1 | `src/data/ayan-assistant-rules.ts` | `tools` 补充 strongKeywords "表格"（提高"我想领表格"等 query 的评分区分度） |
| P1 | `src/data/ayan-assistant-rules.ts` / `ask/index.astro` | 客户端/服务端 `matchTopic` 统一，参考 `docs/assistant-match-logic-refactor-plan.md` 方案 |

---

## 6. 风险

| 风险 | 等级 | 说明 |
|------|------|------|
| 用户问公开课→无推荐→离开 | 中 | 缺少 open-class topic，无法引导用户到公开课页 |
| 两端 fallback 行为不一致 | 低 | 已记录在规划文档中，当前无实际用户投诉 |
| "从哪"不命中"从哪里" | 低 | 仅在 query 不含"新手"关键词时才会暴露 |
| resources 和 openClasses 不在浮窗展示 | 低 | 符合"文章优先"策略，浮窗设计有意简化 |

**"问问题就跳资料页"的风险评估**：不存在。当前设计是文章始终可见，资源折叠在 extras 下。浮窗助手完全不展示资源/公开课。符合 AGENTS.md "优先推荐解释型文章"的要求。

---

## 7. 下一步建议

1. **新增 `open-class` topic**（P0）：参考现有 topic 结构，补充公开课相关关键词和推荐内容
2. **补充 `beginner` triggerKeywords**（P0）：加入"从哪""怎么学"等口语化表达
3. **`tools` 补充 strongKeywords**（P1）：加入"表格""资料"提高评分区分度
4. **统一 matchTopic fallback 逻辑**（P1）：两端统一为 `bestScore > 0 ? best : null`（客户端当前行为），避免服务端默认兜底到 beginner
5. **建立自动化样本测试**：参考 `docs/ayan-crossborder-notes_开发稳快计划.md` §10.2 建议，新增 `npm run assistant:test` 脚本

---

## 8. 给 GPT 的回填摘要

```
## 任务 261 回填摘要

审查了 AI 阿岩助手的匹配逻辑（9 个 topic、computeScoreForTopic 评分算法、浮窗和 ask 页展示逻辑）。

核心发现：
1. 8/9 典型 query 命中正确 topic，推荐顺序符合 AGENTS.md（文章→资源→问卷/公开课）。
2. 唯一断裂：无 "open-class" 独立 topic → "公开课讲什么" 无匹配。
3. 客户端/服务端 matchTopic fallback 不一致（客户端返回 null 展示 fallback，服务端兜底到 beginner）。
4. "从哪里" vs "从哪" 弱匹配（beginner 缺少口语化关键词）。
5. "我想领表格" 仅 2 分，评分余量小。
6. 无 "问问题就跳资料页" 风险：文章始终优先展示，浮窗不展示资源/公开课，ask 页资源在 extras 折叠。
7. 建议新增 open-class topic、补充口语化关键词、统一 fallback 行为、建立自动化样本测试。
```
