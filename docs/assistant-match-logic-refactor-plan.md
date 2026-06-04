# AI 阿岩助手匹配逻辑共享化重构规划

> 本文档仅做规划，不执行重构。

---

## 1. 当前问题

### 两份独立 matchTopic 逻辑

- **服务端**: `src/data/ayan-assistant-rules.ts:233-255`
  - 导出 `matchTopic` 函数，供构建时/后端逻辑使用
  - 返回值: `AssistantTopic`，默认 fallback 到 `beginner`

- **客户端**: `src/pages/ask/index.astro:123-145`
  - 内联在 `<script type="module">` 中，逻辑与服务端完全相同
  - 返回值: 本批已改为 `bestScore > 0 ? best : null`，支持无结果兜底

### 已发生过的不同步事故

| 事件 | 原因 |
|------|------|
| 176A (4943b01) | 服务端增加 strongKeywords，客户端未同步 → 线上误判 |
| 176B (9148d16) | 客户端补齐 strongKeywords → 修复 |
| 177-183 (本批) | 客户端 matchTopic 返回逻辑改为 `bestScore > 0 ? best : null`，服务端未同步（服务端不需要无结果兜底行为） |

**核心风险**: 任意规则变更（新增 topic、调整 keywords、修改评分算法）需要同时在两处修改，容易遗漏。

---

## 2. 为什么本批不直接重构

| 原因 | 说明 |
|------|------|
| 当前功能稳定 | strongKeywords 已在线上生效，5 个场景入口通过验收 |
| 体验增强优先 | 177-183 任务聚焦用户体验提升，重构是独立工作项 |
| 重构需单独 QA | 涉及构建流程变更，需验证 build 产物、客户端表现、服务端一致性 |
| 不修现有文件结构 | 当前 Astro 组件内联 script + 外部 ts 的混合模式在小型项目中是可接受的 |

---

## 3. 后续建议

### 方案 A：抽取共享评分配置（推荐）

将评分算法提取为独立的 JSON 配置文件或 TS 模块，服务端与构建时共用同一份逻辑。

**步骤**:
1. 新建 `src/data/scoring-rules.ts`，导出纯函数 `computeScore(query: string, topic: AssistantTopic): number`
2. 服务端 `matchTopic` 调用 `computeScore`
3. 构建时在 `index.astro` 中将 `computeScore` 的源码内联到客户端 script 中（通过 Astro 的构建注入或 `set:html` + 文本编码）

**优点**: 逻辑单源，变更只改一处；构建时自动同步
**缺点**: 需要修改 Astro 构建流程

### 方案 B：生成前端可用的 JSON 规则

将评分规则（关键词权重、匹配方式等）以结构化 JSON 形式嵌入 HTML，客户端用通用评分引擎消费。

```json
{
  "keywords": [
    { "topic": "review", "word": "差评", "weight": 100, "type": "strong" },
    { "topic": "review", "word": "Review", "weight": 100, "type": "strong" },
    { "topic": "listing", "word": "Listing", "weight": 1, "type": "normal" }
  ]
}
```

**优点**: 完全数据驱动，服务端和客户端用同一份数据
**缺点**: 规则表达能力受限（当前算法简单，看不出明显优势）；需要额外维护规则序列化

### 方案 C：构建时渲染 matchTopic 源码

利用 Astro 的 SSR 能力，在 `index.astro` 的 frontmatter 中将 `matchTopic` 函数体序列化为字符串，直接 `set:html` 注入到内联 script 中。

**优点**: 改动最小，不改变架构
**缺点**: 函数体序列化依赖字符串操作，不类型安全

---

## 4. 验收标准

后续重构任务完成时，需满足以下条件：

| 标准 | 说明 |
|------|------|
| 任意规则变更只改一处 | 增加 topic、修改 keywords、调整权重均只需编辑一个源文件 |
| 客户端和构建侧结果一致 | 对同一 query，浏览器端 matchTopic 返回的服务端 matchTopic 返回相同 |
| 保持无 API、无 LLM | 不引入外部依赖 |
| 保持无用户信息收集 | 不改变当前隐私承诺（纯前端匹配） |
| build 通过 | `npm run build` 0 error |
| SEO 0 fail | `npm run seo:audit` 0 fail |
| images 49/0/0/0 | `npm run images:check` 维持基线 |
| Pagefind 3 filters | 不新增索引变更 |
| 关键测试用例通过 | "差评怎么用来优化页面？" → Review，"广告 ACOS 太高" → PPC |
