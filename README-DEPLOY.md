# ⚛️ Frontend Service

React + Vite application cho RAG chatbot.

## 🚀 Chạy Local

```bash
# Cài dependencies
yarn install

# Tạo file .env
# Xem ENV-EXAMPLE.md để biết cần gì

# Chạy dev server
yarn dev
```

Truy cập: http://localhost:5173

## 🏗️ Build

```bash
# Build cho production
yarn build

# Preview build
yarn preview
```

## 🔧 Environment Variables

Tạo file `.env`:

```env
VITE_API_URL=http://localhost:3000
```

**Production:**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Xem chi tiết trong `ENV-EXAMPLE.md`

## 🐳 Docker

```bash
# Development
docker build -f Dockerfile.dev -t frontend-dev .
docker run -p 5173:5173 frontend-dev
```

## 🌐 Deploy

Service này sẽ được deploy tự động khi dùng `render.yaml`.

### Manual Deploy trên Render:

1. New → Static Site
2. Root Directory: `rag-starter`
3. Build Command: `yarn install && yarn build`
4. Publish Directory: `dist`
5. Add env var: `VITE_API_URL`

Xem hướng dẫn đầy đủ:
- `../BAT-DAU-O-DAY.md`
- `../DEPLOY-GUIDE-SIMPLE.md`
