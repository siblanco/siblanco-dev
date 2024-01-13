// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define your collection(s)
const blogCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    isDraft: z.boolean(),
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(
      z.enum([
        "astro",
        "apache2",
        "bash",
        "css",
        "devlife",
        "electron",
        "expressjs",
        "general",
        "git",
        "gitbash",
        "html5",
        "javascript",
        "linux",
        "mysql",
        "nodejs",
        "nuxtjs",
        "react-native",
        "reactjs",
        "scss",
        "spotify",
        "ssh",
        "stimulusjs",
        "typescript",
        "vuejs",
        "wordpress",
      ]),
    ),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
};
