/**
 * Senarai tema. Untuk tukar reka bentuk blog, ubah `theme` dalam
 * Tetapan Blog (Pages CMS) atau src/content/settings/site.json.
 * Setiap tema ada fail CSS dalam src/styles/themes/<nama>.css
 */
export const THEMES = {
  koran: {
    label: 'Koran (Editorial)',
    themeColor: '#fbfaf7',
    fonts:
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap',
  },
  majalah: {
    label: 'Majalah',
    themeColor: '#ffffff',
    fonts:
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap',
  },
  minimal: {
    label: 'Minimal (teks sahaja)',
    themeColor: '#ffffff',
    fonts: '', // fon sistem sahaja, paling laju
  },
  jurnal: {
    label: 'Jurnal Peribadi',
    themeColor: '#f3ead6',
    fonts:
      'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap',
  },
  neon: {
    label: 'Gelap Neon',
    themeColor: '#0b0d14',
    fonts:
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap',
  },
  rencana: {
    label: 'Rencana Panjang',
    themeColor: '#ffffff',
    fonts:
      'https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,800;1,7..72,400&display=swap',
  },
} as const;

export type ThemeName = keyof typeof THEMES;
export const DEFAULT_THEME: ThemeName = 'koran';

export const isTheme = (value: unknown): value is ThemeName =>
  typeof value === 'string' && value in THEMES;
