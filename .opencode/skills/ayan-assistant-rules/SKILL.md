# ayan-assistant-rules

**用途：** AI 阿岩助手规则维护 — 话题分类、匹配关键词、推荐顺序、客户端/服务端一致性。不修改文章内容和页面布局。

## 前置检查

- [ ] 先读 `AGENTS.md` 第 6 节 AI 阿岩助手规则
- [ ] 先读 `docs/assistant-match-logic-refactor-plan.md`（如存在）
- [ ] 确认当前助手规则数据位置（`src/data/ayan-assistant-rules.ts`）
- [ ] 确认客户端匹配函数位置（`src/lib/ayan-assistant-match.ts`）

## 规则

### 技术约束

- 当前阶段无 LLM、无 API、无用户数据收集
- 不把 AI 阿岩助手改成付费 API 方案
- 不引入外部模型调用

### 话题分类

分类顺序（在匹配逻辑中体现优先级）：

1. 关键词
2. Listing
3. 广告 PPC
4. Review
5. 选品
6. AI 搜索
7. 工具模板
8. 平台规则
9. 新手入门

### 推荐顺序

1. 推荐解释型文章（`articles`）
2. 推荐资源模板（`resources`）
3. 推荐公开课（`openClasses`）
4. 最后才引导问卷、微信承接

### 修改后检查

- [ ] 新增或修改的 `triggerKeywords`/`strongKeywords` 不会误匹配
- [ ] 用典型 query 回归，至少验证以下场景：

  | Query | 期望 topic |
  |-------|-----------|
  | "广告 ACOS 太高怎么办" | ppc |
  | "不知道怎么找关键词" | keyword |
  | "Listing 转化差怎么优化" | listing |
  | "怎么分析差评" | review |
  | "想判断一个产品能不能做" | selection |
  | "AI 搜索怎么用" | ai-search |
  | "新手从哪开始" | beginner |
- [ ] 浮窗助手（`FloatingAyanAssistant.astro`）和 `/ask/` 页行为一致
- [ ] 无 API 调用泄漏
- [ ] `npm run build` 通过

## 适用任务

- 新增/修改助手 topic
- 修改 strongKeywords/triggerKeywords
- 修复误判
- 重构匹配逻辑
- 浮窗助手和 `/ask/` 页一致性检查
