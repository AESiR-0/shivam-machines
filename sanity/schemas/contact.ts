import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      initialValue: 'Touch',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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

