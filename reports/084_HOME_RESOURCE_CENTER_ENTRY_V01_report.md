# 084 — 首页资源中心入口(Home Resource Center Entry)

> 状态: ✅ **成功**。首页主区在 6 个专题学习路径卡片之后,加入 1 个"免费资料包"转化横条;CTA 链接到 `/resources/`,与 082 侧边栏入口形成双触点;build / SEO / images / Pagefind 全部通过。

## 1. 执行结论

**成功**。首页现在有 2 个资源中心触点(082 侧边栏 + 084 主区),6 个专题卡之后立即承接转化。

| 指标 | 结果 |
|---|---|
| 新增组件 | `src/components/ResourceCenterTeaser.astro` (1 文件, 144 行) |
| 修改文件 | `src/pages/index.astro` (+1 import / +1 渲染 / +1 段落) |
| 首页入口位置 | `content-main` 内,`trust-strip` 之后,`</div>` 关闭 content-main 之前 |
| CTA 链接 | **`/resources/`** ✓ |
| 资料包代表数 | 4(关键词清洗表 / Listing 自检清单 / PPC 复盘表 / Review 痛点分析表) |
| 首页 `/resources/` 链接数 | **2**(侧栏 082 入口 + 主区 084 CTA) |
| build 页面数 | 40 → **40** |
| Pagefind 词数 | 2781 → **2784**(+3) |
| Pagefind 过滤器 | **3**(未变) |
| SEO pass / fail | 320/0 → **320/0** |
| images:check | 7/0/0/0(未变) |
| 与 6 专题卡主视觉冲突 | **无**(浅黄 vs 浅蓝/白,清晰区分) |
| 新增文章 | 0 |
| 修改文章 / frontmatter | 0 |
| 修改部署配置 / package.json | 0 |
| 外部 API / 真实下载 | 0 |

## 2. 新增组件

### `src/components/ResourceCenterTeaser.astro` (144 行)

**Frontmatter(8 行)** — 数据内联,4 个代表资料包:

```js
const teaserResources = [
  { icon: '🧹', name: '关键词清洗表' },
  { icon: '📋', name: 'Listing 自检清单' },
  { icon: '📊', name: 'PPC 复盘表' },
  { icon: '🎯', name: 'Review 痛点分析表' }
];
```

**HTML 结构**:
```html
<section class="resource-center-teaser" aria-label="免费资料包">
  <div class="teaser-text">
    <h2>免费资料包</h2>
    <p>关键词表、Listing 自检表、PPC 复盘表、Review 分析表、选品矩阵和 AI 工具清单,集中放在资源中心。</p>
  </div>
  <div class="teaser-chips" aria-label="代表资料包">
    <!-- 4 个 teaser-chip -->
  </div>
  <a class="teaser-cta" href="/resources/" aria-label="查看全部资料包">
    <span>查看全部资料包</span>
    <span class="teaser-cta-arrow" aria-hidden="true">→</span>
  </a>
</section>
```

3 列 grid 桌面布局:`[标题+副标题] [4 个 chip 2×2] [CTA 按钮]`。

**样式(127 行)**:
- 浅黄渐变背景 `linear-gradient(180deg, #fffcf0 0%, #fef9e7 100%)`
- 琥珀色边框 + 阴影(`#d97706` 系)
- h2 前 4px 琥珀色竖条
- 4 个 chip:白底 + 琥珀边框 + emoji + 13px 粗体名
- CTA 按钮:46px 高,琥珀底白字,hover 上浮 + 箭头右移
- 移动端断点:980px 折叠为单列;600px chip 改为单列

## 3. 修改文件

### `src/pages/index.astro`

3 处微改:

**改动 1 — 加 import(原 line 3 后)**:
```astro
import ResourceCenterTeaser from "../components/ResourceCenterTeaser.astro";
```

**改动 2 — 渲染接入(原 line 337 `</div>` 关闭 trust-strip 后,`</div>` 关闭 content-main 前)**:
```astro
<div class="trust-strip">
  <!-- 4 trust items -->
</div>

<ResourceCenterTeaser />   ← 新增
</div>
```

**未触碰**:Hero、4 个 quick-card、6 个 topic-grid card、3 个 side-card(资源/公开课/关于)、3 个 trust item、all CSS。

## 4. 位置验证(dist 输出)

`dist/index.html` 关键类名首次出现位置:

```
topic-grid              @ 6514    ← 6 个专题学习路径卡
trust-strip             @ 16042   ← 4 个信任项
resource-center-teaser  @ 17013   ← 新组件(在 trust-strip 后 ✓)
course-card             @ 19201   ← 侧栏公开课预告
```

✅ 顺序正确:6 专题卡 → 信任条 → **新资源中心 CTA 横条** → 侧栏公开课。

## 5. 视觉与 6 个专题卡的差异

| 元素 | 6 专题卡(topic-card) | 资源中心 teaser(084) |
|---|---|---|
| 背景 | 白/浅蓝渐变 | **浅黄渐变** |
| 边框 | 浅蓝/紫 | 琥珀色 |
| 卡片数 | 6 张 2-col 网格 | **1 个横条** |
| 视觉权重 | 主视觉(详细) | 次视觉(转化) |
| 高度 | 大(>= 280px) | 紧凑(单行) |
| CTA | 蓝色文字"看完整学习路径" | **琥珀色按钮"查看全部资料包"** |
| 角色 | 知识深挖 | **资料包转化** |

✅ 浅黄 vs 浅白/蓝,无任何样式撞色;横条 1 个 ≠ 网格 6 个,体量上明显次一档。

## 6. 移动端行为

| 断点 | 布局 |
|---|---|
| ≥ 980px | 3 列 grid:`标题副标题 / 2×2 chip / CTA` |
| 600-980px | 1 列 grid,3 块上下排,CTA 全宽 |
| ≤ 600px | 同上,但 chip 2×2 → 1×4 单列 |

3 段断点覆盖桌面 / 平板 / 手机。

## 7. 边界遵守清单

| 边界 | 是否触碰 |
|---|---|
| 不新增文章 | ❌ 0 篇 |
| 不修改文章正文 | ❌ |
| 不修改 frontmatter | ❌ |
| 不改部署配置 | ❌ |
| 不改 package.json | ❌ |
| 不调用外部 API | ❌ 0 处 |
| 不做真实下载系统 | ❌ 0 处(只做静态 `<a href="/resources/">`) |
| 不抢 6 专题卡主视觉 | ❌(浅黄琥珀,体量紧凑) |
| 比普通文章卡更转化 | ❌(实心按钮 vs 文字链接) |
| 移动端可读 | ❌(3 段断点) |
| 风格与首页一致 | ❌(沿用同款渐变 / 边框 / 阴影语法) |

## 8. 验证数据

| 验证项 | 结果 |
|---|---|
| `dist/index.html` 包含 `resource-center-teaser` 类 | ✓ |
| `dist/index.html` 包含"免费资料包"标题 | ✓ |
| `dist/index.html` 包含 4 个 chip 文本 | ✓(关键词清洗表 / Listing 自检清单 / PPC 复盘表 / Review 痛点分析表) |
| `dist/index.html` 中 `href="/resources/"` 出现次数 | **2**(082 侧栏 + 084 CTA) |
| `dist/index.html` 中 `aria-label` 包含"免费资料包" | ✓ |
| `npm run build` | 40 pages, 2784 words, 3 filters |
| `npm run seo:audit` | 320 pass / 0 fail |
| `npm run images:check` | 7/0/0/0 |

## 9. 下一步建议

| 任务 | 范围 | 依赖 |
|---|---|---|
| 085 | 资源转化全路径 QA + 最小修复(首页 → /resources/ → 文章 → CTA → 微信) | 082 + 083 + 084 |
| 086 | `/resources/<slug>` 子页面(28 张详情页,Astro dynamic route) | 082 |
| 087 | IndexNow 提交 `/resources/` 单独 URL | 054-060 |
| 088 | 微信关键词扫码 → 资料发放全链路线下验证 | 083 + 084 |
| 089 | 文章页 / 首页 CTA 点击率 30 天数据回看(暂不需) | 083 + 084 部署后 |

## 10. 审计入口

- 新组件:`src/components/ResourceCenterTeaser.astro`
- 接入文件:`src/pages/index.astro`(line 4 import / line 339 渲染)
- 侧栏旧入口:同文件 `resource-card` 内 `resource-center-link` 类(082 任务)
- 目标页:`/resources/`(082 任务,28 资料包)
- SEO 自动审计:`reports/seo-audit-report.md`(`npm run seo:audit` 自动生成)

---

**完成时间**:084 报告落地。**首页"免费资料包"转化横条已上线**,用户路径:首页 hero → 4 个 quick-card → 6 个专题卡 → 4 个信任项 → **免费资料包 CTA** → `/resources/` → 28 个资料包 → 微信回复关键词。
