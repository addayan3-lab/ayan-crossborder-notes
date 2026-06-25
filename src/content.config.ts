import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),

    topic: z.enum(["keyword", "listing", "ppc", "review", "selection", "ai-search", "tools"]).optional(),
    stage: z.enum(["新手", "进阶", "实操"]).optional(),
    intent: z.enum(["学习", "工具", "决策", "避坑"]).optional(),
    relatedTopics: z.array(z.string()).optional(),
    publicLessonUse: z.string().optional(),
    leadMagnet: z.string().optional(),
    wechatHook: z.string().optional(),

    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    articleType: z.string().optional(),
    hookType: z.enum(["避坑", "反常识", "数字冲击", "案例复盘", "政策解读"]).optional(),
    featured: z.boolean().default(false),
    priority: z.union([z.enum(["high", "medium", "low"]), z.number()]).optional(),
    resourceSlug: z.string().optional(),
    openClassSlug: z.string().optional(),
    homepageSlot: z.string().optional(),
    pathRole: z.string().optional(),
    pathLabel: z.string().optional(),
    learningPathAutoArticles: z.boolean().default(false),

    prevArticle: z.string().optional(),
    nextArticle: z.string().optional(),
    relatedArticleLinks: z.array(
      z.object({
        slug: z.string(),
        label: z.string(),
        context: z.string().optional()
      })
    ).optional(),

    updateType: z.enum(["evergreen", "policy-sensitive", "platform-update", "news-brief"]).optional(),
    updateStatus: z.enum(["current", "watching", "needs-review", "outdated"]).optional(),
    lastReviewed: z.coerce.date().optional(),
    nextReviewDue: z.coerce.date().optional(),
    reviewCadenceDays: z.number().optional(),
    updateNote: z.string().optional(),
    sourceUrls: z.array(z.string()).optional()
  })
});

export const collections = { posts };
