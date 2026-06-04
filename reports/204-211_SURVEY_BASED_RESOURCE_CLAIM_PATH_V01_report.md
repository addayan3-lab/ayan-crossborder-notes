# 204-211_SURVEY_BASED_RESOURCE_CLAIM_PATH_V01

## 执行结论

**成功** ✅

## 新增 /survey/ 页面说明

**文件：** `src/pages/survey/index.astro`

**页面定位：** 30 秒资料诊断页，纯前端交互，帮助用户判断适合领取哪类资料包。

**页面结构：**
- Hero：标题"30 秒资料诊断" + 副标题
- 问题 1：你现在处在哪个阶段？（6 个选项）
- 问题 2：你最想先解决什么？（6 个选项）
- 结果区域：推荐资料包 + 推荐文章 1-2 篇 + 推荐公开课 1 节
- CTA：查看资料详情 → 继续问 AI 阿岩助手
- 边界说明：学习路径推荐，不替代真实运营判断

## 问卷问题与推荐规则

**问题 1 — 阶段选项：**
刚开始了解亚马逊 / 已经有产品 / Listing 需要优化 / 广告正在投放 / Review 差评需要分析 / 想用 AI 工具提效

**问题 2 — 目标选项：**
找关键词 / 写 Listing / 调广告 / 分析差评 / 判断产品能不能做 / 避免新手规则坑

**推荐映射（40 条规则，覆盖所有阶段×目标组合）：**

| 阶段+目标 → 推荐资料包 |
|--------|
| 新手 / 规则坑 → 新手规则避坑清单 |
| 关键词 / 找词 → 关键词清洗表 |
| Listing / 转化 → Listing 自检清单 |
| 广告 / ACOS → PPC 周复盘表 |
| Review / 差评 → Review 痛点分析表 |
| 选品 / 有产品 → 竞品矩阵拆解表 |
| AI 工具 / 任何目标 → AI 工具评测表 |

## /lead/ 调整说明

**文件：** `src/pages/lead/index.astro`

- 页面顶部新增提示条："不确定领哪份资料？先做 30 秒资料诊断。"
- 主 CTA："做资料诊断 →" 指向 `/survey/`
- 原有 Tally 表单入口保留，位置不变
- 微信 fallback 内容保留

## /resources/ 调整说明

**文件：** `src/pages/resources/index.astro`

- Hero 区域新增提示条："不知道先用哪份资料？做 30 秒诊断。"
- CTA："做资料诊断 →" 指向 `/survey/`
- 原"按专题领取资料 →"改为"按专题浏览资料 →"（语气弱化）
- 28 个资源卡片未修改（卡片内的"领取"文案保留为微信关键词提示）

## 7 个资源详情页 CTA 调整清单

| 文件 | 原 CTA | 新 CTA |
|------|--------|--------|
| `keyword-cleaning-sheet.astro` | 立即领取 → /lead/ | 做 30 秒诊断，看看是否适合这份资料 → /survey/ |
| `listing-checklist.astro` | 立即领取 → /lead/ | 同上 |
| `ppc-weekly-review.astro` | 立即领取 → /lead/ | 同上 |
| `review-pain-analysis.astro` | 立即领取 → /lead/ | 同上 |
| `competitor-selection-matrix.astro` | 立即领取 → /lead/ | 同上 |
| `ai-tools-review-sheet.astro` | 立即领取 → /lead/ | 同上 |
| `platform-rules-checklist.astro` | 立即领取 → /lead/ | 同上 |

每页仅保留 1 个主 CTA，核心正文结构未改动。

## /ask/ 调整说明

**文件：** `src/pages/ask/index.astro`

- 在"查看配套资源"折叠区底部新增低调入口："不确定适合哪份资料？做 30 秒诊断"
- 链接指向 `/survey/`
- 不恢复强微信横幅
- 资料包不抢第一优先级
- 推荐文章仍优先展示
- 匹配算法未改动

## 验收结果

| 检查项 | 结果 |
|--------|------|
| npm run build | 57 pages ✅（+1 /survey/） |
| npm run seo:audit | 456 Pass / 0 Fail ✅ |
| npm run images:check | 49 items, 0 missing, 0 duplicate, 0 orphan ✅ |
| Pagefind filters | 3 filters ✅ |

## 边界检查

| 检查项 | 结果 |
|--------|------|
| 接 API | 否 |
| 用 LLM | 否 |
| 收集隐私 | 否 |
| 保存用户输入 | 否使用 localStorage |
| 新增普通文章 | 否 |
| Commit | 否 |
| Push | 否 |
| 改 package.json | 否 |
| 改部署配置 | 否 |
| 读取 auth.json | 否 |
| 调用 IndexNow | 否 |
| 生成图片 | 否 |

## 下一步建议

1. 部署到生产后执行 POST_DEPLOY_CHECK
2. 观察 /survey/ 页面的实际使用情况，如有需要可补充更多问题或结果类型
3. 后续可考虑把 7 个资源详情页的微信关键词回复方式改为"诊断 + 领取"双路径
