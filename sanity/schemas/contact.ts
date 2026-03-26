import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue: 'Ready to find the perfect machinery solution for your business? Contact our experts today for personalized assistance and quotes.',
    }),
    defineField({
      name: 'title',
      title: 'Contact Section Title',
      type: 'string',
      initialValue: 'Contact Information',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', type: 'string', title: 'Type', options: { list: ['phone', 'email', 'address', 'hours'] } },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'details', type: 'array', of: [{ type: 'string' }], title: 'Details' },
            { name: 'color', type: 'string', title: 'Color Gradient' },
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

