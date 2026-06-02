# 阿岩跨境笔记｜内容生产 SOP

## 一、创建新文章

执行：

npm run content:new

按提示填写：

- 文章标题
- slug
- 分类
- SEO 描述

文章会自动生成到：

src/content/posts/

## 二、编辑文章

打开生成的 md 文件，按模板补齐正文。

建议结构：

1. 这篇文章解决什么问题
2. 核心判断标准
3. AI 可以怎么帮忙
4. 卖家必须自己判断什么
5. 具体执行 SOP
6. 常见误区
7. 最后总结

## 三、发布前检查

执行：

npm run content:publish

它会自动完成：

1. 自动生成文章信息图
2. Astro build
3. Pagefind 搜索索引
4. SEO 体检
5. IndexNow 提交
6. git status

## 四、提交上线

确认页面正常后执行：

git add .
git commit -m "publish content update"
git push

Cloudflare Pages 会自动部署。

## 五、上线后检查

检查：

https://amz.hao1234.top/articles/
https://amz.hao1234.top/search/
https://amz.hao1234.top/sitemap-index.xml

如果是重点文章，再到 Google Search Console 和 Bing Webmaster Tools 请求索引。