import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

export interface ArticleLink {
  href: string;
  title: string;
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

function priorityRank(p: string | undefined): number {
  if (p === "high") return 3;
  if (p === "medium") return 2;
  if (p === "low") return 1;
  return 0;
}

function toLink(post: Post): ArticleLink {
  return {
    href: `/posts/${post.id}/`,
    title: post.data.title,
  };
}

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
