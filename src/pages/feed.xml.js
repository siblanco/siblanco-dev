import rss from "@astrojs/rss";

import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { getAllPublishedPosts } from "../utils";
const parser = new MarkdownIt();

export async function GET() {
  const posts = await getAllPublishedPosts();

  return rss({
    title: "Siblanco Software Development | Blog",
    description:
      "Beiträge über's coden und mehr. Der Content ergibt sich durch Projekte und Hobbies von mir.",
    site: "https://siblanco.dev",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
    customData: `<language>de-DE</language><copyright>© Siblanco - Alle Rechte vorbehalten.</copyright>`,
  });
}
