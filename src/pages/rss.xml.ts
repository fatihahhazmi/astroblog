import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '@config/site.config';
import { getPostUrl, getPublishedPosts } from '@utils/posts';

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).slice(0, 50);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.siteUrl,
    customData: `<language>${SITE.language}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getPostUrl(post),
      categories: [post.data.category, ...post.data.tags],
    })),
  });
}
