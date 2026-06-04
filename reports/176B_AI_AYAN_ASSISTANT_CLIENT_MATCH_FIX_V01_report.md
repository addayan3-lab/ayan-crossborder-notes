# 176B_AI_AYAN_ASSISTANT_CLIENT_MATCH_FIX_V01

**执行时间**: 2026-06-04  
**基座 commit**: 4943b01  

---

## 执行结论

**成功**

客户端 `matchTopic` 已同步 `strongKeywords`，"差评怎么用来优化页面？" 现在正确返回 Review。全部 8 个测试样例通过，build / SEO / images 均正常。

---

## 根因说明：为什么 176A 线上未生效

### 双份 matchTopic 架构

| 位置 | 文件 | 职责 | 176A 是否更新 |
|------|------|------|-------------|
| 服务端导出 | `src/data/ayan-assistant-rules.ts` | TypeScript 类型 + 导出函数 | ✅ `strongKeywords` 数据 + `matchTopic` 均更新 |
| 客户端内联 | `src/pages/ask/index.astro` `<script>` 标签 | 浏览器实际执行的匹配 | ❌ **未更新** |

### 关键问题

- `index.astro` 内联的 `<script>` 包含独立的 `matchTopic` 函数副本（第 84-101 行）
- 这个副本只遍历 `topic.triggerKeywords`，**没有读取 `topic.strongKeywords`**
- 虽然 `strongKeywords` 数据已通过 `topicsJson` 嵌入页面，但客户端算法忽略它
- 服务端导出的 `matchTopic`（已正确更新）**不在浏览器中使用**
- 结果："差评怎么用来优化页面？" listing.优化(2) = review.差评(2)，listing 因数组在前胜出

---

## 修改文件清单

| 文件 | 修改内容 |
|------|---------|
| `src/pages/ask/index.astro` | 客户端 `matchTopic` 增加 `strongKeywords` 循环逻辑（100× 权重） |

本次不修改 `src/data/ayan-assistant-rules.ts`（176A 已完成）。

---

## 客户端匹配逻辑修复说明

### 修改前（线上运行）

```js
function matchTopic(query) {
  const q = query.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const topic of topics) {
    let score = 0;
    for (const kw of topic.triggerKeywords) {     // 只检查普通关键词
      if (q.includes(kw.toLowerCase())) {
        score += kw.length;
      }
    }
    if (score > bestScore) { bestScore = score; best = topic; }
  }
  return best || topics.find((t) => t.id === "beginner") || topics[0];
}
```

### 修改后

```js
function matchTopic(query) {
  const q = query.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const topic of topics) {
    let score = 0;
    for (const kw of topic.triggerKeywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length;
      }
    }
    for (const kw of (topic.strongKeywords || [])) {   // 新增：强意图词
      if (q.includes(kw.toLowerCase())) {
        score += kw.length * 100;                       // 100× 权重
      }
    }
    if (score > bestScore) { bestScore = score; best = topic; }
  }
  return best || topics.find((t) => t.id === "beginner") || topics[0];
}
```

### 关键设计

- **强意图词数据来自 JSON**：`topic.strongKeywords` 是从 `assistantTopics` 序列化而来，与服务端同源。修改数据文件即可同步更新两端。
- **权重参数硬编码**：100× 权重在两端各自写死。仍存在两份算法配置，但数据（关键词列表）是单源的。
- **不破坏现有展示**：仅修改 `matchTopic` 函数，`displayResult` 和 HTML 结构不变。

### 是否仍存在服务端/客户端双份逻辑

**是**。两端仍有独立的 `matchTopic` 函数。但 `strongKeywords` 数据通过 JSON 下发，修改数据文件即可自动同步。完全消除重复需要抽取共享模块并构建时内联，属于重构范畴，未在当前任务范围。

---

## 8 个测试样例结果

| # | 输入 | 本地验证结果 | 说明 |
|---|------|------------|------|
| 1 | 差评怎么用来优化页面？ | **review** ✅ | strong:差评(200) > regular:优化(2) |
| 2 | Listing 转化差怎么优化？ | **listing** ✅ | regular:Listing(7)+转化率(3)+优化(2)=12 |
| 3 | 广告 ACOS 太高怎么优化？ | **ppc** ✅ | strong:广告(200) > regular:优化(2) |
| 4 | Review 里很多质量问题怎么办？ | **review** ✅ | strong:Review(600) |
| 5 | 关键词搜索量很高但不出单怎么办？ | **keyword** ✅ | strong:搜索量(300) |
| 6 | 怎么判断一个品类能不能做？ | **selection** ✅ | strong:品类(200) + strong:能不能做(400) |
| 7 | 新手最容易踩哪些规则坑？ | **beginner** ✅ | strong:新手(200) >> regular:规则(2)。新手入门胜出，稳定可预期 |
| 8 | AI 工具到底哪些适合亚马逊？ | **ai-search** ✅ | regular:AI工具(5)+strong:AI工具(500)=505 > tools:regular:工具(2)。ai-search 胜出，稳定可预期 |

---

## 验收结果

| 检查项 | 结果 |
|--------|------|
| npm run build | ✅ 56 pages built in 2.88s |
| npm run seo:audit | ✅ 448 pass, 0 fail |
| npm run images:check | ✅ 49 / 0 / 0 / 0 |
| Pagefind filters | ✅ 3 filters |
| /ask/ 页面可构建 | ✅ `ask/index.html` 正常生成 |
| 客户端 matchTopic 支持 strongKeywords | ✅ |
| "差评怎么用来优化页面" 返回 Review | ✅ |
| 调用 API | ❌ 否 |
| 使用 LLM | ❌ 否 |
| 存储用户输入 | ❌ 否 |
| 修改文章正文 | ❌ 否 |
| commit | ❌ 否 |
| push | ❌ 否 |

---

## 下一步建议

1. **（高）部署**：提交并推送 `src/pages/ask/index.astro` 的改动（包括本批 strongKeywords 修复 + 此前遗留的 div/set:html 和 wechat 修复）。
2. **（低）去除双份算法**：将 `matchTopic` 抽取为共享模块，在 `index.astro` 前端构建时内联。当前未做，因超出本批范围且收益有限——关键词数据已单源。
