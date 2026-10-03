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
