# Catatan Optimasi PageSpeed

## Yang diubah
1. **Satu file CSS** `assets/css/bundle.min.css` menggantikan 7 file CSS yang memblokir render (Bootstrap, Bootstrap Icons, AOS, Swiper, GLightbox, Font Awesome, main.css). Bootstrap sudah dibersihkan dari class yang tidak dipakai.
2. **Font ikon di-subset**: Bootstrap Icons 134 KB -> ~11 KB, Font Awesome 115 KB -> ~2 KB (hanya ikon yang dipakai), plus `font-display: swap`.
3. **Google Fonts** dikurangi (Roboto 400/500/700 + Inter variabel 400-700) dan dimuat tanpa memblokir render.
4. **Gambar** dikecilkan (logo 512->160 px, avatar 1024->256 px, foto lain maks 800 px, hero 1280 px). Total gambar 3,5 MB -> 1,4 MB.
5. **Hero beranda**: gambar slide pertama di-preload (`fetchpriority=high`), slide 2 dan 3 dimuat setelah halaman selesai, dan atribut `data-aos` di hero dihapus (sebelumnya teks hero tersembunyi sampai event `load`). AOS kini diinisialisasi saat DOM siap.
6. **Aksesibilitas**: `aria-label` pada `<select>`, `role="img"` pada penanda status, `alt=""` pada logo (teks "Medical" sudah ada di sebelahnya), warna tombol/nama situs diperdalam agar kontras cukup.
7. **vercel.json**: cache panjang untuk gambar/font dan cache pendek-revalidate untuk CSS/JS.

## Penting kalau mengedit CSS
`bundle.min.css` adalah hasil gabungan. Jika Anda mengubah `assets/css/main.css`, perubahan itu tidak akan terlihat sampai bundle dibuat ulang. Untuk perubahan kecil, edit langsung `bundle.min.css` atau minta saya membuat ulang bundle-nya.
File vendor lama tetap ada di folder `assets/vendor` (tidak lagi dipakai halaman) sebagai cadangan.

---

## Putaran 2 (4 Okt 2026)
1. **Bug font ikon**: `bundle.min.css` masih memuat @font-face Bootstrap Icons penuh (131 KB, `font-display: block`) di bagian atas, sehingga browser tetap mengunduhnya. Dihapus. Karena 40 ikon yang dipakai halaman ternyata tidak ada di font subset, subset dibuat ulang dari font penuh (kini 147 ikon, ~12 KB) agar semua ikon tetap tampil.
2. **CSS**: 2.078 aturan ikon (hanya 147 dipakai) + duplikat dihapus. Ukuran gzip bundle 67 KB -> 50 KB.
3. **Font self-host**: Google Fonts diganti file lokal di `assets/fonts` (Inter variabel + Roboto 400/500/700, subset latin) dengan `preload` Inter dan Roboto 400. Tidak ada lagi koneksi ke fonts.googleapis.com / fonts.gstatic.com.
4. **Gambar**: logo 160 -> 128 px; logo klien 400x150 -> 360x135 px, plus atribut `width`/`height`.
5. **Aksesibilitas**: `role="img"` pada `.review-rating`; urutan heading diperbaiki (h2 -> h3, footer h4 -> h3, CSS disesuaikan); tautan "Lihat Detail" diberi `aria-label` unik.
6. **Cache**: `vercel.json` kini cache 1 tahun + immutable untuk semua aset. `bundle.min.css` dan `main.js` diberi `?v=20261007`; **ubah angka ini setiap kali Anda mengedit CSS/JS** supaya pengunjung mendapat versi terbaru.

---

## Putaran 3 (7 Okt 2026)
1. **Fix Tampilan Mobile Layanan Unggulan (`.service-card`)**: Memperbaiki urutan CSS media query yang sebelumnya menyebabkan `@media (max-width: 768px)` menimpa `@media (max-width: 576px)`. Pada tampilan mobile, banner gambar kini memenuhi lebar kartu (100%), kartu bertipe kolom vertikal dengan `height: auto; min-height: 100%`, dan padding bawah kartu diperbaiki sehingga tombol/link "Lihat Detail" tidak lagi terpotong.
2. **Cache Buster**: Query string `bundle.min.css` diperbarui ke `?v=20261007` pada semua file HTML.

