import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Text shown in the badge (e.g., "Trusted Since 1997")',
      initialValue: 'Trusted Since 1997',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'Main heading text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      description: 'Highlighted part of title (shown in orange)',
    }),
    defineField({
      name: 'titleSuffix',
      title: 'Title Suffix',
      type: 'string',
      description: 'Last part of title',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Hero section description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of features shown with checkmarks',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Explore Machines',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      initialValue: '/products',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'Watch Demo',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
      description: 'Statistics shown below the buttons',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main hero image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

