# 176A_AI_AYAN_ASSISTANT_MATCHING_PRIORITY_FIX_V01

**执行时间**: 2026-06-04  
**目标 commit**: d417cb8  

---

## 执行结论

**成功**

全部 10 个测试样例通过，build / SEO / images / Pagefind 均正常。

---

## 原因分析：为什么"差评怎么用来优化页面"误判

### 匹配算法（修改前）

当前 `matchTopic` 函数按关键词长度累计打分，最高分者胜出：

```
query = "差评怎么用来优化页面？"
listing:  "优化" → score += 2 (len=2)
review:   "差评" → score += 2 (len=2)
→ 得分相同 (2 vs 2)，listing 因在 topics 数组中排在 review 之前胜出
```

### 根因

1. "优化" 是 listing 的 `triggerKeywords` 之一
2. "差评" 是 review 的 `triggerKeywords` 之一
3. 两者得分相同时，靠数组顺序决定胜负
4. 不存在"强意图词"概念——所有关键词权重相同

---

## 修改文件清单

| 文件 | 修改内容 |
|------|---------|
| `src/data/ayan-assistant-rules.ts` | 接口新增 `strongKeywords: string[]`；9 个 topic 各添加 `strongKeywords`；`matchTopic` 增加 strong 权重逻辑 |

---

## 匹配规则调整说明

### 新增 `strongKeywords` 字段

每个 topic 增加了强意图关键词数组，命中时权重乘 100 倍，确保强意图词压倒泛词。

| Topic | strongKeywords |
|-------|---------------|
| keyword | `词表`, `搜索量`, `清洗`, `出单词`, `找词` |
| listing | `五点`, `标题`, `A+`, `文案` |
| ppc | `PPC`, `ACOS`, `TACOS`, `搜索词报告`, `否词`, `预算`, `竞价`, `报表`, `SP`, `广告` |
| review | `Review`, `差评`, `评价`, `好评`, `评论`, `Q&A`, `QA`, `痛点` |
| selection | `选品`, `竞品`, `市场容量`, `能不能做`, `品类`, `痛点反推` |
| ai-search | `AI 搜索`, `Rufus`, `Alexa`, `AI 工具`, `人工智能` |
| tools | `模板`, `SOP`, `检查表`, `资料包` |
| platform-rules | `违规`, `合规`, `索评`, `侵权`, `变体` |
| beginner | `新手`, `入门`, `0基础`, `零基础` |

### 关键设计

- **"优化" 不在任何 topic 的 strongKeywords 中** → 不会压过差评、Review、ACOS 等强意图词
- **权重公式**：`score = Σ(regular_kw.len) + Σ(strong_kw.len × 100)`
- **强意图词始终优先**：即使"差评怎么用来优化页面"同时匹配 listing.优化(2分) 和 review.差评(200分)，review 胜出
- **不改现有 triggerKeywords**：不影响已有的弱匹配路径

### 边界用例验证

| 输入 | 机制 | 结果 |
|------|------|------|
| Listing 怎么优化 | listing.优化(2) > 无竞争 | listing ✅ |
| 广告怎么优化 | ppc.广告(200) >> listing.优化(2) | ppc ✅ |
| 关键词怎么优化 | keyword.关键词(3) > listing.优化(2) | keyword ✅ |

---

## 10 个测试样例结果

| # | 输入 | 期望 | 实际 | 状态 |
|---|------|------|------|------|
| 1 | 新品 PPC 第一周怎么开？ | ppc | ppc | ✅ |
| 2 | Listing 五点怎么写？ | listing | listing | ✅ |
| 3 | 差评怎么用来优化页面？ | review | review | ✅ |
| 4 | 怎么判断一个品类能不能做？ | selection | selection | ✅ |
| 5 | AI 工具到底哪些适合亚马逊？ | ai-search | ai-search | ✅ |
| 6 | 新手最容易踩哪些规则坑？ | beginner | beginner | ✅ |
| 7 | 广告 ACOS 太高怎么优化？ | ppc | ppc | ✅ |
| 8 | Review 里很多质量问题怎么办？ | review | review | ✅ |
| 9 | Listing 转化差怎么优化？ | listing | listing | ✅ |
| 10 | 关键词搜索量很高但不出单怎么办？ | keyword | keyword | ✅ |

注：#6 期望值为 `beginner`（`platform-rules` 或 `beginner` 均可，当前因"新手"命中 beginner 的 `strongKeywords` 而稳定选择 beginner）。

---

## 验收结果

| 检查项 | 结果 |
|--------|------|
| npm run build | ✅ 通过 — 56 pages built in 2.30s |
| npm run seo:audit | ✅ 448 pass, 0 fail |
| npm run images:check | ✅ 49 / 0 / 0 / 0 |
| Pagefind filters | ✅ 3 filters (topic, stage, intent) |
| /ask/ 页面可构建 | ✅ `ask/index.html` 正常生成 |
| 调用 API | ❌ 否 |
| 使用 LLM | ❌ 否 |
| 存储用户输入 | ❌ 否 |
| 修改文章正文 | ❌ 否 |
| commit | ❌ 否 |
| push | ❌ 否 |

---

## 下一步建议

1. **无** — 当前修复已解决歧义问题，全部测试通过。后续如有更多歧义用例，可继续扩充 `strongKeywords`。
