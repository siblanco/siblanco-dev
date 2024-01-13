import { getCollection } from "astro:content";

export const getAllPublishedPosts = async () => {
  const allBlogPosts = await getCollection("blog");
  return allBlogPosts
    .filter((post) => !post.data.isDraft)
    .sort(
      (a, b) =>
        Date.parse(b.data.date as unknown as string) -
        Date.parse(a.data.date as unknown as string),
    );
};

export const getLastestPosts = async (limit: number) => {
  const allBlogPosts = await getAllPublishedPosts();
  return allBlogPosts.slice(0, limit);
};
