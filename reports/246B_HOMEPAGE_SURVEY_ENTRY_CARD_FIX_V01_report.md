# 246B_HOMEPAGE_SURVEY_ENTRY_CARD_FIX_V01 报告

## 执行结论：成功

## 修改文件清单

| 文件 | 变更 |
|------|------|
| src/pages/index.astro | 首页 ask-entry-section: 改为双列网格布局，新增 survey-entry-card → /survey/ |

## 首页入口检查结果

| 入口 | 路径 | 状态 |
|------|------|------|
| 问问 AI 阿岩助手 | /ask/ | ✅ ask-entry-card href="/ask/" 正常 |
| 做 30 秒资料诊断 | /survey/ | ✅ 新增 survey-entry-card href="/survey/" |
| 进入资源中心 | /resources/ | ✅ ResourceCenterTeaser + 侧边栏链接正常 |

### /survey/ 入口详情

- 位置：首页 ask-entry-section，quick-section 下方，topic-grid 上方
- 结构：`.entry-pair` 2 列网格，/ask/ 和 /survey/ 各占一列
- 图标：清单/勾选 SVG（amber 色系）
- 文案：
  - 标题：「做 30 秒资料诊断」
  - 描述：「不知道先领哪份资料？先做诊断。根据你的阶段推荐更适合的资料和文章。」
  - 按钮：「开始诊断 →」
- 链接目标：`/survey/`（不是 /lead/）
- 响应式：≤980px 时自动堆叠为单列

## BaseLayout CTA 重写脚本回归检查

- `querySelectorAll("a, button")` 文本匹配代码块：✅ 已移除
- `[data-lead-cta]` 属性匹配：✅ 保留，仅 header「领取资料」按钮有此属性
- input 占位符匹配：✅ 保留（仅影响输入框，不涉及链接）

结论：BaseLayout CTA 脚本不会误改 /ask/、/survey/、/resources/ 链接。

## build 结果

```text
57 page(s) built in 2.11s
Pagefind: 3 filters, 57 pages, 3224 words
```

✅ 构建成功

## SEO pass/fail

```text
Pages checked: 57
Pass: 456
Fail: 0
robots.txt: PASS
sitemap-index.xml: PASS
```

✅ SEO 审计通过

## images:check 结果

```text
manifest items: 49
missing files: 0
duplicate ids: 0
orphan assets: 0
```

✅ 图片检查通过

## 边界约束检查

| 约束 | 结果 |
|------|------|
| 不接 API | ✅ 否 |
| 不接 LLM | ✅ 否 |
| 不修改文章正文 | ✅ 否 |
| 不新增普通文章 | ✅ 否 |
| 不生成图片 | ✅ 否 |
| 不改 package.json | ✅ 否 |
| 不改部署配置 | ✅ 否 |
| 不 commit | ✅ 否 |
| 不 push | ✅ 否 |

## 下一步建议

1. 246A + 246B 可合并提交 commit
2. 后续可考虑将 resources/index.astro 中的"28 个微信关键词"hero 文案收敛
3. 微信关键词卡片（open-class/index.astro）如需持续收敛
