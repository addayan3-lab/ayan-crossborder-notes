# Report 141-146: Article Context Navigation (v01)

## Summary

Added `prevArticle` / `nextArticle` / `relatedArticleLinks` frontmatter navigation to articles, with a new `ArticleNavHints.astro` component integrated into the article template.

## Changes

### Schema (`src/content.config.ts`)
- Added 3 optional fields: `prevArticle` (string), `nextArticle` (string), `relatedArticleLinks` (array of `{slug, label, context?}`)
- All fields are optional — zero impact on articles that don't use them

### Component (`src/components/ArticleNavHints.astro`)
- New 220-line component rendering prev/next cards and related article pills
- Prev/next: two-card horizontal layout with arrow + title (falls back to single card if only one exists)
- Related links: pill-style chips with label + headline + context, wrapped in flex container
- All links use `target="_blank" rel="noopener noreferrer"`
- Resolves article titles from `allPosts` index at render time
- Responsive: prev/next stack vertically on mobile

### Integration (`src/pages/articles/[slug].astro`)
- Imported `ArticleNavHints`
- Placed between article header metadata and `<section class="article-content">` (line 193)

### Frontmatter (3 pilot articles)

| Article | prevArticle | nextArticle | relatedArticleLinks |
|---|---|---|---|
| `ai-market-size-estimate` | — | `ai-competitor-matrix` | 选品第 2 篇, 选品第 4 篇 |
| `ai-competitor-matrix` | `ai-market-size-estimate` | `selection-pain-reverse` | 选品第 1 篇, 选品第 4 篇 |
| `selection-pain-reverse` | `ai-competitor-matrix` | — | 选品第 1 篇, 选品第 2 篇 |

## QA Results

| Check | Result |
|---|---|
| Build | 51 pages, 0 failures |
| `images:check` | 49/0/0/0 |
| `seo:audit` | 408/0 |

## Files Modified
- `src/content.config.ts` — schema fields
- `src/components/ArticleNavHints.astro` — new component
- `src/pages/articles/[slug].astro` — import + placement
- `src/content/posts/ai-market-size-estimate.md` — nav frontmatter
- `src/content/posts/ai-competitor-matrix.md` — nav frontmatter
- `src/content/posts/selection-pain-reverse.md` — nav frontmatter
