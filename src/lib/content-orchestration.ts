import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

export interface ArticleLink {
  href: string;
  title: string;
}

export interface LearningPathArticle {
  href: string;
  title: string;
  pathRole: "primary" | "secondary";
  pathLabel: string;
  seriesOrder: number;
}

function priorityRank(p: string | undefined): number {
  if (p === "high") return 3;
  if (p === "medium") return 2;
  if (p === "low") return 1;
  return 0;
}

const TOPIC_NAMES: Record<string, string> = {
  keyword: "关键词",
  listing: "Listing",
  ppc: "PPC",
  review: "Review",
  "ai-search": "AI 搜索",
  tools: "工具",
  selection: "选品",
};

export function getPostsByTopic(
  allPosts: Post[],
  topicId: string,
  max = 4,
): ArticleLink[] {
  return sortPosts(
    allPosts.filter(
      (p) =>
        !p.data.draft &&
        p.data.topic === topicId &&
        p.data.articleType !== "learning-path",
    ),
  )
    .slice(0, max)
    .map(toLink);
}

export function getPostsBySlot(
  allPosts: Post[],
  slot: string,
  max = 4,
): ArticleLink[] {
  return sortPosts(
    allPosts.filter(
      (p) => !p.data.draft && p.data.homepageSlot === slot,
    ),
  )
    .slice(0, max)
    .map(toLink);
}

export function getLearningPathArticles(
  allPosts: Post[],
  topicId: string,
): { primary: LearningPathArticle[]; secondary: LearningPathArticle[] } {
  const matched = allPosts.filter(
    (p) =>
      !p.data.draft &&
      p.data.topic === topicId &&
      p.data.articleType !== "learning-path",
  );

  const mapped: LearningPathArticle[] = matched.map((p) => {
    const order =
      typeof p.data.seriesOrder === "number"
        ? p.data.seriesOrder
        : typeof p.data.seriesOrder === "string"
          ? parseInt(p.data.seriesOrder, 10) || 999
          : 999;
    return {
      href: `/posts/${p.id}/`,
      title: p.data.title,
      pathRole: (p.data.pathRole === "primary" || p.data.pathRole === "secondary")
        ? p.data.pathRole
        : "primary",
      pathLabel: p.data.pathLabel || "",
      seriesOrder: order,
    };
  });

  const sorted = mapped.sort((a, b) => {
    if (a.seriesOrder !== b.seriesOrder) return a.seriesOrder - b.seriesOrder;
    const pa = priorityRank("high");
    const pb = priorityRank("high");
    if (pa !== pb) return pb - pa;
    return 0;
  });

  return {
    primary: sorted.filter((a) => a.pathRole === "primary"),
    secondary: sorted.filter((a) => a.pathRole === "secondary"),
  };
}

function sortPosts(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const fa = a.data.featured === true ? 0 : 1;
    const fb = b.data.featured === true ? 0 : 1;
    if (fa !== fb) return fa - fb;

    const pa = priorityRank(a.data.priority);
    const pb = priorityRank(b.data.priority);
    if (pa !== pb) return pb - pa;

    return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
  });
}

function toLink(post: Post): ArticleLink {
  return {
    href: `/posts/${post.id}/`,
    title: post.data.title,
  };
}
