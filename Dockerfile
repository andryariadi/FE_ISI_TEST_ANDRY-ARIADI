# Gunakan Node.js v20.10.0 dengan Alpine untuk ukuran lebih kecil
FROM node:20.10.0-alpine AS base

# Set direktori kerja
WORKDIR /app

# Menyalin file package.json dan package-lock.json (agar caching lebih optimal)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode proyek setelah dependensi terinstal
COPY . .

# Expose port aplikasi (default untuk Next.js atau aplikasi Express biasanya 3000)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "dev"]