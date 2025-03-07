This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

model User {
id String @id @default(uuid())
username String @unique
password String
role String

tasks Task[] @relation("CreatedBy")
assignedTasks Task[] @relation("AssignedTo")
}

model Task {
id String @id @default(uuid())
title String
description String
status String @default("Not Started")

assignedTo User? @relation("AssignedTo", fields: [assignedToId], references: [id])
assignedToId String?

user User @relation("CreatedBy", fields: [userId], references: [id])
userId String

logs Log[]
}

model Log {
id String @id @default(uuid())
taskId String
task Task @relation(fields: [taskId], references: [id])

changes String
createdAt DateTime @default(now())
}

# Gunakan Node.js v20.10.0 dengan Alpine untuk ukuran lebih kecil

FROM node:20.10.0-alpine AS base

# Set direktori kerja

WORKDIR /app

# Menyalin file package.json dan package-lock.json (agar caching lebih optimal)

COPY package\*.json ./

# Install dependencies

RUN npm install

# Salin seluruh kode proyek setelah dependensi terinstal

COPY . .

# Ubah kepemilikan direktori /app ke user node

# RUN chown -R node:node /app

# Gunakan user non-root untuk keamanan

# USER node

# Expose port aplikasi (default untuk Next.js atau aplikasi Express biasanya 3000)

EXPOSE 3000

# Jalankan aplikasi

CMD ["npm", "run", "dev"]

services:
app:
build: .
ports: - "3000:3000"
depends*on:
db:
condition: service_healthy
develop:
watch: - action: sync
path: ./app
target: /app/app
ignore: - node_modules/ - action: rebuild
path: package.json - action: rebuild
path: ./app/**/\*.css - action: rebuild
path: ./app/**/*.js - action: rebuild # Untuk file TypeScript
path: ./app/\*\*/_.ts - action: rebuild # Untuk file TypeScript dengan ekstensi .tsx
path: ./app/\*_/\_.tsx - action: rebuild # Untuk file konfigurasi Tailwind
path: tailwind.config.js - action: rebuild # Jika menggunakan TypeScript untuk konfigurasi Tailwind
path: tailwind.config.ts - action: rebuild # Untuk file CSS global yang mengimpor Tailwind
path: ./app/globals.css
volumes: - ./:/app - /app/node_modules # user: "node"

db:
image: postgres:17-alpine
environment:
POSTGRES_USER: postgres
POSTGRES_PASSWORD: andrypostgresql
POSTGRES_DB: tododb
ports: - "5432:5432"
volumes: - postgres_data:/var/lib/postgresql/data
healthcheck:
test: ["CMD", "pg_isready", "-U", "postgres"]
interval: 10s
timeout: 5s
retries: 5

volumes:
postgres_data:

docker-compose up
docker-compose up --build
docker-compose up --watch
docker-compose down -v
