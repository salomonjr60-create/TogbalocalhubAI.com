# Togba Local Hub AI - Backend Setup Guide

## Overview

This guide explains how to set up the Node.js/Express backend for the Togba Local Hub AI application with Google Gemini API integration.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (React + Vite)               │
│            (Port 5173, localhost:5173)                  │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP POST
                       │ /api/generate-content
                       ▼
┌─────────────────────────────────────────────────────────┐
│          Backend (Express + TypeScript)                 │
│           (Port 3001, localhost:3001)                   │
│  - Input validation                                     │
│  - Gemini API calls (server-side only)                 │
│  - Error handling                                       │
│  - Demo mode fallback                                   │
└─────────────────────────────────────────────────────────┘
                       │
                       │ HTTPS
                       ▼
         ┌────────────────────────────────┐
         │   Google Gemini API (optional) │
         │   - Requires API key           │
         │   - server/.env file           │
         └────────────────────────────────┘
```

## Project Structure

### Backend Files Created

```
server/
├── src/
│   ├── index.ts              # Express server entry point
│   ├── types.ts              # TypeScript interfaces for backend
│   ├── validators.ts         # Input validation logic
│   └── gemini.ts             # Gemini API service
├── package.json              # Backend dependencies
├── tsconfig.json             # TypeScript configuration
├── tsconfig.node.json        # Node config
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
└── dist/                     # Compiled output (auto-generated)
```

### Frontend Files Updated

```
src/
├── services/
│   ├── contentGenerator.ts   # Updated to use backend API
│   └── contentApiService.ts  # New API client service
├── types/
│   └── content.ts            # Updated with backend types
└── components/
    └── AIContentStudio.tsx   # No changes needed (via service)

.env.example                  # Frontend API URL config
package.json                  # Added concurrently for dev
```

## Installation

### 1. Install All Dependencies

From the project root directory:

```bash
npm run setup
```

This command:
- Installs frontend dependencies in root
- Installs backend dependencies in `server/`

**Manual installation** (alternative):

```bash
# Install frontend
npm install

# Install backend
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

#### Backend (.env file)

Create `server/.env` file (copy from `server/.env.example`):

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```
# Server Configuration
PORT=3001

# Google Gemini API (required for real AI generation)
# Get your key from: https://ai.google.dev/
GEMINI_API_KEY=your_actual_api_key_here
```

#### Frontend (.env.local file - optional)

Create `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Edit `.env.local` if your backend is on a different port:

```
VITE_API_URL=http://localhost:3001
```

## Running the Application

### Development Mode (Both Frontend + Backend)

```bash
npm run dev
```

This starts:
- **Frontend**: React dev server on `http://localhost:5173`
- **Backend**: Express server on `http://localhost:3001`

### Frontend Only (Without Backend)

```bash
npm run dev:frontend
```

Frontend will run in demo mode if backend is unavailable.

### Backend Only (Useful for Testing)

```bash
npm run dev:backend
```

Backend server will start on `http://localhost:3001`

## API Endpoints

### Health Check

**Request:**
```
GET http://localhost:3001/api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "demoMode": true
}
```

### Generate Content

**Request:**
```
POST http://localhost:3001/api/generate-content
Content-Type: application/json

{
  "contentType": "instagram-captions",
  "businessName": "Tech Innovations Co.",
  "industry": "Technology",
  "productOrService": "AI Content Generator",
  "targetAudience": "Marketing Professionals",
  "location": "San Francisco",
  "toneOfVoice": "professional",
  "language": "english",
  "contentLength": "medium",
  "callToAction": "Sign up for free trial"
}
```

**Success Response:**
```json
{
  "success": true,
  "content": "Generated content here...",
  "isDemoData": false,
  "contentType": "instagram-captions",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "field": "businessName",
      "message": "businessName is required"
    }
  ]
}
```

## Content Types

The backend accepts these content types:

- `instagram-captions` - Instagram post captions
- `facebook-posts` - Facebook post content
- `linkedin-posts` - LinkedIn professional content
- `blog-articles` - Blog post content
- `google-ads` - Google Ads headlines and descriptions
- `email-marketing` - Email campaign content
- `product-descriptions` - Product descriptions
- `website-content` - Website page content

## Tone of Voice Options

- `professional` - Formal, business-focused
- `friendly` - Casual, approachable
- `persuasive` - Compelling, action-oriented
- `luxury` - Premium, high-end
- `informative` - Educational, detailed

## Supported Languages

- english
- spanish
- french
- german
- portuguese
- italian
- chinese
- japanese

## Content Length

- `short` - Concise content
- `medium` - Standard length (default)
- `long` - Comprehensive content

## Demo Mode vs. Real API

### Running Without Gemini API Key

The backend operates in **demo mode**:
- Generates realistic placeholder content from templates
- Marks all responses with `isDemoData: true`
- Clearly indicates demo mode in generated content
- Perfect for UI testing and demonstration

**Console output:**
```
⚠️  DEMO MODE: Set GEMINI_API_KEY environment variable to enable real AI generation
```

### Running With Gemini API Key

To enable real AI content generation:

1. Get your API key from [Google AI Studio](https://ai.google.dev/)
2. Set `GEMINI_API_KEY` in `server/.env`
3. Restart the backend server
4. Generated content will be marked with `isDemoData: false`

**Console output:**
```
✅ Gemini API configured and ready
```

## Input Validation

The backend validates all requests:

### Required Fields
- `contentType`
- `businessName`
- `industry`
- `productOrService`
- `targetAudience`
- `toneOfVoice`
- `language`

### Validation Rules
- String fields: 2-500 characters
- Content type: Must be from allowed list
- Tone of voice: Must be from allowed list
- Language: Must be from supported languages
- Content length: Must be short/medium/long (optional)

## Security Considerations

### ✅ What's Protected

- **API Key Isolation**: `GEMINI_API_KEY` is never exposed to frontend
- **Environment Variables**: Backend configuration stays server-side
- **Input Validation**: All requests validated before processing
- **Error Messages**: Backend errors don't expose sensitive information

### ⚠️ Important

- Never commit `.env` file to version control
- Never send API keys to the frontend
- Always validate user input on the backend
- Use HTTPS in production

## Building for Production

### Build Frontend
```bash
npm run build:frontend
```

Output: `dist/`

### Build Backend
```bash
npm run build:backend
```

Output: `server/dist/`

### Build Everything
```bash
npm run build
```

### Run Production Server
```bash
npm start
```

Requires:
- Compiled backend in `server/dist/`
- `GEMINI_API_KEY` environment variable set
- Backend running on specified PORT (default 3001)

## Troubleshooting

### Backend Won't Start

**Error:** `Cannot find module '@google/generative-ai'`

**Solution:**
```bash
cd server
npm install
```

### Frontend Can't Connect to Backend

**Error:** `Connection error: Failed to fetch`

**Check:**
1. Backend is running: `curl http://localhost:3001/api/health`
2. `VITE_API_URL` matches backend URL
3. CORS is enabled (it is by default)

### Content Generation Fails

**Error:** `Validation failed`

**Check:**
1. All required fields are filled
2. Content type is from allowed list
3. Business name is at least 2 characters

**Error:** `API error: GEMINI_API_KEY not set`

**Solution:**
1. Add valid key to `server/.env`
2. Restart backend server
3. Try again

### Port Already in Use

**Error:** `listen EADDRINUSE: address already in use :::3001`

**Solution:**
```bash
# Change port in server/.env
PORT=3002

# Or kill process using port
lsof -ti:3001 | xargs kill -9
```

## Development Workflow

### Starting Fresh

```bash
# Install all dependencies
npm run setup

# Configure backend
cd server
cp .env.example .env
# Edit server/.env to add GEMINI_API_KEY (optional)
cd ..

# Start development
npm run dev
```

### Testing API Locally

```bash
# Health check
curl http://localhost:3001/api/health

# Generate content
curl -X POST http://localhost:3001/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{
    "contentType": "instagram-captions",
    "businessName": "Test Business",
    "industry": "Tech",
    "productOrService": "Software",
    "targetAudience": "Developers",
    "location": "Remote",
    "toneOfVoice": "professional",
    "language": "english",
    "contentLength": "medium",
    "callToAction": "Learn more"
  }'
```

## Next Steps

1. **Get Gemini API Key**
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Create a project
   - Generate API key

2. **Configure Backend**
   - Add key to `server/.env`
   - Restart backend

3. **Test Integration**
   - Use frontend to generate content
   - Verify real API responses are returned

4. **Deploy to Production**
   - Set `GEMINI_API_KEY` in production environment
   - Build and start server
   - Configure frontend `VITE_API_URL` to production backend

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API endpoint documentation
3. Inspect browser console (frontend) or terminal (backend) for error messages
4. Ensure `.env` files are properly configured

## Files Summary

| File | Purpose | Modified |
|------|---------|----------|
| `server/src/index.ts` | Express server entry point | New |
| `server/src/types.ts` | Backend TypeScript types | New |
| `server/src/validators.ts` | Input validation logic | New |
| `server/src/gemini.ts` | Gemini API integration | New |
| `src/services/contentApiService.ts` | Frontend API client | New |
| `src/services/contentGenerator.ts` | Updated to call backend | Modified |
| `src/types/content.ts` | Added backend types | Modified |
| `package.json` | Added backend scripts | Modified |
| `server/package.json` | Backend dependencies | New |
| `server/.env.example` | Backend config template | New |
| `.env.example` | Frontend config template | New |

---

**Last Updated:** January 2024
**Status:** Ready for Gemini API Integration
**Demo Mode:** ✅ Fully Functional
**Real API:** ⏳ Requires Configuration
