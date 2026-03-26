import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      description: 'Main headline in the hero section (supports line breaks)',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Bio Text',
      type: 'text',
      description: 'Bio preview text shown in the About Bryan section',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        defineField({ name: 'budgets', title: 'Budgets Managed', type: 'string' }),
        defineField({ name: 'recruitment', title: 'Recruitment Metric', type: 'string' }),
        defineField({ name: 'retention', title: 'Retention Rate', type: 'string' }),
        defineField({ name: 'programs', title: 'Programs Built', type: 'string' }),
      ],
    }),
  ],
  __experimental_actions: ['update', 'publish'],
});
