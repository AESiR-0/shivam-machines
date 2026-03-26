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
      initialValue: 'Shivam Enterprise has been serving Indian manufacturers since 1997 with dependable used machine tools, direct advice, and a clear focus on value. We help businesses buy with confidence, whether they need a listed machine or want us to source one specifically for their production needs.',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights (Stats Box)',
      type: 'array',
      initialValue: [
        { value: '1997', label: 'Serving Indian industry since' },
        { value: '25+', label: 'Years of machine tool experience' },
        { value: 'Pan India', label: 'Customer support and supply network' },
      ],
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
      name: 'industrialFocus',
      title: 'Industrial Focus Description',
      type: 'text',
      initialValue: 'Horizontal borers, vertical lathes, grinders, milling machines, radial drills, gear machinery, roll grinders, and other industrial equipment selected for practical production use.',
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
      initialValue: [
        {
          title: 'Started with trust',
          body: 'Shivam Enterprise was built around a simple promise: offer reliable used industrial machinery with honest guidance and fair pricing.',
        },
        {
          title: 'Expanded through relationships',
          body: 'Over the years, repeat buyers, referrals, and long-term partnerships helped us grow into a trusted name in machine tools.',
        },
        {
          title: 'Focused on practical value',
          body: 'Today we continue to support manufacturers looking for capable machines, transparent advice, and responsive service.',
        },
      ],
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

