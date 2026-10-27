import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Penerangan pendek untuk Google (maksimum 160 aksara)
    description: z.string().max(160),
    // Sedutan pada senarai artikel (jika kosong, guna description)
    excerpt: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    author: z.string().optional(),
    category: z.string().default('Umum'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // URL lama (cth. dari Blogspot) untuk redirect. Biarkan kosong kalau tak pindah dari blog lain.
    aliases: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, pages };
