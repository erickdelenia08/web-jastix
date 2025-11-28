# 📊 Shopee Earphone Market Analysis  
**End-to-End Data Project — Web Scraping · Data Cleaning · EDA · Correlation · Dashboard**

Project ini menganalisis pasar **Earphone di Shopee Indonesia** menggunakan data hasil scraping real-time. Fokus utama adalah memahami harga, brand, penjualan, rating, serta karakteristik seller untuk menghasilkan insight yang dapat digunakan dalam pengambilan keputusan bisnis.

---

## 🚀 Project Overview
- Scraping data produk, toko, dan varian menggunakan **Puppeteer (Node.js)**
- Data processing, cleaning, dan exploratory analysis menggunakan **Python**
- Analisis korelasi menggunakan **Spearman**, **Cramér’s V**, dan **Kruskal–Wallis**
- Visualisasi data dan dashboard interaktif menggunakan **Power BI**
- Struktur data mencakup:
  - **products**: informasi produk  
  - **shops**: informasi toko  
  - **variants**: detail variasi produk  

Project ini dirancang menyerupai workflow Data Analyst/Data Scientist di industri.

---

## 📁 Project Structure


---

## 📦 Dataset Summary

### **1️⃣ products**
Berisi detail produk earphone:
- `itemid`, `name`, `brand`
- `price`, `price_before_discount`, `discount`
- `historical_sold`, `sold`
- `rating`, `rating_count`
- `stock`, `liked_count`
- `is_official_shop`, `shopid`, `category_main`

### **2️⃣ shops**
Informasi rating dan performa toko:
- `shopid`, `name`
- `follower_count`
- `rating_good`, `rating_normal`, `rating_bad`
- `response_rate`, `shop_location`
- `is_verified`, `is_preferred_plus`

### **3️⃣ variants**
Detail varian produk:
- `itemid`, `name`, `price`, `stock`

---

## 🧹 Data Cleaning
Hal yang dilakukan:
- Menghapus duplikasi
- Menstandarisasi kategori & tipe data
- Menangani outlier dengan **log-transform** dan **clipping**
- Menangani missing values
- Memisahkan data produk–toko–varian

---

## 🔍 Exploratory Data Analysis (EDA)

Fokus utama:
### **📌 Market Landscape**
- Distribusi harga earphone di Shopee  
- Kategori brand populer  
- Analisis stok dan penjualan  

### **📌 Seller Characteristics**
- Performa seller berdasarkan lokasi  
- Followers vs rating vs penjualan  
- Perbedaan antara *official shop* vs non-official  

### **📌 Price & Sales Analysis**
- Hubungan harga dengan penjualan  
- Outlier detection  
- Distribusi rating dan ulasan  

---

## 🔗 Correlation Analysis

### **Metode yang digunakan:**
- **Spearman correlation** → Numerik vs numerik (karena banyak outlier)  
- **Cramér’s V** → Kategori vs kategori  
- **Kruskal–Wallis Test** → Numerik vs kategori  
- Scatter plot menggunakan **log-transform**  

### **Pertanyaan utama:**
- Apakah harga mempengaruhi penjualan?  
- Apakah rating berhubungan dengan sold?  
- Apakah seller “Preferred” menjual lebih banyak?  
- Brand mana yang memiliki performa paling stabil?  

---

## 📊 Dashboard (Power BI)

Dashboard mencakup:
- Distribusi harga  
- Brand performance  
- Rating & Penjualan  
- Seller overview  
- Lokasi toko  
- Insight per kategori brand / seller / harga

📁 File dashboard:  
`dashboard/shopee_dashboard.pbix`

---

## ⭐ Key Insights (Sample)
> *Insight ini dapat disesuaikan setelah analisis selesai.*

- Sebagian besar earphone dijual pada rentang **Rp20.000 – Rp150.000**  
- Toko *Preferred* memiliki median penjualan **lebih tinggi**  
- Rating berpengaruh positif terhadap sold, namun hubungan tidak linear  
- Banyak brand low-budget mendominasi jumlah produk namun tidak penjualan  
- Harga memiliki **non-linear pattern**, sehingga korelasi lebih stabil pada log-scale  

---

## ▶️ How to Run

### **Install dependency**


npm install
pip install -r requirements.txt


### **Run scraper**


node scripts/scrape.js


### **Run analysis**


jupyter notebook

Buka file:


notebooks/03_eda.ipynb


---

## 📬 Contact  
**Author:** Erick Delenia  
- Instagram: @yourusername  
- Email: your@email.com  

Project ini dibuat sebagai portofolio profesional untuk posisi **Data Analyst / Data Scientist**.
