# Sistem Pemantauan Data Bencana Indonesia

Website interaktif berbasis cloud yang menyajikan informasi real-time mengenai bencana alam di Indonesia dengan memanfaatkan teknologi React, Leaflet.js, dan Amazon Web Services (AWS). Sistem ini dirancang untuk memberikan akses mudah dan cepat kepada masyarakat serta pemangku kepentingan terkait mitigasi bencana.

[![Live Demo](https://img.shields.io/badge/Live_Demo-00A4EF?style=for-the-badge&logo=web&logoColor=white)](https://zekia-map-bencana-indonesia.vercel.app/)  
[![Documentation](https://img.shields.io/badge/Documentation-00A4EF?style=for-the-badge&logo=book&logoColor=white)](https://drive.google.com/file/d/1/documentation-link)


## Gambaran Umum

Proyek ini dirancang untuk memvisualisasikan data bencana alam secara real-time menggunakan peta interaktif yang dilengkapi dengan ikon spesifik untuk setiap jenis bencana. Sistem ini memanfaatkan teknologi cloud AWS untuk menjamin skalabilitas dan ketersediaan informasi, serta dirancang responsif agar dapat diakses melalui berbagai perangkat.


## Fitur Utama

- **Real-Time Data**: Informasi bencana terkini langsung dari API BMKG.  
- **Peta Interaktif**: Pengguna dapat mengeksplorasi lokasi bencana dengan fitur zoom, drag, dan klik ikon untuk detail informasi.  
- **Filter Bencana**: Memilih jenis bencana tertentu seperti gempa bumi, banjir, atau tsunami.  
- **Mode Terang/Gelap**: Tampilan yang dapat disesuaikan untuk kenyamanan pengguna.  
- **Responsif**: Dapat diakses dengan optimal di perangkat desktop, tablet, maupun ponsel.


## Teknologi yang Digunakan

![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)  
![AWS](https://img.shields.io/badge/-AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)  
![Vercel](https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)  
![Leaflet.js](https://img.shields.io/badge/-Leaflet.js-199900?style=for-the-badge&logo=leaflet&logoColor=white)  
![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Instalasi dan Konfigurasi

1. **Clone repositori:**
   ```bash
   git clone https://github.com/username/project-name.git
   cd project-name
   ```

2. **Instalasi dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi file `.env`:**
   Buat file `.env` di root proyek dan masukkan variabel-variabel berikut:
   ```env
   REACT_APP_BMKG_API_KEY=your-api-key
   REACT_APP_AWS_ACCESS_KEY_ID=your-aws-access-key
   REACT_APP_AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   ```

4. **Menjalankan aplikasi lokal:**
   ```bash
   npm run dev
   ```

5. **Deployment ke Vercel:**
   - Hubungkan repositori ke akun Vercel.
   - Atur variabel lingkungan yang sama pada pengaturan proyek di Vercel.
   - Lakukan deployment melalui dashboard Vercel.


## Cara Penggunaan

1. **Akses Website**: Buka [website](https://zekia-map-bencana-indonesia.vercel.app/) melalui browser.  
2. **Eksplorasi Peta**: Gunakan fitur zoom dan drag untuk menjelajahi lokasi bencana di seluruh Indonesia.  
3. **Klik Ikon Bencana**: Dapatkan detail informasi seperti jenis bencana, lokasi, waktu, dan tingkat keparahan.  
4. **Gunakan Filter**: Pilih jenis bencana tertentu melalui tombol di sisi kanan layar.  
5. **Mode Tampilan**: Ubah mode terang/gelap melalui tombol di sudut kanan atas.

## Contoh Tampilan

### Peta Interaktif
![](./readmemedia/sslightmode.png)

### Filter Jenis Bencana
![](./readmemedia/ssdarkmode.png)

## Rencana Pengembangan

1. Penambahan fitur notifikasi peringatan dini.  
2. Integrasi dengan data historis untuk analisis jangka panjang.  
3. Optimalisasi untuk wilayah dengan koneksi internet rendah.  
4. Penambahan fitur personalisasi pengguna.  
5. Pengembangan laporan berbasis data untuk pengambil kebijakan.


## Kontribusi

Kontribusi dalam bentuk kode, ide, atau saran sangat diterima!  
1. Fork repositori ini.  
2. Buat branch untuk fitur baru.  
3. Commit perubahan Anda.  
4. Push ke branch Anda.  
5. Buat Pull Request.  


## Lisensi

Proyek ini dilindungi oleh lisensi MIT. Silakan cek file `LICENSE` untuk informasi lebih lanjut.


## Kontak

Jika ada pertanyaan atau masukan, silakan hubungi:  
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/628XXXXXXXXX)  
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)
