# 122-123_IMAGE_MANIFEST_INFRA_ENHANCEMENT_V01 Report

## 执行结论：成功

---

## 变更概要

| 模块 | 变更 | 文件 |
|------|------|------|
| manifest | +13 项（7→20） | `src/data/image-manifest.json` |
| check script | orphan 扫描从仅 article-assets 扩展到全 public/images/ | `scripts/check-image-manifest.mjs` |

## Manifest 信息

| 字段 | 值 |
|------|-----|
| 原 manifest items | 7 |
| 新 manifest items | **20** |
| 扫描到本地图片数量 | 20 |
| 缺失文件 | 0 |
| 重复 id | 0 |
| 孤立文件 | 0 |

### 新增注册图片清单（13 项）

#### articles/（3 项）
| id | 路径 | 说明 |
|----|------|------|
| `keyword-table-overview-01` | `/images/articles/ai-keyword-table/keyword-table-overview.png` | 关键词拓展表示意图 |
| `new-product-ppc-week-one-cover-01` | `/images/articles/new-product-ppc-week-one/cover.svg` | 新品 PPC 第一周操作指南封面 |
| `new-product-ppc-week-one-guide-01` | `/images/articles/new-product-ppc-week-one/guide.svg` | 新品 PPC 第一周操作流程图 |

#### covers/（3 项）
| id | 路径 | 说明 |
|----|------|------|
| `cover-ai-operations-01` | `/images/covers/cover-ai-operations.svg` | AI 运营专题封面 |
| `cover-keyword-01` | `/images/covers/cover-keyword.svg` | 关键词研究专题封面 |
| `cover-listing-01` | `/images/covers/cover-listing.svg` | Listing 优化专题封面 |

#### generated-infographics/（3 项）
| id | 路径 | 说明 |
|----|------|------|
| `ai-operations-framework-01` | `/images/generated-infographics/2026-amazon-ai-operations/framework.svg` | AI 与卖家分工示意图 |
| `ai-operations-hero-01` | `/images/generated-infographics/2026-amazon-ai-operations/hero.svg` | AI 运营五大场景图 |
| `ai-operations-summary-01` | `/images/generated-infographics/2026-amazon-ai-operations/summary.svg` | 阿岩 AI 落地 SOP 图 |

#### site-level（4 项）
| id | 路径 | 说明 |
|----|------|------|
| `site-ayan-avatar-01` | `/images/ayan-avatar.png` | 阿岩头像 |
| `site-ayan-hero-01` | `/images/ayan-hero.png` | 阿岩 hero 背景图 |
| `site-hero-pattern-01` | `/images/hero-pattern.svg` | 站点背景装饰图案 |
| `site-og-default-01` | `/images/og-default.svg` | 站点默认社交分享图 |

### 需人工复核项

无 — 所有 20 张图片用途均可明确判断。4 项 site-level 资产以 `type: "site"` 标记不与文章匹配器冲突。

## 脚本增强

| 项目 | 变更 |
|------|------|
| **修改文件** | `scripts/check-image-manifest.mjs` |
| **旧 orphan 扫描范围** | 仅 `public/images/article-assets/`（硬编码） |
| **新 orphan 扫描范围** | 递归扫描 `public/images/` 全部子目录 |
| **覆盖目录** | `article-assets/`, `articles/`, `covers/`, `generated-infographics/`, 以及其他未来新增目录 |
| **根级文件** | 自动扫描 `public/images/` 根目录下图片 |
| **非图片过滤** | `walk()` 函数只返回匹配 `svg|png|jpg|jpeg|webp` 的文件 |
| **隐藏/系统文件** | 自然排除（不匹配扩展名） |
| **现有 manifest 注册图片** | 正确纳入 `referencedPaths`，不被误判为 orphan |
| **exit code** | 保持仅有 missing/duplicate 触发非零退出 — orphans 仅警告 |

## 验收结果

| 检查项 | 结果 |
|--------|------|
| `npm run images:check` | 20 items / 0 missing / 0 duplicates / 0 orphans — **✅** |
| `npm run build` | 51 pages / 3026 words / 3 filters — **✅** |
| `npm run seo:audit` | 408 pass / 0 fail — **✅** |
| Manifest 覆盖率 | **100%**（20 本地文件 / 20 manifest 条目） |
| 原有 7 项 | 未修改、未删除 |

## 边界检查

| 检查项 | 结果 |
|--------|------|
| 是否生成新图 | ❌ 否 |
| 是否调用外部 API | ❌ 否 |
| 是否修改文章正文 | ❌ 否 |
| 是否新增普通文章 | ❌ 否 |
| 是否改部署配置 | ❌ 否 |
| 是否改 package.json | ❌ 否 |
| 是否删除已有图片 | ❌ 否 |
| 是否破坏已有 manifest item | ❌ 否 |
| 是否制造重复 id | ❌ 否 |
| 是否 commit | ❌ 否 |
| 是否 push | ❌ 否 |

## 下一步建议

本批完成后可安全执行 119-121 SVG 生成：

1. **119**: 编写 6 张学习路径封面 SVG
2. **120**: 编写资源中心 & 公开课中心 banner SVG
3. **121**: 编写 2 张资源详情页封面 SVG
4. 生成后运行 `npm run images:check` 可自动发现新文件为 orphan（若有遗漏注册），提前发现未注册图片
5. 新图写入 manifest 时可参考 `scripts/check-image-manifest.mjs` 的 orphan 输出
