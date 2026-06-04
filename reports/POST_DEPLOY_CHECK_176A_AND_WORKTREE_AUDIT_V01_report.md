# POST_DEPLOY_CHECK_176A_AND_WORKTREE_AUDIT_V01

**执行时间**: 2026-06-04  
**目标 commit**: 4943b01  
**部署 URL**: https://amz.hao1234.top/ask/

---

## 执行结论

**失败（线上验证未通过）**

176A 的 `strongKeywords` 数据已部署，但客户端 `matchTopic` 函数未更新，导致"差评怎么用来优化页面？"在线上仍返回 Listing。这是部署 bug，需要修复。

---

## 第一部分：线上验证

### /ask/ 页面检查

| 检查项 | 结果 |
|--------|------|
| 页面 HTTP 200 | ✅ |
| 输入框可用 | ✅ |
| 预设按钮可用 | ✅ — 5 个预设 |
| 隐私声明 | ✅ — "你的输入仅在你自己的浏览器中处理" |
| 无 API / LLM / 后端调用 | ✅ — 源码确认纯前端 |

### 5 个测试问题匹配结果

使用线上实际运行的客户端 `matchTopic` 函数模拟：

| # | 输入 | 线上结果 | 期望 | 状态 |
|---|------|---------|------|------|
| 1 | 差评怎么用来优化页面？ | listing | review | ❌ |
| 2 | Listing 转化差怎么优化？ | listing | listing | ✅ |
| 3 | 广告 ACOS 太高怎么优化？ | ppc | ppc | ✅ |
| 4 | 关键词搜索量很高但不出单怎么办？ | keyword | keyword | ✅ |
| 5 | 怎么判断一个品类能不能做？ | selection | selection | ✅ |

### 关键发现：修复未在线上生效

**根因**：`src/data/ayan-assistant-rules.ts` 中有两个 `matchTopic`：
1. **服务端导出函数** `matchTopic`（在 `ayan-assistant-rules.ts` 中）— ✅ 已更新，支持 `strongKeywords`
2. **客户端函数** `matchTopic`（在 `src/pages/ask/index.astro` 的 `<script>` 中）— ❌ **未更新**，仍使用旧算法

4943b01 只更新了前者。后者是浏览器实际执行的代码，仍然只检查 `triggerKeywords`，忽略 `strongKeywords`。

**结果**："差评怎么用来优化页面？" 得分：listing.优化(2) = review.差评(2)，listing 因数组在前胜出。

### 其他返回结构验证（源码分析）

| 返回项 | 状态 |
|--------|------|
| 显示问题类型（label） | ✅ |
| 建议步骤（steps） | ✅ |
| 推荐文章（articles） | ✅ — 可点击链接 |
| 推荐模板（resources） | ✅ — 可点击链接 |
| 推荐公开课（openClasses） | ✅ — 可点击链接 |
| 微信关键词 | ⚠️ — HEAD 版本有 bug（`topic.wechatHook` 不存在），工作区已修复但未部署 |

---

## 第二部分：工作区未提交文件审计

### git status 清单

```
 M src/pages/ask/index.astro
?? docs/internal-linking-rules.md
?? docs/next-nav-tasks-167-175-plan.md
?? reports/160-166_REMAINING_ARTICLE_NAV_PLANNING_V01_report.md
?? reports/COMMIT_AND_PUSH_*
?? reports/POST_DEPLOY_CHECK_*
?? reports/POST_DEPLOY_INDEXNOW_093_095_V01_report.md
```

### 逐文件审计

#### 1. `src/pages/ask/index.astro` — 已修改（M）

| 项目 | 内容 |
|------|------|
| Diff 摘要 | 2 处变更 |
| 变更 1 | `<script type="application/json">{topicsJson}</script>` → `<div style="display:none" set:html={topicsJson}></div>` |
| 变更 2 | `if (topic.wechatKeyword) { ... topic.wechatHook }` → `if (firstRes.wechatHook) { ... firstRes.wechatHook }` |
| 是否属于 176A | ❌ — 两处均为 167-175 原始实现的 bug 修复 |
| 是否应保留 | ✅ — 修复了 JSON 嵌入和微信关键词显示的 bug |
| 缺什么 | 仍需添加 `strongKeywords` 到客户端 `matchTopic` 才能完成 176A 修复 |

#### 2. `docs/internal-linking-rules.md` — 未跟踪（??）

| 项目 | 内容 |
|------|------|
| 大小 | 2.8 KB, 95 行 |
| 内容 | 文章内部链接规则说明 |
| 是否已提交 | ❌ — 从未进入 git 历史 |
| 来源 | 160-166 导航规划的产物 |
| 建议 | 保留到下一批，可考虑提交 |

#### 3. `docs/next-nav-tasks-167-175-plan.md` — 未跟踪（??）

| 项目 | 内容 |
|------|------|
| 大小 | 3.9 KB, 117 行 |
| 内容 | 下一批导航任务规划 |
| 是否已提交 | ❌ — 从未进入 git 历史 |
| 来源 | 160-166 导航规划的产物 |
| 建议 | 保留到下一批，可考虑提交 |

#### 4. `reports/COMMIT_AND_PUSH_*.md` — 14 个文件

| 项目 | 内容 |
|------|------|
| 范围 | 从 093 到 176A 的历史提交报告 |
| 是否已提交 | ❌ — 从未进入 git 历史 |
| 建议 | 归档到 `reports/archive/deploy/`，保留历史记录但不污染工作区 |

#### 5. `reports/POST_DEPLOY_*.md` — 3 个文件

| 项目 | 内容 |
|------|------|
| 文件 | POST_DEPLOY_CHECK_159, POST_DEPLOY_CHECK_167_175, POST_DEPLOY_INDEXNOW_093_095 |
| 是否已提交 | ❌ — 从未进入 git 历史 |
| 建议 | 归档到 `reports/archive/deploy/` |

#### 6. `reports/160-166_REMAINING_ARTICLE_NAV_PLANNING_V01_report.md`

| 项目 | 内容 |
|------|------|
| 是否已提交 | ❌ |
| 建议 | 归档到 `reports/archive/deploy/` |

---

## 第三部分：处理建议汇总

| 文件 | 建议操作 |
|------|---------|
| `src/pages/ask/index.astro` | **保留 + 补充** — 保留现有 bugfix，再增加 `strongKeywords` 客户端匹配逻辑，作为 176B 提交 |
| `docs/internal-linking-rules.md` | **保留** — 规划文档，后续可提交到仓库 |
| `docs/next-nav-tasks-167-175-plan.md` | **保留** — 规划文档，后续可提交到仓库 |
| `reports/COMMIT_AND_PUSH_*.md` (14 个) | **归档** → `reports/archive/deploy/` |
| `reports/POST_DEPLOY_*.md` (3 个) | **归档** → `reports/archive/deploy/` |
| `reports/160-166_*_report.md` | **归档** → `reports/archive/deploy/` |

---

## 边界遵守确认

| 约束 | 状态 |
|------|------|
| 修改代码 | ❌ 否 |
| 修改文章正文 | ❌ 否 |
| 新增文章 | ❌ 否 |
| 修改 package.json | ❌ 否 |
| 修改部署配置 | ❌ 否 |
| commit | ❌ 否 |
| push | ❌ 否 |
| 接入 API | ❌ 否 |
| 使用 LLM | ❌ 否 |
| 调用 IndexNow | ❌ 否 |

---

## 下一步建议

1. **（高）修复客户端 matchTopic** — 在 `src/pages/ask/index.astro` 的客户端 `<script>` 中，给 `matchTopic` 增加 `strongKeywords` 循环逻辑（与 `ayan-assistant-rules.ts` 中的服务端版本一致）。建议作为 176B 任务。
2. **（中）一并提交 index.astro 的现有 bugfix** — 将未提交的 2 处修复（div/set:html、wechatHook）与 strongKeywords 客户端更新一起提交。
3. **（低）归档历史报告** — 将未跟踪的 COMMIT_AND_PUSH 和 POST_DEPLOY 报告移至 `reports/archive/deploy/`，保持工作区整洁。
