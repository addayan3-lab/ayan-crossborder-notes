# 054-060_SEO_FOUNDATION_BATCH_V01

## 目标

完成 054-060 SEO 基础批次：发布推送、sitemap 校验、robots/canonical/site URL 校验、RSS、Article JSON-LD、BreadcrumbList JSON-LD、发布后检查报告。

## 当前背景

- 当前页面数：37 pages
- 当前 SEO：296 pass / 0 fail
- 当前 image manifest：7 manifest / 0 missing / 0 orphan
- 已完成 048-053 六篇学习路径文章

## 执行边界

- 不新增普通文章
- 不修改 041-053 已完成文章正文，除非修复必要 SEO/schema 问题
- 不删除已有页面
- 不修改部署平台配置
- 不读取 auth.json
- 不上传日志
- 不调用外部 API，IndexNow 脚本除外
- 所有临时报告放入 reports/
- 所有任务文件放入 tasks/

## 具体任务

### 054 IndexNow 提交

- 检查项目现有 IndexNow 脚本
- 找出 048-053 新增的 6 个学习路径 URL
- 优先使用项目已有脚本提交新增 URL
- 记录提交结果

### 055 sitemap 校验

- 检查 sitemap 是否包含全部 37 个页面
- 检查 6 篇学习路径页面是否在 sitemap 中
- 记录 sitemap URL 数量

### 056 robots / canonical / site URL 校验

- 检查 robots.txt 是否允许抓取主要页面
- 检查 canonical 是否一致
- 检查站点基础 URL 是否统一为 https://amz.hao1234.top
- 发现问题可做最小修复

### 057 RSS feed

- 新增或修复 RSS feed
- RSS 应包含最近文章
- RSS 输出路径应稳定
- 首页或 head 中可发现 RSS 链接，按项目现有结构处理

### 058 Article JSON-LD

- 为文章页增加 Article JSON-LD
- 字段至少包含 headline、description、datePublished、author、url
- 不要生成虚假作者信息，作者可使用站点已有作者名

### 059 BreadcrumbList JSON-LD

- 为文章页和专题页增加 BreadcrumbList JSON-LD
- 面包屑结构应符合：首页 → 专题 → 文章
- 独立专题页应符合：首页 → 专题

### 060 发布后检查报告模板

- 新增发布后检查报告模板
- 模板放入 docs/ 或 reports/，按项目现有习惯选择
- 内容包含 build、seo:audit、images:check、sitemap、RSS、IndexNow、结构化数据检查项
