#!/usr/bin/env node
/** Semakan pantas kandungan sebelum build: npm run check */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const errors = [];
const warnings = [];

const settings = JSON.parse(readFileSync(path.join(root, 'src/content/settings/site.json'), 'utf8'));
const themes = ['koran', 'majalah', 'minimal', 'jurnal', 'neon', 'rencana'];
if (!themes.includes(settings.theme)) errors.push(`Tema "${settings.theme}" tidak wujud. Pilih: ${themes.join(', ')}`);
if (!/^https?:\/\//.test(settings.siteUrl)) errors.push('siteUrl mesti bermula dengan https://');
if (/\/$/.test(settings.siteUrl)) warnings.push('siteUrl tak perlu / di hujung.');
if (/contoh\.pages\.dev/.test(settings.siteUrl)) warnings.push('siteUrl masih alamat contoh. Tukar kepada alamat blog sebenar.');

const dir = path.join(root, 'src/content/blog');
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const text = readFileSync(path.join(dir, file), 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) { errors.push(`${file}: tiada frontmatter (---)`); continue; }
  const fm = match[1];
  for (const key of ['title', 'description', 'pubDate']) {
    if (!new RegExp(`^${key}:`, 'm').test(fm)) errors.push(`${file}: tiada "${key}"`);
  }
  const desc = fm.match(/^description:\s*["']?(.*?)["']?\s*$/m);
  if (desc && desc[1].length > 160) errors.push(`${file}: description ${desc[1].length} aksara (maks 160)`);
  const cover = fm.match(/^coverImage:\s*["']?(.+?)["']?\s*$/m);
  if (cover && !/^https?:/.test(cover[1])) {
    const file2 = path.join(root, 'public', cover[1].replace(/^\.?\/?(public\/)?/, ''));
    if (!existsSync(file2)) errors.push(`${file}: gambar ${cover[1]} tiada dalam public/`);
  }
  if (/data:image\/[a-z+]+;base64/i.test(text)) errors.push(`${file}: ada gambar base64 dalam isi (akan gagalkan build). Muat naik gambar sebagai fail.`);
}

warnings.forEach((w) => console.warn('  amaran  ' + w));
errors.forEach((e) => console.error('  RALAT   ' + e));
console.log(errors.length ? `\nGAGAL: ${errors.length} ralat.` : '\nLULUS: tiada ralat.');
process.exit(errors.length ? 1 : 0);
