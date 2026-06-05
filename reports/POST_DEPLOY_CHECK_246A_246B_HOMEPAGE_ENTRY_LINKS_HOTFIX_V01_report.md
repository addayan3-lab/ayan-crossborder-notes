# POST_DEPLOY_CHECK_246A_246B_HOMEPAGE_ENTRY_LINKS_HOTFIX_V01 报告

## 执行结论：成功

## 首页入口检查结果

| 入口 | 存在 | href | 结果 |
|------|------|------|------|
| 问问 AI 阿岩助手 | ✅ 首页可见 | /ask/ | ✅ 正确 |
| 做 30 秒资料诊断 | ✅ 首页可见 | /survey/ | ✅ 正确 |
| 资源中心 / 查看全部资料包 | ✅ 首页可见 | /resources/ | ✅ 正确 |

首页双列 entry-pair 布局已在线上生效，/ask/（蓝色主题）与 /survey/（琥珀色主题）并排展示。

## 点击路径是否被误改写

| 路径 | 是否被改写到 /lead/ | 结果 |
|------|---------------------|------|
| /ask/ | 否 | ✅ 未被改写 |
| /survey/ | 否 | ✅ 未被改写 |
| /resources/ | 否 | ✅ 未被改写 |
| /open-class/ | 否 | ✅ 未被改写 |

## BaseLayout 旧 blanket 脚本是否已消失

| 检查项 | 结果 |
|--------|------|
| 线上存在 `querySelectorAll("a, button")` 旧文本匹配 | ❌ 不存在 ✅ 已移除 |
| 线上存在 `querySelectorAll("[data-lead-cta]")` opt-in | ✅ 存在，正常工作 |

确认：CTA 脚本仅通过 `[data-lead-cta]` 属性（header"领取资料"按钮）opt-in 生效。

## 核心页面回归

| 页面 | HTTP 状态 | 结果 |
|------|-----------|------|
| https://amz.hao1234.top/ | 200 | ✅ |
| https://amz.hao1234.top/ask/ | 200 | ✅ |
| https://amz.hao1234.top/survey/ | 200 | ✅ |
| https://amz.hao1234.top/resources/ | 200 | ✅ |
| https://amz.hao1234.top/lead/ | 200 | ✅（含 WeChat 备用联系方式） |

## 安全边界

| 约束 | 结果 |
|------|------|
| 不接 API | ✅ 否 |
| 不使用 LLM | ✅ 否 |
| 不修改代码 | ✅ 否 |
| 不 commit | ✅ 否 |
| 不 push | ✅ 否 |

## 下一步建议

无。本批首页入口热修复已完整部署并通过线上验收。首页三入口结构（/ask/ /survey/ /resources/）稳定可用。
