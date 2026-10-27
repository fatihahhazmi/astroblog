import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Alamat laman diambil daripada tetapan yang sama dengan yang diedit dalam Pages CMS
const settings = JSON.parse(readFileSync(new URL('./src/content/settings/site.json', import.meta.url), 'utf8'));

export default defineConfig({
  site: settings.siteUrl,
  integrations: [
    sitemap({
      filter: (page) => !['/search/', '/404/'].includes(new URL(page).pathname),
    }),
  ],
  build: { format: 'directory' },
});
