# 036｜站点性能优化：dist 体积 / Pagefind 体积 / Lighthouse

## 执行者
OpenCode

## 模式
write

## 项目路径
C:\rpg\ayan-crossborder-notes

## 目标
基线测量 → 优化 → 复测，对比数据。
- dist 目录总体积
- pagefind 输出体积
- 站点 Lighthouse 分数（性能 / 可访问性 / 最佳实践 / SEO）

## 修改范围

### 1. 基线测量
- scripts/measure-dist-size.mjs
  - 输出 dist 总大小、HTML / CSS / JS / SVG / PNG / 其他 分类
  - 输出 pagefind 总大小
- 跑一次 Lighthouse（本地可用 lighthouse CLI 或直接看 Cloudflare Analytics）

### 2. 优化项（按优先级）
- CSS：当前多个 AYAN_ 前缀的补丁段重复定义，可合并精简
- JS：Tally 注入脚本可改为按需注入
- SVG：内联 SVG 数量较多（hero、卡片装饰），可考虑抽出为静态文件
- 图片：/images/ayan-hero.png 等位图改 WebP
- 字体：当前用系统字体堆栈，可确认无远程字体加载

### 3. 复测
- 对比优化前后的体积 / Lighthouse 数据
- 写入 reports/perf-2026-q2.md

## 不要修改
- SEO 标记 / JSON-LD / Analytics
- 文章正文
- 已有 sitemap / robots
- 公开课和 lead 表单

## 验收
- dist 总体积减少 ≥ 20%（目标）
- pagefind 索引体积 < 5MB
- Lighthouse 性能分 ≥ 90（移动端）
- 视觉无回归

## 输出报告
- 优化前后体积对比表
- Lighthouse 4 项分数
- 仍可继续优化的项
