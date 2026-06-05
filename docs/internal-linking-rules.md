# 文章内部链接规则

## 1. 系列导航字段（frontmatter）

每篇文章的 frontmatter 支持三个导航字段，均在 `src/content.config.ts` 中定义为可选字段：

### prevArticle / nextArticle
```yaml
prevArticle: some-article-slug
nextArticle: some-article-slug
```
- 指向同一链路中的上一篇/下一篇
- 值必须是 `src/content/posts/` 下的文件名（不含 `.md`）
- 第 1 篇不设 `prevArticle`，最后 1 篇不设 `nextArticle`

### relatedArticleLinks
```yaml
relatedArticleLinks:
  - slug: some-article-slug
    label: 简短名称
    context: 系列第 N 篇
```
- `slug`：目标文章文件名（不含 `.md`）
- `label`：简短可读名称，显示在卡片标题位置
- `context`：系列编号标识（如"选品第 1 篇"），显示为蓝色醒目标签

## 2. 组件渲染行为

`src/components/ArticleNavHints.astro` 负责渲染导航：

- **prevArticle / nextArticle 卡片**：显示标签（优先取 `relatedArticleLinks` 中匹配 slug 的 `context`，回退为"上一篇"/"下一篇"）和标题（优先取 `label`，回退为文章 `title`）
- **relatedArticleLinks 卡片**：`context` 作为蓝色主标签，`label` 作为副标题

## 3. 链接行为
- 所有导航链接：`target="_blank" rel="noopener noreferrer"`
- 不在文章正文中硬编码内部链接；优先通过 frontmatter 控制

## 4. 哪些页面适合系列导航

| 适合 | 不适合 |
|------|--------|
| 同一主题下 3-5 篇的系列文章 | 学习路径入口页（如 `*-learning-path`） |
| 有明确顺序的教学内容 | 资料包说明页（如 `ai-operations-resource-pack`） |
| 同一链路对应同一 `topic` | 工具评测/对比类单篇（如 `amazon-ai-tools-review`） |

## 5. context 命名规范

```
{系列名} 第 {N} 篇
```

示例：
- `选品第 1 篇`
- `关键词第 2 篇`
- `Listing 第 3 篇`
- `PPC 第 1 篇`
- `Review 第 2 篇`
- `AI 搜索第 1 篇`

## 6. 链路配置示例

```yaml
# 第 1 篇
nextArticle: article-2
relatedArticleLinks:
  - slug: article-2
    label: 第二篇简短名称
    context: 系列第 2 篇

# 第 2 篇（中间篇）
prevArticle: article-1
nextArticle: article-3
relatedArticleLinks:
  - slug: article-1
    label: 第一篇简短名称
    context: 系列第 1 篇
  - slug: article-3
    label: 第三篇简短名称
    context: 系列第 3 篇

# 第 3 篇（最后篇）
prevArticle: article-2
relatedArticleLinks:
  - slug: article-1
    label: 第一篇简短名称
    context: 系列第 1 篇
  - slug: article-2
    label: 第二篇简短名称
    context: 系列第 2 篇
```

## 7. 新增文章必须检查
- 是否属于某个现有链路 → 如果是，补全该链路的 prev/next/related 字段
- 是否能形成新链路 → 如果是，规划 3 篇链路并统一配置
- 是否不属于任何链路 → 留空导航字段，不强行配置
