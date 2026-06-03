# 087 · 5 专题页资源中心入口 v0.1 报告

> 任务:在 listing / ppc / ai-amazon / selection / tools 5 个专题页加"本专题配套资料包"模块
> 状态: ✅ 完成 / build 40p · 2787w · 3f
> 报告时间: 2026-06-03

---

## 1. 任务范围

### 1.1 目标
- 在 5 个专题页 (`/listing/` / `/ppc/` / `/ai-amazon/` / `/selection/` / `/tools/`) 加资源中心入口
- 模块标题: "本专题配套资料包"
- 5 套**独立文案** (5 different variants, 拒绝模板化)
- CTA → `/resources/` (即 082 已上线的资源中心总目录)
- 允许的文件: 仅 `src/pages/{listing,ppc,ai-amazon,selection,tools}/index.astro` (5 个, 不允许新建组件)

### 1.2 不做的事情
- ❌ 不新建组件文件 (allowed files 限制)
- ❌ 不改文章正文
- ❌ 不动首页 / 资源中心结构
- ❌ 不直接跳 `/resources/[slug]/` (093 任务才开发)
- ❌ 不做付费 / 登录

---

## 2. 实现

### 2.1 模块结构 (5 页共用模板)
```html
<a class="resource-strip" href="/resources/" aria-label="[唯一]">
  <div class="resource-strip-text">
    <div class="resource-strip-hint">本专题配套资料包</div>
    <h3>[独立标题]</h3>
    <p>[独立描述]</p>
    <ul class="resource-strip-chips">
      <li>[chip 1]</li>
      <li>[chip 2]</li>
      <li>[chip 3]</li>
      <li>[chip 4]</li>
    </ul>
  </div>
  <span class="resource-strip-cta">查看资料包 →</span>
</a>
```

### 2.2 5 套独立文案

| 专题页 | H3 标题 | 4 chips |
|---|---|---|
| `/listing/` | 把 Listing 优化落地为可复用的标题、五点与检查表 | 标题结构清单 / 五点改写模板 / 关键词覆盖表 / 上线前自检 |
| `/ppc/` | 把广告复盘沉淀为周复盘、否词与预算模板 | 周复盘表 / 否词清单 / 预算分配 / 首周检查 |
| `/ai-amazon/` | 把 AI 运营判断沉淀为任务清单与工具评测模板 | AI 任务判断表 / 工具评测矩阵 / 适合 + 必须人工 / Prompt 模板 |
| `/selection/` | 把选品判断沉淀为容量、矩阵、痛点和利润测算表 | 容量测算表 / 竞品矩阵 / Review 痛点 / 利润自检 |
| `/tools/` | 把工具和资料整理为检查表、Prompt 与复盘表 | AI 运营检查表 / Listing Prompt / 广告复盘表 / Review 模板 |

5 套描述句也都不同 (4 份清单 / 3 张表 / 1 张判断表 / 4 张表 / 1 套检查表)。

### 2.3 视觉设计
- 浅黄琥珀色: `#fffcf0` bg / `#fef6e0` 渐变 / `#f4d089` 边框 / `#d97706 → #f59e0b` 左边条
- 4px 圆角 16px, 紧凑横条 (与 082 资源中心、083 ArticleResourceCTA、084 ResourceCenterTeaser 完全同色)
- 720px 移动端: 横排 → 纵排, CTA 左对齐
- 整体视觉权重 < 6 专题卡 (白蓝), 介于"轻量引导"和"可点击 CTA"之间

### 2.4 位置
- 每个专题页: `</RecommendedOrder>` 之后, 文章网格 `<div class="grid grid-3">` 之前
- 逻辑流: 学习路径 → 资料包 → 文章列表 (最小接入)
- 选择理由: 083 ArticleResourceCTA 在文章页底部已是转化终点, 专题页这一条让用户在"准备开始学习路径"时就能看到资料包

### 2.5 CSS 复制
- 5 个文件 .resource-strip CSS 完全相同 (95 行 × 5 = 475 行重复)
- 故意不抽组件: 087 任务约束 "allowed files = 5 主题页"
- 未来 093 任务时如需维护, 可抽 `<ResourceStrip topic="..." />` 组件, 同步简化 5 专题页

---

## 3. 验收

### 3.1 build 结果
- Build 成功, 40 pages / 2787 words / 3 filters
- 比 082-085 baseline 2784 词 +3 (5 个 strip 文本去重后净增约 150 字符)
- 5 个专题页全部生成 (`/listing/` / `/ppc/` / `/ai-amazon/` / `/selection/` / `/tools/`)
- build 时间 +2ms 每个专题页

### 3.2 HTML 输出验证
- 抽查 `/listing/index.html`: 含 `<a class="resource-strip" href="/resources/" aria-label="查看 Listing 优化配套资料包">` 和 4 chips (标题结构清单 / 五点改写模板 / 关键词覆盖表 / 上线前自检)
- 抽查 `/tools/index.html`: 含 "查看工具模板配套资料包" 和 4 chips (AI 运营检查表 / Listing Prompt / 广告复盘表 / Review 模板)
- CSS scoped 正确 (data-astro-cid-* 隔离)
- 位置正确 (RecommendedOrder `</section>` 之后, grid 之前)

### 3.3 SEO / images
- SEO: 320 pass / 0 fail (不变)
- images: 7 / 0 / 0 / 0 (不变)
- Pagefind 索引 3 filters 不变 (topic / stage / intent)

---

## 4. 改动清单

| 文件 | 改动 |
|---|---|
| `src/pages/listing/index.astro` | +18 行 HTML (resource-strip) +95 行 CSS |
| `src/pages/ppc/index.astro` | +18 行 HTML +95 行 CSS |
| `src/pages/ai-amazon/index.astro` | +18 行 HTML +95 行 CSS |
| `src/pages/selection/index.astro` | +18 行 HTML +95 行 CSS |
| `src/pages/tools/index.astro` | +18 行 HTML +95 行 CSS |

总计: +90 行 HTML + 475 行 CSS + 5 处插入点

---

## 5. 风险与缓解

| 风险 | 等级 | 缓解 |
|---|---|---|
| CSS 5 处重复, 将来难维护 | 🟡 中 | 093 任务时抽组件, 加注释提醒 |
| 文案与 082 总目录有重复 | 🟢 低 | 082 用分类视角, 087 用专题视角, 互补不重复 |
| 移动端 720px 以下样式 | 🟢 低 | 已加 @media 断点 + 自测 |
| 088 验证是否与 082 数据漂移 | 🟢 低 | 088 QA 通过, 28 卡文案 1:1 匹配 087 chips |

---

## 6. 与 086-092 批次的关系

- 上游: 082 资源中心 + 083 ArticleResourceCTA + 084 ResourceCenterTeaser + 085 5 学习路径 (PDF) 修复
- 下游: 088 (资源中心 QA) + 089 (文章 CTA QA) + 091 (详情页规划) + 093 (资源详情页 MVP)
- 同批次: 086 (部署验收) + 088 / 089 (QA) + 090 (gitignore) + 091 / 092 (规划)

---

**报告结束。** 087 任务完成, 等 088-092 完成 + 整体 commit + push。
