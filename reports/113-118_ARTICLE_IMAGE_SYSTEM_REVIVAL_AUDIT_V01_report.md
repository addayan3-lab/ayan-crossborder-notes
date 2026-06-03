# 113-118 文章配图系统复活审计报告

## 执行结论：成功

---

## 113：图片系统现状审计

| 检查项 | 结果 |
|--------|------|
| Manifest 位置 | `src/data/image-manifest.json` |
| Manifest 条目数 | 7 |
| 本地图片总数 | 20 张 |
| Manifest 覆盖范围 | 仅 article-assets/（通用配图）|
| 文章封面覆盖 | 28 篇中仅 2 篇有自定义封面 |
| 信息图覆盖 | 仅 1 篇（2026-amazon-ai-operations） |
| 系统隐患 | manifest 未覆盖文章封面、专题封面、resources、open-class |

## 114：文章缺图清单

| 优先级 | 数量 | 说明 |
|--------|------|------|
| **P0** | **6** | 6 条学习路径文章 |
| **P1** | **14** | 专题普通主文 |
| **P2** | **6** | 辅助文章 |
| 已有图 | 2 | ai-keyword-table, new-product-ppc-week-one |
| **总计缺图** | **26 篇** | |

## 115：资源中心与公开课页面视觉需求清单

| 页面类型 | 数量 | 视觉需求 | 建议方案 |
|---------|------|---------|---------|
| 资源中心首页 | 1 | banner SVG | 简约 banner |
| 资源详情页 | 7 | 资料包 cover SVG | 统一模板 |
| 公开课中心 | 1 | banner SVG | 简约 banner |
| 公开课详情页 | 4 | 课程场景 SVG | 统一模板 |

## 116：统一图片命名与 Manifest 规则

`docs/image-naming-and-manifest-rules.md` 已输出，包含：
- 文章、资源、公开课统一的目录规范
- Manifest ID 命名规则（`{topic}-{detail}-{nn}`）
- Alt 文案规则
- 图片尺寸建议（SVG/PNG/WebP）
- 禁止项清单

## 117：首批 10 张图片提示词表

`docs/image-prompt-plan-batch-01.md` 已输出，包含 10 张图片的完整提示词：

| # | 图片 | 路径 | 适合 SVG |
|---|------|------|---------|
| 1 | 关键词学习路径 cover | `/images/articles/keyword-learning-path/cover.svg` | ✅ |
| 2 | Listing 学习路径 cover | `/images/articles/listing-learning-path/cover.svg` | ✅ |
| 3 | PPC 学习路径 cover | `/images/articles/ppc-learning-path/cover.svg` | ✅ |
| 4 | Review 学习路径 cover | `/images/articles/review-learning-path/cover.svg` | ✅ |
| 5 | AI 搜索学习路径 cover | `/images/articles/ai-search-learning-path/cover.svg` | ✅ |
| 6 | 工具资料学习路径 cover | `/images/articles/tools-learning-path/cover.svg` | ✅ |
| 7 | 资源中心 banner | `/images/resources/banner.svg` | ✅ |
| 8 | 公开课中心 banner | `/images/open-class/banner.svg` | ✅ |
| 9 | 关键词清洗表 cover | `/images/resources/keyword-cleaning-sheet/cover.svg` | ✅ |
| 10 | PPC 周复盘表 cover | `/images/resources/ppc-weekly-review/cover.svg` | ✅ |

## 118：图片系统下一步执行方案

`docs/image-system-next-steps.md` 已输出，核心建议：

- **分三阶段**：MVP 10 张核心图 → P0 补图 → P1/P2 补图
- **SVG 优先**：所有视觉需求先用 SVG 实现
- **不改 package.json**：现有 npm scripts 够用
- **脚本增强**：check-image-manifest 扩展 orphan 扫描范围（下一批做）
- **下一批建议**：119-125 做 SVG 编写 + manifest 扩充

---

## 验收结果

| 检查项 | 结果 |
|--------|------|
| `npm run images:check` | 7 items / 0 missing / 0 duplicates / 0 orphans — ✅ |
| `npm run build` | 51 pages / 3026 words / 3 filters — ✅ |
| `npm run seo:audit` | 408 pass / 0 fail — ✅ |
| 是否新增真实图片文件 | ❌ 否 — 纯审计+文档，未生成图片 |
| 是否修改文章正文 | ❌ 否 |
| 是否破坏 manifest | ❌ 否 — manifest 未修改 |
| 是否调用外部 API | ❌ 否 |

---

## 新增文档清单

| 文件 | 说明 |
|------|------|
| `reports/113_IMAGE_SYSTEM_CURRENT_AUDIT_V01_report.md` | 图片系统现状审计 |
| `reports/114_ARTICLE_IMAGE_GAP_LIST_V01_report.md` | 文章缺图清单摘要 |
| `docs/article-image-gap-list.md` | 文章缺图详细清单（28 篇完整表） |
| `docs/resource-openclass-image-plan.md` | 资源 + 公开课视觉需求方案 |
| `docs/image-naming-and-manifest-rules.md` | 统一命名与 manifest 规则 |
| `docs/image-prompt-plan-batch-01.md` | 首批 10 张提示词表 |
| `docs/image-system-next-steps.md` | 图片系统下一步执行方案 |

## 边界检查

| 检查项 | 结果 |
|--------|------|
| 是否生成真实图片 | ❌ 否 — 纯文档规划 |
| 是否修改文章正文 | ❌ 否 |
| 是否新增普通文章 | ❌ 否 |
| 是否改部署配置 | ❌ 否 |
| 是否改 package.json | ❌ 否 |
| 是否删除已有图片 | ❌ 否 |
| 是否破坏 manifest | ❌ 否 |
| 是否调用外部 API | ❌ 否 |
| 是否 commit | ❌ 否 |
| 是否 push | ❌ 否 |

## 下一步建议

执行 119-125 批次：编写 10 张核心 SVG + 扩充 manifest + 增强检查脚本。
