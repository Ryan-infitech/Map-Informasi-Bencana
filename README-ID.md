# Sistem Pemantauan Data Bencana Indonesia

Website interaktif berbasis cloud yang menyajikan informasi real-time mengenai bencana alam di Indonesia dengan memanfaatkan teknologi React, Leaflet.js, dan Amazon Web Services (AWS). Sistem ini dirancang untuk memberikan akses mudah dan cepat kepada masyarakat serta pemangku kepentingan terkait mitigasi bencana.

<br>

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-00A4EF?style=for-the-badge&logo=web&logoColor=white)](https://zekia-map-bencana-indonesia.vercel.app/)  [![Documentation](https://img.shields.io/badge/Documentation-00A4EF?style=for-the-badge&logo=book&logoColor=white)](https://drive.google.com/file/d/1/documentation-link)

</div>

<br>


## Gambaran Umum

Proyek ini dirancang untuk memvisualisasikan data bencana alam secara real-time menggunakan peta interaktif yang dilengkapi dengan ikon spesifik untuk setiap jenis bencana. Sistem ini memanfaatkan teknologi cloud AWS untuk menjamin skalabilitas dan ketersediaan informasi, serta dirancang responsif agar dapat diakses melalui berbagai perangkat.

## Cara Penggunaan

1. **Akses Website**: Buka [website](https://zekia-map-bencana-indonesia.vercel.app/) melalui browser.  
2. **Eksplorasi Peta**: Gunakan fitur zoom dan drag untuk menjelajahi lokasi bencana di seluruh Indonesia.  
3. **Klik Ikon Bencana**: Dapatkan detail informasi seperti jenis bencana, lokasi, waktu, dan tingkat keparahan.  
4. **Gunakan Filter**: Pilih jenis bencana tertentu melalui tombol di sisi kanan layar.  
5. **Mode Tampilan**: Ubah mode terang/gelap melalui tombol di sudut kanan atas.

## Contoh Tampilan

### Peta Interaktif
![](./readmemedia/sslightmode.png)

### Detail Bencana
![](./readmemedia/ssdetailbencana.png)


## Fitur Utama

- **Real-Time Data**: Informasi bencana terkini langsung dari API BMKG.  
- **Peta Interaktif**: Pengguna dapat mengeksplorasi lokasi bencana dengan fitur zoom, drag, dan klik ikon untuk detail informasi.  
- **Filter Bencana**: Memilih jenis bencana tertentu seperti gempa bumi, banjir, atau tsunami.  
- **Mode Terang/Gelap**: Tampilan yang dapat disesuaikan untuk kenyamanan pengguna.  
- **Responsif**: Dapat diakses dengan optimal di perangkat desktop, tablet, maupun ponsel.



## Teknologi yang Digunakan
![](./readmemedia/vite+react.gif)  

<div align="center">
   
![AWS](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/aws.gif)  ![Vercel](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/vercel.gif)  ![Leaflet.js](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/leaflet.gif)  ![Tailwind CSS](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/tailwind.gif)

</div>

<br>


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
   VITE_AWS_ACCESS_KEY_ID=your-aws-key-id
   VITE_AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   VITE_AWS_REGION=your-aws-region
   ```

4. **Menjalankan aplikasi lokal:**
   ```bash
   npm run dev
   ```

5. **Deployment ke Vercel:**
   - Hubungkan repositori ke akun Vercel.
   - Atur variabel lingkungan yang sama pada pengaturan proyek di Vercel.
   - Lakukan deployment melalui dashboard Vercel.



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

Jika Anda memiliki pertanyaan atau saran, silakan buka issue baru di repository ini.

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6285157517798)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/ryan.septiawan__/)
