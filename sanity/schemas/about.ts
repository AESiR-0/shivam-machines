import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      initialValue: 'Trusted industrial machinery partner',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Built on machine knowledge, long-term trust, and practical industrial support.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue: 'Shivam Enterprise has been serving Indian manufacturers since 1997 with dependable used machine tools, direct advice, and a clear focus on value.',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights (Stats Box)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value (e.g. 1997)' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    }),
    defineField({
      name: 'journeyTitle',
      title: 'Journey Section Title',
      type: 'string',
      initialValue: 'Our Journey',
    }),
    defineField({
      name: 'journeySubtitle',
      title: 'Journey Section Subtitle',
      type: 'string',
      initialValue: 'A business shaped by continuity, expertise, and customer confidence.',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline/Journey Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Point Title' },
            { name: 'body', type: 'text', title: 'Description' },
          ],
        },
      ],
    }),
    defineField({
      name: 'aboutSectionTitle',
      title: 'Main Section Title',
      type: 'string',
      initialValue: 'About Shivam Enterprise',
    }),
    defineField({
      name: 'description',
      title: 'Main Section Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Success Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon Name (Lucide)' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'color', type: 'string', title: 'Color Gradient (CSS classes)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Core Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
  },
})

