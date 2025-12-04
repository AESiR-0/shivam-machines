import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product/Machine',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Boring Machines', value: 'boring' },
          { title: 'Grinding Machines', value: 'grinding' },
          { title: 'Lathe Machines', value: 'lathe' },
          { title: 'CNC Machines', value: 'cnc' },
          { title: 'Gear Machines', value: 'gear' },
          { title: 'Milling Machines', value: 'milling' },
          { title: 'Drill Machines', value: 'drill' },
          { title: 'Others', value: 'others' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'text',
      description: 'Technical specifications',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'isInStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'dateAdded',
      title: 'Date Added',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Price or price range',
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'Excellent', value: 'excellent' },
          { title: 'Very Good', value: 'very-good' },
          { title: 'Good', value: 'good' },
          { title: 'Fair', value: 'fair' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'images.0',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
})

