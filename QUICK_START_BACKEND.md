# 🚀 Quick Start - Togba Local Hub AI with Backend

## In 3 Steps

### Step 1: Install Everything
```bash
npm run setup
```

### Step 2: Start Development
```bash
npm run dev
```

Frontend opens at: **http://localhost:5173**
Backend runs at: **http://localhost:3001**

### Step 3: Test AI Content Studio
- Click "AI Content Studio" in the sidebar
- Fill in business information
- Click "Generate Content"
- It works! (Demo mode - no API key needed)

---

## Add Real AI (Optional)

### Get Gemini API Key
1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Copy the key

### Configure Backend
```bash
# Edit the .env file
nano server/.env

# Paste your key on the GEMINI_API_KEY line
GEMINI_API_KEY=your_key_here
```

### Restart Backend
Backend automatically restarts or:
```bash
npm run dev:backend
```

That's it! Real AI content will now be generated.

---

## Available Commands

```bash
# Start everything (frontend + backend)
npm run dev

# Frontend only (port 5173)
npm run dev:frontend

# Backend only (port 3001)
npm run dev:backend

# Build for production
npm run build

# Start production server
npm start

# Check API health
curl http://localhost:3001/api/health
```

---

## Project Structure

```
togba-local-hub-ai/
├── Frontend (React + Vite)
│   └── src/components/AIContentStudio.tsx
├── Backend (Express + Node.js)  ← NEW!
│   └── server/src/
│       ├── index.ts (API server)
│       ├── gemini.ts (AI service)
│       └── validators.ts (input check)
└── Docs
    ├── BACKEND_SETUP_GUIDE.md (detailed)
    └── IMPLEMENTATION_COMPLETE.md (summary)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3001 in use | Change PORT in `server/.env` |
| Backend won't start | Run `cd server && npm install` |
| Frontend can't connect | Make sure backend is running (`npm run dev:backend`) |
| Content won't generate | Check all fields are filled (business name, industry, etc) |

---

## Demo Mode

Backend runs in **demo mode** without an API key:
- ✅ Generates realistic placeholder content
- ✅ Shows notice: "[DEMO MODE: This is placeholder content...]"
- ✅ Perfect for testing UI

Add Gemini API key to `server/.env` to enable real AI.

---

## Features Implemented

✅ Dashboard with sidebar navigation
✅ AI Content Studio module
✅ 8 content types (Instagram, Facebook, LinkedIn, Blog, etc.)
✅ 5 tone of voice options
✅ Content generation with Express backend
✅ Demo mode (no API key needed)
✅ Real Gemini API ready
✅ Secure API key handling (server-side only)
✅ Full TypeScript support
✅ Input validation

---

## Next: Add Your Gemini API Key

```bash
# 1. Get key from https://ai.google.dev/
# 2. Edit server/.env
nano server/.env

# 3. Add your key
GEMINI_API_KEY=sk-...

# 4. Restart backend
npm run dev:backend

# 5. Try generating content again - now with real AI!
```

---

## Need Help?

- **Setup issues?** → Read `BACKEND_SETUP_GUIDE.md`
- **What was implemented?** → Read `IMPLEMENTATION_COMPLETE.md`
- **API endpoints?** → Check `BACKEND_SETUP_GUIDE.md` section "API Endpoints"
- **Environment variables?** → Look at `.env.example` and `server/.env.example`

---

**Status:** ✅ Fully functional - Ready for Gemini API
**Demo Mode:** ✅ Works without API key
**Real AI:** ⏳ Needs Gemini API key configuration
