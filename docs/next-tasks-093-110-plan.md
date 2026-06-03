# 阿岩跨境笔记 · 下一批任务 093-110 规划 v0.1

> 状态: 📋 **规划阶段,未开发**。等用户评审后择期实施。
> 约束:本文档不含代码,只列任务清单与决策点;实施时按批(093-095 / 096-098 / 099-103 / 104-107 / 108-110)推进。
> 与 086-092 已完成的 7 个任务(082 资源中心、083 文章 CTA、084 首页入口、085 QA 修复、086 部署验收、087 专题入口、090 gitignore)连续编号。

---

## 总览:18 个任务 / 4 个组

| 组 | 任务编号 | 主题 | 数量 | 优先级 |
|---|---|---|---|---|
| A | 093-098 | 资源流完善 | 6 | 🟢 高 |
| B | 099-103 | 文章生产 | 5 | 🟡 中 |
| C | 104-107 | 公开课与社会化证明 | 4 | 🟡 中 |
| D | 108-110 | 技术债与运营自动化 | 3 | 🔵 低 |

**M3-direct / GPT-plan 标记说明:**
- ✅ **M3-direct**: 任务范围清晰、需求明确,M3 可直接动手做
- ⏸ **需 GPT 先规划**: 任务范围模糊、需要先让 GPT 写规划文档,实施时按规划走
- ⛔ **不做**: 不在 093-110 范围(可能是更长远的规划)

---

## Group A · 资源流完善(093-098)

> 主题:把 `/resources/` 总目录扩展为完整的"看 → 领 → 用"资料流。
> 上游:086-092 已上线总目录 + 5 专题入口 + 28 文章 CTA。
> 下游:Group C 公开课 / Group D 监控。

### 093 · 资源详情页 MVP
- **编号:** 093
- **名称:** 资源详情页 `/resources/[slug]/` MVP 阶段(0.5 天)
- **M3-direct / 需 GPT 先规划:** ✅ M3-direct(091 规划文档已写)
- **风险:** 🟢 低。`getStaticPaths` 生成 28 页,样式复用 082 浅黄琥珀。
- **验收:**
  - [ ] 28 个 URL 生成,`/resources/[slug]/` 全部 200
  - [ ] 7 个模块(Hero / 核心信息卡 / 4 要点 / 使用场景 / 相关资料 / 微信钩子 / 返回导航)全部包含
  - [ ] build 通过,页面数 40 → 68
  - [ ] SEO 0 fail
  - [ ] 写报告 `093_RESOURCE_DETAIL_PAGES_MVP_V01_report.md`

### 094 · 资源详情页数据充实
- **编号:** 094
- **名称:** 28 套 summary / highlights / relatedResources / audienceDetail / useCase 全部写完
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(091 §3.5 已写字段结构,但内容需 GPT 协助)
- **风险:** 🟡 中。28 套文案是体力活,容易陷入"模板化重复"
- **验收:**
  - [ ] 28 套字段全部人工写完,非自动生成
  - [ ] 抽 3 个详情页人工读,确认无重复
  - [ ] relatedResources 同 category 优先,跨 category 互补,无空数组
  - [ ] 写报告 `094_RESOURCE_DETAIL_PAGES_DATA_V01_report.md`

### 095 · 资源详情页入链整合
- **编号:** 095
- **名称:** `/resources/` 总目录卡片 + 083 ArticleResourceCTA 加"查看资料详情"副按钮
- **M3-direct / 需 GPT 先规划:** ✅ M3-direct(链接结构在 091 §5.1 已规划)
- **风险:** 🟢 低。按钮样式复用 082 浅黄琥珀。
- **验收:**
  - [ ] 082 总目录 28 张卡每张加 1 个副按钮 → `/resources/[slug]/`
  - [ ] 083 ArticleResourceCTA 加 1 个副按钮(右侧)
  - [ ] 087 专题页 resource-strip 链接保持 `/resources/`(暂不改)
  - [ ] 双向链接 28/28 验证
  - [ ] 写报告 `095_RESOURCE_DETAIL_LINKS_V01_report.md`

### 096 · 公开课扫码承接页
- **编号:** 096
- **名称:** 公开课 PPT 扫码 → 28 详情页 URL 表,每个详情页带 `?from=open-class-001` 参数
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(URL 表是设计资产,需要先和用户对齐公开课大纲)
- **风险:** 🟡 中。需要和公开课群主(用户)对齐 28 个详情页的"在公开课哪一页出现"。
- **验收:**
  - [ ] URL 表文档 `docs/open-class-qr-map.md` 写完(28 行:资料名 / 公开课节次 / 二维码内容)
  - [ ] 详情页支持 `?from=` 参数,header 显示"来源:公开课第 X 节"
  - [ ] 28 URL 全部可生成
  - [ ] 写报告 `096_OPEN_CLASS_QR_MAP_V01_report.md`

### 097 · 资料包文件实化
- **编号:** 097
- **名称:** 28 个 leadMagnet 对应的真实资料包(模板 / 清单 / 导图)生成,存到 `public/resources/`
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(资料内容是知识资产,需 GPT 协助初稿 + 用户审)
- **风险:** 🟡 中。资料包需要真有内容,不能只是文件名。
- **验收:**
  - [ ] 28 个资料文件(MD / PDF / XLSX / PNG)全部就位
  - [ ] `/resources/[slug]/` 加"下载文件"按钮(指向 public/resources/...)
  - [ ] 用户拿到的资料包和文章内容一致(不是营销内容)
  - [ ] 写报告 `097_RESOURCE_FILES_V01_report.md`

### 098 · 资源中心 SEO 长尾关键词扩展
- **编号:** 098
- **名称:** 28 个详情页 + 28 个 `/articles/[slug]/` 加 long-tail 关键词(description 微调 + keywords meta)
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(关键词需要 GPT 协助扩展)
- **风险:** 🟡 中。关键词堆砌是黑帽,要保持白帽密度。
- **验收:**
  - [ ] 28 套 long-tail 关键词表 `docs/seo-longtail-keywords.md` 写完
  - [ ] 28 文章 description 微调
  - [ ] 28 详情页 description + keywords meta
  - [ ] SEO audit 仍 0 fail,新 28 页 total score 不降
  - [ ] 写报告 `098_RESOURCE_SEO_KEYWORDS_V01_report.md`

---

## Group B · 文章生产(099-103)

> 主题:扩内容覆盖,从 28 篇到 33 篇。新增 5 篇覆盖:选品 2 篇 / 关键词 1 篇 / AI 运营 1 篇 / Review 1 篇。
> 全部走 v2 SOP(7-field frontmatter + 2000-3000 字 + 1 个核心判断 + 1 个常见误区)。

### 099 · 选品专题扩 2 篇
- **编号:** 099
- **名称:** 选品指南扩 2 篇(候选主题:数据反推法 / 季节性产品判断)
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(选题是知识资产决策)
- **风险:** 🟡 中。选品话题容易和现有 6 篇重复,需要先和用户对齐选题。
- **验收:**
  - [ ] 2 篇新文章发表,总文章数 28 → 30
  - [ ] 7-field frontmatter 完整,leadMagnet 唯一
  - [ ] 083 ArticleResourceCTA 渲染
  - [ ] 资源中心自动 +2 张卡(数据放 082 数组)
  - [ ] 写报告 `099_SELECTION_2_ARTICLES_V01_report.md`

### 100 · 关键词专题扩 1 篇
- **编号:** 100
- **名称:** 关键词清洗进阶 1 篇(候选主题:8 字段清洗的边界判断)
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划
- **风险:** 🟢 低。关键词专题已有 5 篇,扩第 6 篇定位"进阶"。
- **验收:**
  - [ ] 1 篇新文章,总 30 → 31
  - [ ] leadMagnet 唯一,不和 082 现有 28 张卡重复
  - [ ] 082 资源数组 +1 张卡
  - [ ] 写报告 `100_KEYWORD_ADVANCED_ARTICLE_V01_report.md`

### 101 · AI 运营专题扩 1 篇
- **编号:** 101
- **名称:** AI Prompt 模板 1 篇(候选主题:Listing 改写 Prompt v2 / PPC 复盘 Prompt)
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划
- **风险:** 🟢 低。AI 工具专题 079 已写,Prompt 是补强。
- **验收:**
  - [ ] 1 篇新文章,总 31 → 32
  - [ ] leadMagnet 是真实可下载的 Prompt 文件
  - [ ] 082 资源数组 +1
  - [ ] 写报告 `101_AI_PROMPT_ARTICLE_V01_report.md`

### 102 · Review 专题扩 1 篇
- **编号:** 102
- **名称:** 差评应对 1 篇(候选主题:差评归因 → Listing 修改 → 复盘三步法)
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划
- **风险:** 🟢 低。Review 专题已有 4 篇(差评归因有但散在多篇)。
- **验收:**
  - [ ] 1 篇新文章,总 32 → 33
  - [ ] leadMagnet 是真实 SOP 模板
  - [ ] 082 资源数组 +1
  - [ ] 写报告 `102_REVIEW_ARTICLE_V01_report.md`

### 103 · 28+5 篇文章 SOP v2 polish
- **编号:** 103
- **名称:** 28 + 5 = 33 篇 article frontmatter 一致性审计 + 必要 polish
- **M3-direct / 需 GPT 先规划:** ✅ M3-direct(080 已有 v1 polish SOP,沿用)
- **风险:** 🟢 低。审计任务,沿用 077A/077B/080 流程。
- **验收:**
  - [ ] 33/33 leadMagnet 唯一
  - [ ] 33/33 wechatHook 唯一
  - [ ] 33/33 ArticleResourceCTA 渲染
  - [ ] 0 过度营销/夸大承诺
  - [ ] 写报告 `103_ARTICLES_V2_POLISH_V01_report.md`

---

## Group C · 公开课与社会化证明(104-107)

> 主题:把"教学资产库"扩展为"公开课转化前置站"。核心是给公开课引流,而不是做直播。
> 上游:Group A 详情页 / Group B 文章。
> 下游:Group D 监控。

### 104 · /open-class/ 页扩 6 节课大纲
- **编号:** 104
- **名称:** 公开课页扩 6 节大纲(节次 / 主题 / 配套文章 / 配套资料)
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(公开课大纲是产品决策,需要先和用户对齐)
- **风险:** 🟡 中。公开课页是转化漏斗关键节点,改之前需对齐教学理念。
- **验收:**
  - [ ] /open-class/ 页 6 节课大纲展示
  - [ ] 每节课链接到对应 articles + resources
  - [ ] 6 节课主题/节次和 086-092 内容一致
  - [ ] 写报告 `104_OPEN_CLASS_6_LESSONS_V01_report.md`

### 105 · 学员案例页 /cases/
- **编号:** 105
- **名称:** 学员案例页 /cases/ 创建(1-2 个公开案例)
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(案例内容是隐私敏感,需先和用户对齐"哪些可公开")
- **风险:** 🔴 高。案例页涉及学员隐私,需要先得到学员书面同意。
- **验收:**
  - [ ] 1-2 个公开案例(脱敏后)
  - [ ] 每个案例含:学员背景 / 用了哪几篇文章 / 用了哪几个资料包 / 6 个月结果
  - [ ] 案例页有"匿名脱敏声明"
  - [ ] 写报告 `105_CASES_PAGE_V01_report.md`

### 106 · 公开课报名表单(静态版)
- **编号:** 106
- **名称:** /open-class/ 页加静态报名表单(姓名 + 微信号 + 一句话需求)
- **M3-direct / 需 GPT 先规划:** ✅ M3-direct(表单提交后跳转 /thank-you/ 静态页)
- **风险:** 🟡 中。表单数据没后端,需要明确"不收集,只展示提交成功"。
- **验收:**
  - [ ] /open-class/ 页报名表单
  - [ ] 提交后跳转 /open-class/thank-you/(静态页)
  - [ ] 表单无后端,提交后是 UI 反馈
  - [ ] 写报告 `106_OPEN_CLASS_FORM_V01_report.md`

### 107 · 公开课视频回放区
- **编号:** 107
- **名称:** /open-class/ 页加视频回放区(嵌入 B 站视频)
- **M3-direct / 需 GPT 先规划:** ✅ M3-direct(B 站 embed 是 `<iframe src="//player.bilibili.com/player.html?aid=...">` 简单嵌入)
- **风险:** 🟢 低。嵌入是纯前端,不动后端。
- **验收:**
  - [ ] /open-class/ 页加视频回放区
  - [ ] 至少 1 个回放视频(B 站 BV 号)
  - [ ] 移动端 720px 断点样式正常
  - [ ] 写报告 `107_OPEN_CLASS_VIDEO_V01_report.md`

---

## Group D · 技术债与运营自动化(108-110)

> 主题:把"自动化"和"运营基础设施"做齐,降低维护成本。
> 上游:任意组(技术债类)。
> 下游:未来 111+ 任务。

### 108 · Sitemap + robots.txt 优化
- **编号:** 108
- **名称:** `sitemap.xml` + `robots.txt` 优化:加 lastmod / changefreq / priority
- **M3-direct / 需 GPT 先规划:** ✅ M3-direct(Astro `@astrojs/sitemap` 已装,加配置即可)
- **风险:** 🟢 低。配置类任务。
- **验收:**
  - [ ] sitemap.xml 包含 lastmod(从 git log 取)
  - [ ] robots.txt 包含 sitemap URL
  - [ ] Bing / Google Search Console 提交新 sitemap
  - [ ] 写报告 `108_SITEMAP_ROBOTS_V01_report.md`

### 109 · 性能监控
- **编号:** 109
- **名称:** Core Web Vitals 跑分 + 移动端 LCP / FID / CLS 报告
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(跑分工具选择、阈值、报告模板)
- **风险:** 🟢 低。PageSpeed Insights 公开 API 跑一次即可。
- **验收:**
  - [ ] 5 个核心 URL(首页 / 资源中心 / 文章页 / 公开课 / 搜索页)LCP / FID / CLS 全部达标
  - [ ] 报告 `docs/perf-2026-XX-XX.md` 写完
  - [ ] 写报告 `109_PERF_MONITORING_V01_report.md`

### 110 · 备份 + 监控自动化
- **编号:** 110
- **名称:** 公开课表单数据 / 资料包下载统计 / opencode usage snapshot 全部 cron
- **M3-direct / 需 GPT 先规划:** ⏸ 需 GPT 先规划(cloudflare workers / GitHub Actions 需先选平台)
- **风险:** 🔴 高。涉及平台选型(cloudflare workers / GitHub Actions / 自建),决策需用户介入。
- **验收:**
  - [ ] 选型文档 `docs/ops-platform-decision.md` 写完
  - [ ] 选型落地 1 个(暂时推荐 GitHub Actions,成本低)
  - [ ] cron job 跑通
  - [ ] 写报告 `110_OPS_AUTOMATION_V01_report.md`

---

## 不在 093-110 范围(未来)

- ❌ 完整 PDF 在线预览(088 已 lock,不做)
- ❌ 付费墙 / 登录 / 会员(产品定位是公开课转化前置站,不是 SaaS)
- ❌ 站内 AI 问答 widget 真接通(073 留接口,等公开课群规模到 X 再做)
- ❌ 多语言(中英双语,等中文流量稳定再做)
- ❌ PWA / 移动 App(等用户基数到 X 再做)

---

## 验收时序(将来实施时)

| 批次 | 任务 | 周期 | 备注 |
|---|---|---|---|
| 第 1 批 | 093-095 | 1 周 | 资源详情页 MVP → 数据 → 入链,3 个连续任务 |
| 第 2 批 | 096-098 | 1 周 | 公开课扫码 + 资料实化 + SEO,3 个需规划任务 |
| 第 3 批 | 099-103 | 1.5 周 | 5 篇文章,1 个 polish |
| 第 4 批 | 104-107 | 1 周 | 公开课扩内容,1 个高风险(105)放最后 |
| 第 5 批 | 108-110 | 1 周 | 技术债与运营 |

**总计:** 18 个任务 / 约 5.5 周 / 单人执行 / 不开并行批。

---

**文档结束。** 等用户确认后,本规划进入"实施"阶段。实施期间本文档不再更新,完工时按 `XXX_V01_report.md` 格式逐任务写报告。
