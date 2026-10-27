# Template Blog (Astro + Pages CMS + Cloudflare)

Blog laju, percuma dihos, dengan **6 reka bentuk** yang boleh ditukar melalui satu pilihan dalam Pages CMS.
Tulis artikel seperti menulis dalam WordPress: tiada kod diperlukan.

| Tema | Rasa |
|---|---|
| `koran` | Surat khabar: serif tebal, lajur, artikel utama besar |
| `majalah` | Grid visual, gambar besar dengan teks atas gambar |
| `minimal` | Teks sahaja, fon mono, paling laju |
| `jurnal` | Buku nota: kertas bergaris, tulisan tangan, garis masa |
| `neon` | Mod gelap, aksen bercahaya, sesuai blog teknologi |
| `rencana` | Satu lajur sempit, taip besar untuk bacaan panjang |

---

## Untuk penulis (bukan teknikal): 5 langkah

### 1. Daftar GitHub dan salin template
1. Daftar akaun percuma di <https://github.com>.
2. Buka repo template ini, tekan **Use this template → Create a new repository**.
3. Beri nama (cth. `blog-saya`), pilih **Private** atau **Public**, tekan **Create repository**.

### 2. Hidupkan blog di Cloudflare Pages (percuma)
1. Daftar di <https://dash.cloudflare.com>. Pergi ke **Workers & Pages → Create → Pages → Connect to Git**.
2. Pilih repo `blog-saya`.
3. Isi tetapan binaan:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `20`
4. Tekan **Save and Deploy**. Tunggu 2 hingga 3 minit. Cloudflare beri alamat seperti `blog-saya.pages.dev`.

### 3. Sambung Pages CMS (tempat anda menulis)
1. Buka <https://app.pagescms.org> dan log masuk dengan GitHub.
2. Pilih repo `blog-saya`. Anda akan nampak menu: **Tetapan Blog**, **Halaman Tentang**, **Artikel Blog**.

### 4. Tetapkan blog anda
Dalam **Tetapan Blog**: isi nama blog, tagline, nama penulis, dan **Alamat Blog** (alamat `.pages.dev` tadi, tanpa `/` di hujung).
Pilih **Reka Bentuk (Tema)**, simpan, dan tunggu 2 minit. Muat semula blog untuk lihat rupa baharu. Tukar tema bila-bila masa, artikel tak terjejas.

### 5. Tulis artikel
**Artikel Blog → Tambah**: isi tajuk, penerangan (maks 160 aksara, untuk Google), tarikh, kategori, gambar utama, dan isi.
- Letak gambar di tengah artikel: tekan ikon gambar dalam editor.
- Belum mahu terbit? Tick **Draf**.
- Tekan **Save**. Blog dikemas kini sendiri dalam 1 hingga 2 minit.

---

## Formula matematik (pilihan)
Dalam mod **Source** di editor, tulis `\\( x^2 \\)` untuk formula dalam baris dan `\\[ x^2 \\]` untuk formula berasingan (dua garis condong). Lihat artikel contoh.

## Domain sendiri
Cloudflare Pages → projek → **Custom domains → Set up a domain**. Lepas itu tukar **Alamat Blog** dalam Tetapan Blog dan alamat `Sitemap:` dalam `public/robots.txt`.

## Google Search Console
Daftar di <https://search.google.com/search-console>, tambah domain, dan hantar `sitemap-index.xml`.

---

## Untuk pembuat template (anda)

Sebelum beri kepada kawan:
1. Jalankan `npm install` sekali di komputer anda, kemudian **commit `package-lock.json`**. Ini mengunci versi pakej supaya build Cloudflare sentiasa sama (template ini dihantar tanpa lockfile).
2. `npm run check` menyemak kandungan, `npm run dev` untuk pratonton setempat.
3. Jadikan repo ini **Template repository**: GitHub → Settings → centang *Template repository*.

### Struktur
```
src/content/settings/site.json   nama, tagline, tema, media sosial (disunting melalui CMS)
src/content/blog/                artikel (.md)
src/content/pages/tentang.md     halaman Tentang
src/themes/registry.ts           senarai tema dan fon
src/styles/base.css              gaya asas (pembolehubah warna/fon)
src/styles/themes/<tema>.css     satu fail setiap tema
src/components/ + src/pages/     markup yang sama untuk semua tema
```

### Tambah tema baharu
1. Salin `src/styles/themes/minimal.css` kepada `src/styles/themes/<nama>.css` dan tukar `[data-theme='minimal']` kepada `[data-theme='<nama>']`.
2. Tambah `import '../styles/themes/<nama>.css';` dalam `src/layouts/BaseLayout.astro`.
3. Tambah entri dalam `src/themes/registry.ts`, dalam `scripts/check-content.mjs` (senarai `themes`) dan pilihan `theme` dalam `.pages.yml`.

Semua tema berkongsi markup yang sama, jadi reka bentuk dikawal oleh CSS: kelas utama ialah `.posts`, `.post-card`, `.article`, `.prose`.

### Fon
Fon Google dimuat ikut tema (`registry.ts`). Tema `minimal` guna fon sistem sahaja. Jika mahu elak Google Fonts, kosongkan `fonts` pada tema berkenaan.

### Pindah dari Blogspot (pilihan)
Medan `aliases:` pada artikel menyimpan URL lama, tetapi template ini **tidak** menjana redirect secara automatik. Untuk migrasi penuh (redirect 301, import artikel), guna skrip dalam repo blog asal.
