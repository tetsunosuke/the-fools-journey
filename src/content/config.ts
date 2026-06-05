import { defineCollection, z } from 'astro:content';

const storyCollection = defineCollection({
  type: 'content',
  schema: z.record(z.any()).optional(),
});

export const collections = {
  'story': storyCollection,
};
