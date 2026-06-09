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
    homepageSlot: z.string().optional(),
    pathRole: z.string().optional(),
    pathLabel: z.string().optional(),

    prevArticle: z.string().optional(),
    nextArticle: z.string().optional(),
    relatedArticleLinks: z.array(
      z.object({
        slug: z.string(),
        label: z.string(),
        context: z.string().optional()
      })
    ).optional()
  })
});

export const collections = { posts };