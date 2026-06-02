# 026｜文章正文重点块与高级阅读样式补强

## 执行者
OpenCode

## 模式
write

## 项目路径
C:\rpg\ayan-crossborder-notes

## 目标
继续优化文章《如何用 AI 做亚马逊关键词表》的阅读体验。

上一轮只完成了目录去 emoji，但正文还不够高级，也缺少明显的重点块和颜色层次。本轮重点补强正文视觉。

## 修改范围
优先只改：

- src/pages/articles/[slug].astro
- src/content/posts/ai-keyword-table.md

## 具体要求

### 1. 正文重点块
在 ai-keyword-table.md 中增加或优化 4 类重点块：

- 导语块：说明这篇文章能解决什么问题
- 提醒块：搜索量高不代表适合你的产品
- 方法块：AI 适合整理、归类、去重、筛选，不适合替你判断
- 总结块：关键词表最后要变成运营动作

可以使用 HTML div，例如：

<div class="article-callout article-callout-blue">
  <strong>💡 这篇能帮你解决什么问题：</strong>
  很多人做关键词表只会临时搜词，这篇直接讲怎么从零整理一张能落到 Listing 和广告里的关键词表。
</div>

注意：
- emoji 只放在 callout 块里
- H2/H3 标题不要 emoji
- 目录不要 emoji

### 2. 高级样式
在文章页样式里增加以下样式：

- .article-callout
- .article-callout-blue
- .article-callout-yellow
- .article-callout-green
- .article-callout-red

视觉要求：
- 浅色背景
- 左侧 4px 色条
- 圆角 16px 左右
- 边框非常浅
- 文字专业克制
- 不要大红大绿
- 不要按钮感
- 不要廉价营销风

### 3. 正文基础阅读体验
增强文章正文样式：

- p 行高更舒适
- strong 加深色和字重
- h2 顶部间距更明显
- h2 左侧可以有蓝色短竖线
- li 行高舒适
- blockquote 不要和 callout 冲突
- 图片继续完整自适应，不要溢出

### 4. 图片保持正常
不要破坏当前图片显示。
要求：
- max-width: 100%
- height: auto
- object-fit: contain
- 不裁切
- 不超出正文容器

### 5. 验收
完成后运行：

npm run build
npm run seo:audit

要求：
- build 通过
- seo:audit Fail: 0
- 文章目录无 emoji
- 正文有 4 个左右明显但高级的重点块
- 页面整体仍专业克制

## 输出报告
请输出：

1. 修改了哪些文件
2. 新增了哪些 callout 样式
3. 正文哪里增加了重点块
4. build / seo:audit 结果