# 040｜季度内容回顾 + 专题导览更新

## 执行者
OpenCode

## 模式
write

## 项目路径
C:\rpg\ayan-crossborder-notes

## 目标
季度末做一次内容回顾，把过去 12 周的更新整理成专题导览，并更新首页"专题学习路径"。

## 执行步骤

### 1. 拉数据
- src/content/posts/*.md 列表（按 pubDate 排序）
- src/pages/ 落地页列表
- 过去 12 周的 IndexNow 提交记录（如有 logs）
- 过去 12 周的 GSC 数据（如有）

### 2. 整理专题导览
为每个专题输出一段导览文字 + 4-6 篇代表文章 + 当前覆盖度评分。

### 3. 更新首页
- src/pages/index.astro：6 个专题卡的"后续预告"项更新
- 把已完成但还在预告里的文章移到 articles 数组
- 把真正还在规划中的放进 previews 数组

### 4. 写回顾报告
- reports/2026-q2-content-review.md
  - 季度新增文章数 / 专题覆盖度 / 优化项
  - 下季度 3 个重点方向

## 不要修改
- 文章正文（除非有错别字）
- 已有 SEO / JSON-LD / Analytics
- BaseLayout 的 Tally 注入逻辑

## 验收
- npm run build 通过
- seo:audit Fail: 0
- 报告文件存在
- 首页专题卡更新

## 输出报告
- 修改了哪些文件
- 季度新增 / 总文章数
- 各专题覆盖度评分
- 下季度 3 个重点方向
