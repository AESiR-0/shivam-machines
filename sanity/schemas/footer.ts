import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Shivam Enterprise',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'companyLinks',
      title: 'Company Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
        },
      ],
    }),
    defineField({
      name: 'productLinks',
      title: 'Product Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
        },
      ],
    }),
    defineField({
      name: 'serviceLinks',
      title: 'Service Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
        },
      ],
    }),
    defineField({
      name: 'supportLinks',
      title: 'Support Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
    },
  },
})

