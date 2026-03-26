import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full bio shown on the About page',
    }),
    defineField({
      name: 'timeline',
      title: 'Career Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'timelineEntry',
          title: 'Timeline Entry',
          fields: [
            defineField({ name: 'orgName', title: 'Organization Name', type: 'string' }),
            defineField({ name: 'title', title: 'Job Title', type: 'string' }),
            defineField({ name: 'dates', title: 'Dates', type: 'string', description: 'e.g. 2020–Present' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
          preview: {
            select: { title: 'orgName', subtitle: 'dates' },
          },
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  __experimental_actions: ['update', 'publish'],
});
