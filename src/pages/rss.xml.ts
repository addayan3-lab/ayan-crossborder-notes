import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const site = "https://amz.hao1234.top";

export async function GET(context) {
  const posts = (await getCollection("posts", ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "阿岩跨境笔记",
    description: "亚马逊卖家的 AI 运营实战知识站：选品、Listing 优化、广告 PPC、Review 分析、工具模板和运营 SOP。",
    site: context.site ?? site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/articles/${post.id}/`,
      categories: [post.data.category, ...(post.data.tags || [])].filter(Boolean)
    })),
    customData: "<language>zh-cn</language>",
    stylesheet: false
  });
}
