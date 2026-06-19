import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const storyCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/story' }),
  schema: z.record(z.any()).optional(),
});

export const collections = {
  'story': storyCollection,
};
