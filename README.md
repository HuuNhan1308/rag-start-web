# ⚛️ RAG Frontend

React + Vite frontend for RAG chat application.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
yarn install

# Copy env file
cp .env.example .env
# Edit .env and fill in your VITE_API_URL

# Run dev server
yarn dev
```

Visit: http://localhost:5173

## 🏗️ Build

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

## 🌐 Deploy to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable
vercel env add VITE_API_URL
# Enter your backend URL (e.g., https://backend.railway.app)

# Deploy to production
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Push this repo to GitHub
2. Go to https://vercel.com
3. Click "Add New..." → "Project"
4. Import your GitHub repo
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (or leave empty)
   - **Build Command:** `yarn build`
   - **Output Directory:** `dist`
6. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.railway.app`
7. Click "Deploy"

## 🔧 Tech Stack

- React 19
- Vite
- TypeScript
- React Router
- Axios
- CSS Modules

## 📁 Project Structure

```
src/
├── api/                # API client
├── assets/             # Static assets
├── components/         # React components
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript types
├── App.tsx             # Main app
└── main.tsx            # Entry point
```

## 📝 Scripts

- `yarn dev` - Development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Lint code

## 🎨 Features

- 📤 Upload PDF/TXT files
- 💬 Chat with AI using RAG
- 🎯 Clean and modern UI
- 📱 Responsive design

## 📄 License

MIT
