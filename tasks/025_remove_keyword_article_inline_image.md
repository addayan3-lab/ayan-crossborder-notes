# 025｜移除第二篇文章正文大图，恢复干净阅读版

## 执行者
OpenCode

## 模式
write

## 项目路径
C:\rpg\ayan-crossborder-notes

## 目标
把第二篇文章《如何用 AI 做亚马逊关键词表》正文里的大图去掉，恢复成更干净、更高级、更像真实知识文章的阅读体验。

## 只允许修改
- src/content/posts/ai-keyword-table.md
- 如确有必要，可只读检查 src/pages/articles/[slug].astro
- 不要改首页结构
- 不要改站点导航
- 不要改搜索
- 不要改表单

## 具体要求
1. 删除 ai-keyword-table.md 正文顶部当前那张大图（正文内嵌图）
2. 保留文章正文内容、标题结构、重点块、强调样式
3. 如果 frontmatter 里仍需保留封面字段用于卡片/SEO，可保留；但正文不要再显示这张图
4. 页面效果应更干净、更专业、更高级
5. 不要引入新的正文图片
6. 目录继续保持无 emoji
7. 正文重点块、加粗重点、舒适排版保留

## 验收
执行：
- npm run build
- npm run seo:audit

要求：
- build 通过
- seo:audit Fail: 0
- 第二篇文章正文顶部不再出现那张大图
- 页面可正常访问
- 不破坏其他页面

## 输出报告
请输出：
1. 修改了哪些文件
2. 去掉了哪一段图片内容
3. build 结果
4. seo:audit 结果