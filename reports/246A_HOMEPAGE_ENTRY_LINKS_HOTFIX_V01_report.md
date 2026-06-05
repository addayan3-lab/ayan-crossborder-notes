# 246A_HOMEPAGE_ENTRY_LINKS_HOTFIX_V01 报告

## 执行结论：成功

## 修改文件清单

| 文件 | 变更 |
|------|------|
| src/layouts/BaseLayout.astro | 移除 blanket querySelectorAll("a, button") 文本匹配代码块；移除 unused leadTexts 数组 |

## 变更详情

### BaseLayout CTA 脚本

**移除：**
- `leadTexts` 数组: `["领取资料", "立即领取", "领取 AI 运营资料包", "领取AI运营资料包", "领取资料包"]`
- `document.querySelectorAll("a, button")` 文本匹配循环 — 该代码块会按文本内容将任何包含"领取资料"/"立即领取"的链接重写为 /lead/，存在误改 /ask/、/survey/、/resources/、/open-class/ 等页面入口链接的风险

**保留：**
- `document.querySelectorAll("[data-lead-cta]")` 属性匹配 — 仅 header 的"领取资料"按钮（`<a data-lead-cta href="/lead/">`）有此属性
- `document.querySelectorAll("input")` 占位符匹配 — 仅影响输入框 readonly + 点击跳转，不影响链接

**效果：** CTA 脚本仅通过 `[data-lead-cta]` 属性（安全 opt-in）生效，不再存在误改写链接的风险。

### 首页入口审计

| 入口 | 路径 | 审计结果 |
|------|------|----------|
| AI 阿岩助手 | /ask/ | ✅ 入口卡片正常（href="/ask/"） |
| 资源中心 | /resources/ | ✅ ResourceCenterTeaser + 侧边栏链接正常 |
| 30 秒资料诊断 | /survey/ | ⚠️ 首页缺少入口卡片（246B 已补） |

## 验证

- build ✅ 57 pages, Pagefind 3 filters
- SEO ✅ 456/0
- images ✅ 49/0/0/0

## 边界约束

- 不接 API：✅
- 不接 LLM：✅
- 不修改文章正文：✅
- 不新增普通文章：✅
- 不 commit / push：✅（本批仅开发，未提交）

## 依赖

246A 是 246B 的前置条件：必须先修复 BaseLayout CTA 脚本，才能安全地在首页新增 /survey/ 入口。
