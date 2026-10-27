import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './slugify';

export type BlogPost = CollectionEntry<'blog'>;

export interface Term {
  name: string;
  slug: string;
  count: number;
}

export const getPostSlug = (post: BlogPost): string => post.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
export const getPostUrl = (post: BlogPost): string => `/${getPostSlug(post)}/`;
export const getCategoryUrl = (name: string): string => `/category/${slugify(name)}/`;
export const getTagUrl = (name: string): string => `/tag/${slugify(name)}/`;

/** Semua artikel, terbaru dahulu. Draf disembunyikan di laman sebenar. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Seragamkan laluan gambar: "images/x.jpg", "./images/x.jpg", "public/images/x.jpg" -> "/images/x.jpg" */
export function normalizeImagePath(src: string): string {
  const value = src.trim();
  if (/^(?:https?:)?\/\//.test(value)) return value;
  const path = value.replace(/^\.?\/?(?:public\/)?/, '/');
  try {
    return encodeURI(decodeURI(path));
  } catch {
    return path;
  }
}

export const getPostImage = (post: BlogPost): string | undefined =>
  post.data.coverImage ? normalizeImagePath(post.data.coverImage) : undefined;

export const formatDate = (date: Date, style: 'short' | 'long' = 'short'): string =>
  date.toLocaleDateString('ms-MY', {
    day: '2-digit',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  });

export const readingTime = (body: string): number =>
  Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 200));

function groupTerms(names: string[]): Term[] {
  const map = new Map<string, Term>();
  for (const raw of names) {
    const name = raw.trim();
    const slug = slugify(name);
    if (!name || !slug) continue;
    const existing = map.get(slug);
    if (existing) existing.count += 1;
    else map.set(slug, { name, slug, count: 1 });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'ms'));
}

export const getCategories = (posts: BlogPost[]): Term[] => groupTerms(posts.map((p) => p.data.category));
export const getTags = (posts: BlogPost[]): Term[] => groupTerms(posts.flatMap((p) => p.data.tags));
