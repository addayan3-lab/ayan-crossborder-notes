# 阿岩跨境笔记 · 资源详情页 `/resources/[slug]/` — 规划文档 v0.1

> 状态: 📋 **规划阶段,未开发**。等用户评审后择期开发。
> 约束:本文档不含代码、不改文章、不改 `package.json`、不改部署配置。
> 与 `docs/resource-center-plan.md` (082 配套) 配合阅读;082 已上线 `/resources/` 总目录页,本文规划详情页扩展。

---

## 1. 为什么要做详情页

### 1.1 现状
- `/resources/` 是 7 分类 × 28 张卡的目录页,每张卡只展示 6 个字段(name / audience / publicClassScene / content / slug / wechatKeyword)
- 卡的"查看文章"链接直接跳到 `/articles/[slug]/`,卡的"回复关键词领资料"只是文案,没有独立落地页
- 公开课引流:用户从公开课扫微信关键词 → 不知道长什么样 → 需要一个"看 + 领"的中转页

### 1.2 详情页的核心价值
- ✅ 资料包独立落地页:用户搜 "亚马逊关键词清洗 SOP" 可以直接落到详情页,而不是只看到目录里的 6 行摘要
- ✅ SEO 扩展:28 个长尾关键词 → 28 个独立 URL,扩大站内搜索覆盖
- ✅ 公开课扫码承接:公开课 PPT 上可以放"扫这个码看资料包详情",二维码可独立跟踪

### 1.3 不做的事情
- ❌ 不做完整 PDF 在线预览(避免侵权 + 减少页面体积)
- ❌ 不做注册登录
- ❌ 不做付费下载
- ❌ 不做"看完自动发货"逻辑(仍是"回复关键词 → 微信发文件")

---

## 2. URL 与数据模型

### 2.1 URL 结构
- 单数复数统一:`/resources/[slug]/`(无尾斜杠问题,Astro 默认生成)
- 28 个 slug 与 28 篇文章 slug 1:1 对应
  - 例:`/resources/keyword-cleaning-method/` ↔ `/articles/keyword-cleaning-method/`
- **不**新增 article 字段(082 已 lock 7-field schema,本次不破坏)

### 2.2 数据来源
- 详情页数据 = `src/pages/resources/index.astro` 现有 categories/resources 数组
- 增加的字段(仅用于详情页,不影响 082 总目录):
  - `summary: string` — 1-2 句导语(从 leadMagnet 派生的中文导读)
  - `highlights: string[]` — 3-4 条要点(从 leadMagnet + content 提炼)
  - `relatedResources: string[]` — 2-3 个相关资料 slug
  - `audienceDetail: string` — 1 句"谁最适合用"的展开
  - `useCase: string` — 1 句"用在哪一步"的展开
- 字段位置:与 082 数据数组并列,**不**写到 frontmatter、不写到 content.config.ts

### 2.3 不复用文章 frontmatter
- 详情页字段是"展示"字段,文章 frontmatter 是"内容"字段
- 详情页是设计资产,文章是内容资产,职责分离

---

## 3. 页面结构(每页 7 个模块)

### 3.1 Hero 区
- 标题:资源包名称(例:"关键词清洗 SOP 模板")
- 面包屑:首页 / 资源中心 / [分类名] / [资源名]
- 副标题:1 句话导语(summary)
- 关键信息条:4 chips(对应 category / 适合谁用 / 公开课场景 / 微信关键词)

### 3.2 核心信息卡(浅黄琥珀色,与 082 卡片同色)
- 资料名
- 分类
- 适合谁用(audienceDetail)
- 公开课场景(publicClassScene)
- 实物内容(content)

### 3.3 4 个核心要点(highlights)
- 列表式,4 条
- 每条 1 句话,讲清"用这个资料解决什么问题"

### 3.4 使用场景(useCase)
- 1 段话讲清"用在哪一步、谁在用、怎么用"
- 不超过 80 字

### 3.5 相关资料推荐(relatedResources)
- 横向 2-3 张卡,链接到其他详情页
- 规则:同 category 内优先 + 跨 category 互补
- 目的:让用户在站内多停留一格

### 3.6 微信钩子区(浅黄琥珀色,重复品牌一致性)
- 大字"回复关键词" + wechatKeyword
- 下方 1 句"领取这份资料 + 进入公开课群"
- 不放真二维码(避免每次更新都改图片)

### 3.7 返回导航
- 返回 /resources/ 总目录(浅蓝,与卡片区分)
- 返回对应 /articles/[slug]/ 文章(浅蓝)
- 返回对应 /open-class/ 公开课(浅蓝)

---

## 4. 视觉规范

### 4.1 配色一致性
- 浅黄琥珀色:#fffcf0 / #fef6e0 / #f4d089 / #d97706 / #b45309 / #92400e
- 与 082 资源中心卡片、083 ArticleResourceCTA、084 ResourceCenterTeaser、087 专题页 resource-strip 完全同色
- 目的:全站所有"资料包相关"模块都是同一视觉,降低用户认知成本

### 4.2 排版规范
- 标题字号:32-40px
- 副标题:18px
- 卡片标题:20px
- 字段标签:11-12px
- 字段值:14-15px
- 移动端断点:980px(横排 → 纵排) / 720px(字号减小)

### 4.3 与现有模块的关系
- 资源详情页 ≠ 资源中心目录:详情页是"看具体 1 个资料",目录是"看全部 28 个"
- 资源详情页 ≠ 文章页:文章是"读内容",详情页是"看资料 + 领资料"
- 资源详情页 ≠ 公开课:公开课是"听内容",详情页是"看资料 + 领资料"

---

## 5. 内部链接关系

### 5.1 入链(从其他页面跳进来)
- ✅ `/resources/` 总目录每张卡的"查看文章"按钮拆为 2 个:
  - 现有 `/articles/[slug]/` (主)
  - 新增 `/resources/[slug]/` (副, 文字"查看资料详情 →")
- ✅ 083 ArticleResourceCTA 增加"查看资料详情 →"副按钮(可选,放右侧)
- ✅ 087 专题页 resource-strip 链接保持 /resources/(总目录),详情页之后再单独考虑

### 5.2 出链(从详情页跳出去)
- 详情页 → 关联文章(主推)
- 详情页 → 资源中心总目录
- 详情页 → 同 category 其他资源(2-3 张)
- 详情页 → 公开课(可选)

### 5.3 孤岛检测
- 28 个详情页之间通过 relatedResources 形成网状结构,无孤岛
- 详情页 ↔ 文章页双向链接(详情页顶部"读配套文章" / 文章页 CTA 底部"查看资料详情")

---

## 6. SEO 规范

### 6.1 title
- 格式:`[资源名] · 亚马逊资料包详情 — 阿岩跨境笔记`
- 例:`关键词清洗 SOP 模板 · 亚马逊资料包详情 — 阿岩跨境笔记`

### 6.2 description
- 1 句话,120 字以内
- 包含资源名 + 1 个长尾关键词
- 例:"关键词清洗 SOP 模板,亚马逊卖家整理关键词流程的免费资料包,覆盖 8 字段关键词清洗、3 步分类、判断词与流量词分离。"

### 6.3 JSON-LD
- 每页加 Article schema + BreadcrumbList
- 不加 Product(避免误解为商品)

### 6.4 站点地图
- 自动包含在 `sitemap.xml`(Astro 默认)
- Pagefind 索引 28 个新 URL,filter 仍为 3 个(topic / stage / intent)

---

## 7. 实现分阶段建议

### 阶段 A:MVP(0.5 天)
- 复用 082 categories/resources 数据
- 单文件 `/resources/[slug].astro` 用 `getStaticPaths` 生成 28 页
- 7 个模块全部包含但内容字段先用默认值
- 仅验证 URL 生成 + 基本样式

### 阶段 B:数据充实(1 天)
- 28 套 summary / highlights / relatedResources / audienceDetail / useCase 全部写完
- relatedResources 关系图手画 1 张表,避免重复推荐

### 阶段 C:入链接通(0.5 天)
- `/resources/` 卡片加"查看资料详情"副按钮
- `ArticleResourceCTA` 加副按钮(可选)
- 内链检查:所有相关链接无 404

### 阶段 D:QA + 上线(0.5 天)
- build / SEO / images / 移动端 / 28 链接有效性
- 写报告 `XXX_RESOURCE_DETAIL_PAGES_V01_report.md`

### 阶段 E:补缺(后续)
- 公开课扫码页改造(把"扫这个码看详情"挂上 28 个详情页 URL)
- 相关资料推荐规则自动化(同 category 优先 → 跨 category 互补)

---

## 8. 风险与边界

### 8.1 内容重复风险
- 28 个详情页有大量重复结构,容易陷入"自动生成 28 段重复文案"
- 应对:每页 summary / highlights 必须由人写,不允许 `String.replace` 模板化
- QA 阶段会抽样 3 个详情页人工读,确认 28 页文案不是同一个模板

### 8.2 维护成本
- 28 个详情页 = 28 套扩展字段,文章新增时需要同步在 resources 数据数组里加
- 应对:数据放 082 同一个文件,新增文章时同时补 resources 数组;不做"详情页数据自动从文章生成"

### 8.3 不做偏离
- 不做付费墙、不做完整 PDF 在线预览、不做登录、不做评论
- 不在详情页加"广告位"或"联盟链接"
- 资料包发送仍走"微信关键词 → 手动发文件",不在站内搞自动下载

### 8.4 与 091-110 任务的关系
- 详情页是 `next-tasks-093-110-plan.md` 里 Group A 的第 1 个候选
- 优先级取决于公开课群规模:如果公开课群已经超过 X 人,详情页就值得做;否则继续优化 082 总目录 + 083 CTA

---

## 9. 验收清单(将来开发完时自检)

- [ ] `npm run build` 通过,生成 28 个新页面,总页面数 = 40 + 28 = 68
- [ ] `npm run seo:audit` 0 fail,新增 28 页 meta 完整
- [ ] `npm run images:check` 0 missing / 0 orphan(详情页不引新图)
- [ ] Pagefind filter 仍 3 个,新 28 页可被搜索
- [ ] `/resources/[slug]/` 28 URL 全部 200(无 404)
- [ ] 28 详情页 ↔ 28 文章页双向链接有效
- [ ] 28 详情页 ↔ /resources/ 总目录回链有效
- [ ] 移动端 720px 断点样式正常
- [ ] 写完报告 `XXX_RESOURCE_DETAIL_PAGES_V01_report.md`

---

**文档结束。** 等用户确认后,本规划进入"代码实现"阶段。开发期间本文档不再更新(只增不改),完工时写代码报告 `XXX_RESOURCE_DETAIL_PAGES_V01_report.md`。
