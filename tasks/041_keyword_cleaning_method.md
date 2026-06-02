# 041｜关键词清洗方法：从关键词池到可用词表

## 执行者
OpenCode

## 模式
write

## 项目路径
C:\rpg\ayan-crossborder-notes

## 目标
写关键词系列第 4 篇，承接《关键词从哪里来》。
把"收了一堆词"变成"能写进 Listing 和广告的可用词表"。

覆盖：
- 去重：拼写变体 / 复数 / 大小写 / 同义词
- 归一：把"under sink organizer"和"under-sink organizer"统一为一种
- 聚类：把同主题的词分到一组（用于广告组 / 五点段落）
- 优先级排序：相关性 × 意图深度 ÷ 竞争度
- AI 在清洗里的边界：不能替你判断意图深度

## 修改范围
- src/content/posts/keyword-cleaning-method.md（新增）
- src/pages/index.astro（专题 1 文章卡更新）

## 写作要求
- 1200-1800 字
- 5-6 个 H2
- 含 2-3 个 article-callout 块
- 末尾加下一篇预告
- 新 frontmatter 字段：topic、stage、intent、relatedTopics、publicLessonUse、leadMagnet、wechatHook

## 验收
- npm run build 通过
- seo:audit Fail: 0

## 状态
✅ 立即执行（2026-06-02）
