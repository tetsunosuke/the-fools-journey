import { defineCollection, z } from 'astro:content';

const storyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    loop: z.number(),
    step: z.number(),
    view: z.enum(['talk', 'chat', 'celtic', 'puzzle']),
    arcana: z.string(),
    speaker: z.string(),
    stressChange: z.number().default(0),
    luckChange: z.number().default(0),
    choiceIllusion: z.boolean().optional(),
    focusImage: z.string().optional(),
    focusTitle: z.string().optional(),
    choices: z.array(z.object({
      id: z.number(),
      title: z.string(),
      upright: z.boolean(),
      desc: z.string(),
      skipFocus: z.boolean().optional(),
      correct: z.boolean().optional()
    })).optional()
  }),
});

export const collections = {
  'story': storyCollection,
};
