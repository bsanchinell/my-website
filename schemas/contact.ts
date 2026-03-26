import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
    }),
    defineField({
      name: 'checklistItems',
      title: 'Checklist Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  __experimental_actions: ['update', 'publish'],
});
