import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recentlyAdded',
  title: 'Recently Added Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Recently Added Machines',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      initialValue: 'Added Machines',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'machines',
      title: 'Recently Added Machines',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      description: 'Select machines to show in recently added section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

