# 图片系统下一步执行方案

## 1. 是否建议恢复 auto-attach-images

**不建议直接恢复。** 当前 auto-attach-images 基于 manifest 评分匹配，但 manifest 只有 7 条记录且主要集中在 AI 运营专题。恢复 auto-attach-images 前需要：

1. 先扩充 manifest 覆盖更多专题
2. 在文章中手动插入 `AUTO_IMAGE:` 标记
3. 评估匹配质量（当前评分算法较粗糙）

**建议**：在图片批量补充完成后，再评估 auto-attach-images。

## 2. 是否建议先生成 SVG 信息图

**是。** 首批建议先做 SVG 信息图：
- 体积小、速度快、不需要外部 API
- 风格统一可控
- 可直接在项目中编写
- 不涉及版权和合规问题

## 3. 是否建议批量生成 PNG

**不建议。** PNG 体积大、无法自适应、不如 SVG 灵活。除非需要展示截图（如工具界面），否则优先使用 SVG。

## 4. 是否建议每篇文章都配图

**不完全建议。** 优先级策略：

| 优先级 | 配图策略 |
|--------|---------|
| P0（6 篇） | 必须配封面图（cover.svg） + 1 张内容配图 |
| P1（14 篇） | 至少配封面图（cover.svg），内容图可选 |
| P2（6 篇） | 封面图，内容图不强制 |

## 5. 最小可行方案

### 第一阶段：10 张核心图（MVP）
1. 6 条学习路径封面 cover.svg
2. 资源中心 banner.svg
3. 公开课中心 banner.svg
4. 关键词清洗表 cover.svg
5. PPC 周复盘表 cover.svg

### 第二阶段：P0 文章补图
1. 关键词清洗方法 cover.svg
2. 补全 6 条学习路径的内容配图
3. 注册到 manifest

### 第三阶段：P1 / P2 文章补图
1. 按 topic 分批：keyword → listing → ppc → review → selection → ai → tools
2. 每批 3-5 张，分批次补充
3. 同步更新 manifest

## 6. 所需脚本增强

| 脚本 | 当前能力 | 需增强点 |
|------|---------|---------|
| `check-image-manifest.mjs` | 仅检查 article-assets/ 下 orphan | 扩展 orphan 扫描至 articles/、covers/、resources/、open-class/ 目录 |
| `auto-attach-images.mjs` | 基于 manifest 评分匹配 | 扩充 manifest + 优化评分算法 |
| `generate-article-infographics.mjs` | 硬编码样式，仅一篇可用 | 需要通用化 + 模块化 SVG 模板 |

**无需改 package.json** — 现有 npm scripts 已够用。

## 7. 不建议现在做什么

- ❌ 接入外部图片 API（DALL·E / Stable Diffusion / Midjourney）
- ❌ 批量生成 AI 写实图
- ❌ 引入新图片处理库
- ❌ 自己搭 CDN 或图床
- ❌ 对旧图大规模重命名（avoid breaking changes）
- ❌ 修改已发布的文章 frontmatter image 路径（可以先新增，不删除旧路径）

## 8. 下一批任务 119-125 建议

| 任务 | 内容 | 优先级 |
|------|------|--------|
| 119 | 编写 6 条学习路径 SVG cover（手动） | P0 |
| 120 | 编写资源中心 / 公开课中心 SVG banner | P0 |
| 121 | 编写 2 个资源详情页 SVG cover | P0 |
| 122 | 扩充 image-manifest.json | P0 |
| 123 | 增强 check-image-manifest.mjs orphan 扫描范围 | P0 |
| 124 | P1 文章封面图（选 4-6 篇补） | P1 |
| 125 | 发布前全量 QA | P0 |

**总体建议**：用 1-2 个批次（119-125）完成 MVP 10 张 SVG 的制作和 manifest 注册，然后运行全量检查。
