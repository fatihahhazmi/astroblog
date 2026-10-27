import settings from '../content/settings/site.json';
import { DEFAULT_THEME, THEMES, isTheme, type ThemeName } from '../themes/registry';

const theme: ThemeName = isTheme(settings.theme) ? settings.theme : DEFAULT_THEME;

export const SITE = {
  siteUrl: settings.siteUrl.replace(/\/$/, ''),
  title: settings.title,
  tagline: settings.tagline ?? '',
  description: settings.description,
  author: settings.author,
  language: settings.language || 'ms-MY',
  locale: (settings.language || 'ms-MY').replace('-', '_'),
  defaultOgImage: '/images/uploads/og-default.svg',
  postsPerPage: Math.max(1, Number(settings.postsPerPage) || 6),
  theme,
  themeInfo: THEMES[theme],
  social: Object.entries(settings.social ?? {})
    .filter(([, url]) => typeof url === 'string' && url.trim() !== '')
    .map(([name, url]) => ({ name, url: String(url) })),
};
