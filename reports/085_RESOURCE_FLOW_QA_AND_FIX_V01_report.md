# 085 — 资源转化路径 QA + 最小修复 (Resource Flow QA & Fix)

> 状态: ✅ **成功**。6 条资源转化路径全部审计通过;1 处文案不一致(5 个学习路径资料名缺"(PDF)")已修复;build / SEO / images / Pagefind 全部通过。

## 1. 执行结论

**成功**。6 条路径全部连通,1 处文案不一致已修复。

| 指标 | 结果 |
|---|---|
| 检查路径 | 6 / 6(全部审计完成) |
| 修复项 | 1(5 个学习路径资料名补"(PDF)") |
| 未修复问题 | 0(详见 §6) |
| 资源卡数量 | **28 / 28** ✓ |
| 文章 CTA 数量 | **28 / 28** ✓ |
| 首页 /resources/ 入口 | **存在**(082 侧栏 + 084 主区,共 2 个入口) |
| 资源中心 → 文章 错链 | **0** |
| 资源中心 → 学习路径 错链 | **0** |
| 28 微信关键词(资源中心 ↔ 文章) | **100% 一致** |
| 28 leadMagnet(资源中心 ↔ 文章) | 23/28 完全一致,**5 个已修复为一致** |
| build 页面数 | 40 → **40** |
| Pagefind 词数 | 2784 → **2784** |
| Pagefind 过滤器 | **3**(未变) |
| SEO pass / fail | 320/0 → **320/0** |
| images:check | 7/0/0/0(未变) |

## 2. 检查路径清单与结果

### 路径 1 — 首页 → /resources/

| 触点 | 位置 | 链接 | 验证 |
|---|---|---|---|
| 082 侧栏入口 | `index.astro` 内 `resource-card` 末尾 | `<a class="resource-center-link" href="/resources/">查看全部 28 个资料包 →</a>` | ✓ |
| 084 主区 CTA | `index.astro` 内 `trust-strip` 之后(由 ResourceCenterTeaser 渲染) | `<a class="teaser-cta" href="/resources/" aria-label="查看全部资料包">` | ✓ |

**结果**:首页 2 个 /resources/ 入口,均无 broken link。

### 路径 2 — 文章页 → 资料包 CTA → /resources/

- `src/components/ArticleResourceCTA.astro` 渲染 `<a href="/resources/">查看全部资料包 →</a>`
- 28 / 28 文章渲染 CTA(083 报告已验证:`dist/articles/*/index.html` 含 `article-resource-cta` = 28)
- 28 / 28 文章 frontmatter 有 `leadMagnet` + `wechatHook`(本轮重新验证)

**结果**:28 条文章路径全部连通。

### 路径 3 — /resources/ → 对应文章

- 28 资源卡的 `slug` 字段全部对应 `dist/articles/<slug>/index.html` 存在
- **0 broken link**

**结果**:28 / 28 文章链接全部有效。

### 路径 4 — /resources/ → 对应学习路径

| 分类 | learningPath 值 | 状态 |
|---|---|---|
| 新手规则 | `/articles/tools-learning-path/` | ✓ |
| 选品 | `null` | 设计上无学习路径(无对应 learning-path 文章) |
| 关键词 | `/articles/keyword-learning-path/` | ✓ |
| Listing | `/articles/listing-learning-path/` | ✓ |
| PPC | `/articles/ppc-learning-path/` | ✓ |
| Review | `/articles/review-learning-path/` | ✓ |
| AI 工具 | `/articles/ai-search-learning-path/` | ✓ |

5 / 5 有效学习路径链接,**0 broken link**。

### 路径 5 — 专题页 → 学习路径 → 文章 → 资料包 CTA

| 专题页 | learning-path 链接数 | 状态 |
|---|---|---|
| `/listing/` | 2(推荐 + CTA) | ✓ |
| `/ppc/` | 2 | ✓ |
| `/ai-amazon/` | 2 | ✓ |
| `/tools/` | 2 | ✓ |
| `/selection/` | 0(无对应 learning-path 文章,设计) | ✓ |

所有专题页 → learning-path → 28 篇文章 → 资料包 CTA 全部连通。

⚠ **额外发现**:5 个专题页**没有**直达 `/resources/` 的入口。但这是 084 任务的"下一步"(见 084 报告 §9),**不在 085 最小修复范围**,留待 086 任务。

### 路径 6 — 搜索页 → 文章 → 资料包 CTA

- `/search/` 页面:Pagefind 已加载,7 个 search-filters(7 topic + 3 stage + 2 clear = 共 12 个 filter pill)
- 6 个 no-results recommend-card,全部指向 6 个 learning-path 文章
- 学习路径文章 → 28 篇文章 → 资料包 CTA 全部连通

**结果**:搜索路径完整,但搜索页本身没有 /resources/ 入口 — 不在 085 范围(属"专题页直达 /resources/"的同类需求,留待后续)。

## 3. 修复项清单(1 项)

### 3.1 5 个学习路径资料名补"(PDF)"

**问题**:082 创建资源中心页面时,5 个学习路径资料名按 081 规划用 "导图"(无后缀);080 任务后,5 篇文章的 `leadMagnet` 字段更新为 "导图(PDF)"(强调资料是 PDF 格式)。用户在文章 CTA 看到"AI 搜索学习路径导图(PDF)",跳到 `/resources/` 却看到"AI 搜索学习路径导图" — 文案不一致。

**修复**:`src/pages/resources/index.astro` 中 5 处 `name` 字段补 `(PDF)` 后缀:

| # | 修改前 | 修改后 |
|---|---|---|
| 1 | `关键词学习路径导图` | `关键词学习路径导图(PDF)` |
| 2 | `Listing 优化学习路径导图` | `Listing 优化学习路径导图(PDF)` |
| 3 | `PPC 学习路径导图` | `PPC 学习路径导图(PDF)` |
| 4 | `Review 学习路径导图` | `Review 学习路径导图(PDF)` |
| 5 | `AI 搜索学习路径导图` | `AI 搜索学习路径导图(PDF)` |

**验证后**:
- 资源中心 28 资料名 ↔ 28 文章 leadMagnet:**完全一致**
- 资源中心 28 微信关键词 ↔ 28 文章 wechatHook:**完全一致**
- `dist/resources/index.html` 5 个 PDF 后缀资料名正确渲染

## 4. 未修复问题(0 项)

**无**。所有 6 条路径全部连通,1 处文案不一致已修,无明显断点。

⚠ **已知不在 085 范围的"延后需求"**:
1. 5 个专题页(`/listing/` `/ppc/` `/ai-amazon/` `/tools/` `/selection/`)无 `/resources/` 直达入口 → 084 报告 §9 已列为 086 任务。
2. 搜索页无 `/resources/` 入口 → 同上,留待后续。
3. 搜索页 `search-card` / `search-box` / 6 个 recommend-card 缺 `aria-label` → 属 061-068 任务范畴,不在 082-084 范围,留待搜索页优化任务。

## 5. 数据校验明细

| 校验项 | 数值 / 状态 |
|---|---|
| `src/content/posts/*.md` 总数(排除 `_template.md`) | 28 |
| 28 文章均有 `leadMagnet` 字段 | ✓ |
| 28 文章均有 `wechatHook` 字段 | ✓ |
| 28 leadMagnet 值 **唯一** | ✓ |
| 28 wechat 关键词 **唯一** | ✓ |
| 28 wechat 关键词(资源中心 ↔ 文章) | **100% 一致** |
| 28 leadMagnet(资源中心 ↔ 文章) | **100% 一致**(修复后) |
| 资源中心资源卡数 | 28 |
| 资源中心分类数 | 7 |
| 资源中心学习路径链接数 | 5(选品 = null) |
| 资源中心文章 slug 全部有效 | 28 / 28 |
| 资源中心 internal links 全部有效 | 40 / 40(0 broken) |
| 文章页渲染 ArticleResourceCTA | 28 / 28 |
| 首页 `/resources/` 入口 | 2(082 侧栏 + 084 主区) |
| 首页 `resource-center-teaser` 渲染 | ✓ |
| 首页位置:6 专题卡 → trust-strip → resource-center-teaser → course-card | ✓(见 084 §4) |
| 5 个专题页 → learning-path 文章 | 4 / 5 专题页有,selection 0(设计) |
| 搜索页 pagefind 已加载 | ✓ |
| 搜索页 6 个 no-results recommend-card | ✓ |

## 6. 验证命令输出

```
npm run build
  Indexed 40 pages
  Indexed 2784 words
  Indexed 3 filters

npm run seo:audit
  Pages checked: 40
  Pass: 320
  Fail: 0
  robots.txt: PASS
  sitemap-index.xml: PASS

npm run images:check
  manifest items: 7
  missing files: 0
  duplicate ids: 0
  orphan assets: 0
```

## 7. 边界遵守清单

| 边界 | 是否触碰 |
|---|---|
| 不新增文章 | ❌ 0 篇 |
| 不大改页面结构 | ❌(只 5 字符修改 + 0 行增删) |
| 不改部署配置 | ❌ |
| 不改 package.json | ❌ |
| 不调用外部 API | ❌ |
| 不生成 PDF | ❌ |
| 不做真实表单 | ❌ |
| 不读 auth.json | ❌ |
| 资源卡数量与 081 规划一致 | ✓(28 / 28) |

## 8. 下一步建议

| 任务 | 范围 | 依赖 |
|---|---|---|
| 086 | 5 个专题页加"领取资料"入口链接到 `/resources/<id>#anchor` | 082 + 083 + 084 |
| 087 | 搜索页加 6 个资料包 chip 入口(可选) | 082 + 061-068 |
| 088 | `/resources/<slug>` 子页面(28 张详情页,Astro dynamic route) | 082 |
| 089 | 微信关键词扫码 → 资料发放全链路线下验证 | 083 + 084 + 086 |
| 090 | 资源中心 SEO / 转化率 30 天数据回看(暂不需) | 082-086 部署后 |

## 9. 审计入口

- 资源中心页:`/resources/`(082)
- 文章 CTA 组件:`src/components/ArticleResourceCTA.astro`(083)
- 首页主区 CTA:`src/components/ResourceCenterTeaser.astro`(084)
- 28 文章字段完整审计:`reports/077B_METADATA_QUALITY_AUDIT_V01_report.md`
- SEO 自动审计:`reports/seo-audit-report.md`(`npm run seo:audit` 自动生成)
- 28 微信关键词去重审计:`reports/080_LEAD_MAGNET_COPY_POLISH_AUDIT_V01_report.md` §5

---

**完成时间**:085 报告落地。**6 条资源转化路径全部连通,1 处文案不一致已修复**。下一步可执行 086(5 个专题页加 /resources/ 入口)。
