import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dek: z.string().optional(),
    tag: z.enum(['Anime', 'Games', 'Culture', 'Analysis']).default('Anime'),
    date: z.date(),
    readMinutes: z.number().default(6),
    score: z.string().optional(),   // e.g. "8.4" — leave blank for non-reviews
    featured: z.boolean().default(false)
  })
});

export const collections = { posts };
