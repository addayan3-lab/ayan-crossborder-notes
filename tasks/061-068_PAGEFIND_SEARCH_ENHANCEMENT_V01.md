# 061-068_PAGEFIND_SEARCH_ENHANCEMENT_V01

## 目标

增强 Pagefind 站内搜索体验：

- 061 给文章页加 topic metadata
- 062 给文章页加 stage metadata
- 063 给文章页加 intent metadata
- 064 搜索页增加专题筛选
- 065 搜索页增加阶段筛选
- 066 搜索结果卡片显示 topic / stage / intent
- 067 无结果页推荐 6 条学习路径
- 068 生成 reports/061-068_PAGEFIND_SEARCH_ENHANCEMENT_V01_report.md

## 执行边界

- 不新增普通文章
- 不修改 041-053 已完成文章正文
- 不重构站点
- 不修改部署平台配置
- 不调用外部 API
- 只围绕：搜索页、Pagefind metadata、搜索结果卡片、无结果推荐

## 当前背景

- 当前页面数：37
- 当前 SEO：296 pass / 0 fail
- 当前 image manifest：7 manifest / 0 missing
- 已有专题：keyword / listing / ppc / review / ai-search / tools
- 已有阶段 stage 取值：新手 / 进阶 / 实操
- 已有 intent 取值：学习 / 工具 / 决策 / 避坑
- 6 篇学习路径文章：
  - /articles/keyword-learning-path/
  - /articles/listing-learning-path/
  - /articles/ppc-learning-path/
  - /articles/review-learning-path/
  - /articles/ai-search-learning-path/
  - /articles/tools-learning-path/

## 验收

必须运行：

```bash
npm run build
npm run seo:audit
npm run images:check
```

报告必须写明：

- build 页面数
- SEO pass / fail
- images 检查结果
- 新增 / 修改文件
- 下一步建议
