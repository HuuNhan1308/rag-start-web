# 🔧 Environment Variables Setup

## Local Development

Create a `.env` file in this directory with:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000

# Optional
VITE_APP_NAME=RAG Chat Application
VITE_APP_VERSION=1.0.0
```

## Vercel Deployment

Add these environment variables in Vercel dashboard:

1. Go to your project in Vercel
2. Navigate to: Settings → Environment Variables
3. Add:

```
Name:  VITE_API_URL
Value: https://your-backend.railway.app
```

## Environment Variables Explained

- `VITE_API_URL`: Backend API URL
  - Local: `http://localhost:3000`
  - Production: `https://your-backend.railway.app`
  
- `VITE_APP_NAME`: App name (optional)
- `VITE_APP_VERSION`: App version (optional)

## Important Notes

1. **All Vite env variables MUST start with `VITE_`**
2. **Never commit `.env` file to Git!** (Already in .gitignore)
3. **Update `VITE_API_URL`** after deploying backend
4. After changing env vars, **rebuild** the app:
   ```bash
   yarn build
   ```

## Vercel CLI

If using Vercel CLI:

```bash
# Add environment variable
vercel env add VITE_API_URL

# When prompted, enter:
# - Value: https://your-backend.railway.app
# - Environments: Production, Preview, Development
```
