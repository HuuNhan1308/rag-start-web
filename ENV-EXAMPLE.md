# Environment Variables for Frontend

Tạo file `.env` trong thư mục `rag-starter` với nội dung sau:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000
```

## Cho Production (Render.com):

Thêm biến sau vào Environment Variables trong Render Dashboard:

- `VITE_API_URL=<your_backend_url>`

Ví dụ: `VITE_API_URL=https://rag-backend.onrender.com`
