import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Type-check frontmatter using a schema
// portfolios
const portfolios = defineCollection({
  // type: "content",
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/data/portfolios',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      heroImage: image(),
      clients: z.array(z.string()),
      location: z.string(),
      images: z.array(
        z.object({
          row: z
            .array(image())
            .refine((arr) => [1, 2, 3].includes(arr.length), {
              message: 'Each sub-array must contain 1, 2, or 3 items',
            }),
        }),
      ),
      // Transform string to Date object
      date: z.coerce.date(),
      order: z.number(),
      // will be excluded from build if draft is "true"
      draft: z.boolean().optional(),
    }),
});

// testimonials
const testimonials = defineCollection({
  // type: "content",
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/data/testimonials',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      testimonial: z.string(),
      image: image(),
      order: z.number(),
      // will be excluded from build if draft is "true"
      draft: z.boolean().optional(),
    }),
});

// other pages
const otherPages = defineCollection({
  // type: "content",
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/data/otherPages',
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().optional(),
    }),
});

const frequentlyAskedQuestions = defineCollection({
  // type: "content",
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/data/faq',
  }),
  schema: () =>
    z.object({
      question: z.string(),
      order: z.number().optional(),
      draft: z.boolean().optional(),
    }),
});

const instructors = defineCollection({
  // type: "content",
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/data/instructors',
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image().optional(),
      order: z.number().optional(),
      draft: z.boolean().optional(),
    }),
});

const staticSections = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/data/staticSections',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      image: image().optional(),
      quoteAuthor: z.string().optional(),
    }),
});

export const collections = {
  portfolios,
  testimonials,
  otherPages,
  frequentlyAskedQuestions,
  instructors,
  staticSections,
};
