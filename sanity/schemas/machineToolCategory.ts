import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'machineToolCategory',
  title: 'Machine Tool Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "Settings", "Wrench")',
    }),
    defineField({
      name: 'count',
      title: 'Machine Count',
      type: 'string',
      description: 'Display count (e.g., "25+ Machines")',
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'URL path for this category',
    }),
    defineField({
      name: 'color',
      title: 'Color Gradient',
      type: 'string',
      description: 'Tailwind gradient classes (e.g., "from-blue-500 to-blue-600")',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which categories appear',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hero image for this category (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      count: 'count',
    },
    prepare({ title, count }) {
      return {
        title,
        subtitle: count,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

