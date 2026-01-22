# Phase 1: Project Setup & Core Infrastructure - Research

**Researched:** 2026-01-22
**Domain:** Full-stack JavaScript/TypeScript project setup (React + Express + Supabase)
**Confidence:** HIGH

## Summary

Phase 1 establishes the foundation for a React + TypeScript PWA with Express.js backend and Supabase database. The standard approach in 2026 uses Vite for frontend tooling (replacing Create React App), modern Tailwind CSS setup with the `@tailwindcss/vite` plugin, and a monorepo structure optimized for Vercel deployment.

**Critical finding:** For a 72-hour hackathon with a solo new developer, use SQL Editor for database setup (not migrations), skip Row Level Security policies initially (but enable RLS on tables), and leverage Vite's built-in proxy for CORS-free local development. TypeScript configuration should be permissive (`strict: false`) to maximize velocity.

**Primary recommendation:** Use monorepo structure with `/frontend` and `/backend` folders, Vite proxy for local dev, and focus on getting both servers running concurrently within the first 2-4 hours to establish momentum.

## Standard Stack

The established libraries/tools for this domain:

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 5.x+ | Frontend build tool | Replaced CRA as industry standard; instant HMR, native ESM, TypeScript support. Requires Node 18.x+ or 20+ |
| React | 18.x | UI framework | Ecosystem standard, TypeScript support, PWA-compatible |
| TypeScript | 5.x | Type safety | Industry standard for new projects in 2026 |
| TailwindCSS | 4.x (v3.x compatible) | CSS framework | Utility-first standard, mobile-first responsive design |
| Express.js | 4.x | Backend framework | Mature, serverless-compatible, extensive middleware ecosystem |
| Supabase | Latest | Database + Auth | Managed Postgres with PostGIS, generous free tier, TypeScript SDK |
| Cloudinary | Latest | Image hosting | Industry standard CDR, generous free tier (25 credits/month) |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@tailwindcss/vite` | Latest | Tailwind integration | Required for Tailwind v4+ with Vite (replaces PostCSS approach) |
| `dotenv` | 16.x | Environment variables | Both frontend and backend for local dev |
| `envalid` | 8.x | Env validation | Validates required env vars at startup, TypeScript-friendly |
| `cors` | 2.x | CORS middleware | Express CORS handling for production |
| `concurrently` | 9.x | Run multiple commands | Run frontend + backend servers together |
| `nodemon` | 3.x | Dev server auto-reload | Backend hot reload during development |
| `vite-plugin-pwa` | Latest | PWA functionality | Service workers, offline support, manifest generation |
| `@supabase/supabase-js` | 2.x | Supabase client | Official SDK for database and auth operations |
| `cloudinary` | 2.x | Cloudinary SDK | Node.js SDK for image uploads and transformations |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vite | Webpack/Parcel | Vite is faster and simpler; Webpack has more ecosystem plugins but steeper learning curve |
| Monorepo | Separate repos | Separate repos cleaner isolation but harder to sync; monorepo better for solo dev and Vercel |
| SQL Editor | Migrations (Supabase CLI) | Migrations better for teams/prod; SQL Editor faster for solo hackathon (can add migrations later) |
| TailwindCSS | Vanilla CSS/CSS Modules | Tailwind faster for prototyping, mobile-first by default; vanilla CSS more control but slower |

**Installation:**

```bash
# Frontend (from project root)
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install tailwindcss @tailwindcss/vite
npm install @supabase/supabase-js
npm install -D vite-plugin-pwa

# Backend (from project root)
mkdir backend
cd backend
npm init -y
npm install express dotenv cors
npm install cloudinary @supabase/supabase-js
npm install -D typescript @types/node @types/express @types/cors
npm install -D nodemon ts-node

# Root (for running both together)
cd ..
npm install -D concurrently
```

## Architecture Patterns

### Recommended Project Structure

```
haul/
├── frontend/                # Vite + React + TypeScript
│   ├── public/             # Static assets (manifest.json, icons)
│   ├── src/
│   │   ├── assets/         # Images, fonts
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities (supabaseClient.ts)
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Global styles (if any)
│   │   ├── App.tsx         # Root component
│   │   ├── main.tsx        # Entry point
│   │   └── vite-env.d.ts   # Vite types
│   ├── vite.config.ts      # Vite config (proxy, PWA plugin)
│   ├── tsconfig.json       # TypeScript config
│   ├── tailwind.config.js  # Tailwind config (optional for v4)
│   └── package.json
├── backend/                 # Express + TypeScript
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── lib/            # Utilities (supabaseClient.ts, cloudinary.ts)
│   │   ├── middleware/     # Express middleware
│   │   └── index.ts        # Express app entry point
│   ├── tsconfig.json       # TypeScript config
│   └── package.json
├── .env.example            # Template for environment variables
├── .gitignore              # Ignore .env, node_modules, dist
└── package.json            # Root package.json for concurrently scripts
```

### Pattern 1: Vite Proxy for CORS-Free Local Development

**What:** Configure Vite dev server to proxy API requests to Express backend
**When to use:** Always in local development to avoid CORS issues
**Example:**

```typescript
// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // Optional: rewrite if you want /api/stores -> /stores
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

**Why this works:** Browser sees requests to `http://localhost:5173/api/*` as same-origin, Vite forwards them to Express on port 3000. No CORS errors during development.

### Pattern 2: Environment Variable Validation at Startup

**What:** Validate required environment variables before app starts, fail fast
**When to use:** Always, prevents runtime errors from missing config
**Example:**

```typescript
// backend/src/lib/env.ts
import { cleanEnv, str, url } from 'envalid'

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  PORT: str({ default: '3000' }),
  SUPABASE_URL: url(),
  SUPABASE_ANON_KEY: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
})

// backend/src/index.ts
import 'dotenv/config'
import { env } from './lib/env'

console.log(`Starting server in ${env.NODE_ENV} mode...`)
```

### Pattern 3: Concurrent Dev Servers

**What:** Run frontend (Vite) and backend (Express) with single command
**When to use:** Always in development for DX efficiency
**Example:**

```json
// Root package.json
{
  "scripts": {
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "dev": "concurrently \"npm:dev:frontend\" \"npm:dev:backend\" --names \"VITE,API\" --prefix-colors \"cyan,magenta\""
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
```

```json
// backend/package.json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc"
  }
}
```

### Pattern 4: Supabase Client Initialization

**What:** Create singleton Supabase client for database operations
**When to use:** Both frontend and backend, separate clients for each
**Example:**

```typescript
// frontend/src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

```typescript
// backend/src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { env } from './env'

export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY // Use service role key on backend
)
```

**Note:** Frontend uses `anon` key (public, RLS-protected), backend uses `service_role` key (private, bypasses RLS).

### Pattern 5: Cloudinary Configuration

**What:** Configure Cloudinary SDK for image uploads
**When to use:** Backend only (never expose API secret to frontend)
**Example:**

```typescript
// backend/src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'
import { env } from './env'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
})

export { cloudinary }
```

### Pattern 6: Tailwind CSS Setup (2026 Method)

**What:** Use `@tailwindcss/vite` plugin instead of PostCSS configuration
**When to use:** All new Vite projects with Tailwind v4+
**Example:**

```typescript
// frontend/vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```css
/* frontend/src/index.css */
@import "tailwindcss";
```

```tsx
// frontend/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // Import Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Anti-Patterns to Avoid

- **Don't use Create React App** - Deprecated, replaced by Vite in 2026
- **Don't commit `.env` files** - Use `.env.example` as template, add `.env*` to `.gitignore` (except `!.env.example`)
- **Don't use `service_role` key in frontend** - Bypasses RLS, massive security hole
- **Don't use old PostCSS Tailwind setup** - Use `@tailwindcss/vite` plugin for v4+
- **Don't run Vite and Express on same port** - Causes conflicts; use proxy pattern instead
- **Don't skip TypeScript config for Vite** - Need `compilerOptions.types: ["vite/client"]` for proper client-side types
- **Don't put TypeScript in devDependencies** - Production build needs `tsc` available

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Service workers for PWA | Custom SW logic | `vite-plugin-pwa` with Workbox | Handles caching strategies, precaching, runtime caching, version management. Custom SW breaks on subtle edge cases (cache invalidation, update prompts) |
| Environment variable validation | Manual `if (!process.env.X)` checks | `envalid` or `joi` | Type coercion, validation rules, clear error messages, TypeScript inference |
| Running dev servers concurrently | Manual terminal tabs | `concurrently` package | Single command, colored output, automatic restart on failure |
| CORS configuration | Manual CORS headers | `cors` middleware + Vite proxy | Proxy eliminates CORS in dev; `cors` package handles production edge cases (preflight, credentials) |
| Image transformations | Manual canvas/sharp operations | Cloudinary SDK | CDN delivery, automatic format conversion (WebP), responsive images, lazy loading URLs |
| Database connection pooling | Manual pool management | Supabase client (built-in) | Handles connection limits, automatic reconnection, query timeouts |
| TypeScript transpilation | Manual `tsc` watching | `ts-node` + `nodemon` | Automatic reload on file changes, faster than compile-then-run |

**Key insight:** Infrastructure tooling in 2026 is mature and well-tested. Custom solutions for build tools, dev servers, and asset optimization are almost always worse due to edge cases around error handling, hot reload, and production optimization.

## Common Pitfalls

### Pitfall 1: Vite Type Checking Doesn't Happen During Development

**What goes wrong:** TypeScript errors don't show in terminal during `npm run dev`, only at build time. Developer writes broken TypeScript for hours, discovers errors when attempting production build.

**Why it happens:** Vite uses esbuild for transpilation, which strips types but doesn't check them. This is intentional for speed (instant HMR).

**How to avoid:**
- Use IDE with TypeScript language server (VSCode, Cursor, etc.) - shows errors in real-time
- Add `"checkTypes": "tsc --noEmit"` script to `package.json`, run periodically
- For production builds, always run `tsc && vite build` to catch type errors first

**Warning signs:** Build fails in CI/CD but works in local dev

**Time cost if missed:** 1-2 hours debugging "mysterious" build failures

### Pitfall 2: Row Level Security Not Enabled on Supabase Tables

**What goes wrong:** Tables created via SQL Editor have RLS disabled by default. Data is publicly accessible to anyone with the `anon` API key (which is exposed in frontend code). Critical security vulnerability.

**Why it happens:** RLS must be explicitly enabled. Dashboard's Table Editor enables it by default, but SQL commands don't.

**How to avoid:**
- **Always run after creating tables:** `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`
- Check RLS status in Supabase Dashboard → Authentication → Policies
- For v1 hackathon, enable RLS but don't create policies - use backend API with service role key instead

**Warning signs:** Data accessible in browser DevTools without authentication

**Time cost if missed:** 30 minutes to discover + potential data breach

### Pitfall 3: Supabase Coordinate Order (Longitude, Latitude)

**What goes wrong:** PostGIS uses `(longitude, latitude)` order (X, Y axes), not the intuitive `(latitude, longitude)`. Distance queries return incorrect results, location searches fail.

**Why it happens:** GeoJSON and PostGIS standard is `[lng, lat]`, but Google Maps and most APIs use `[lat, lng]`.

**How to avoid:**
- **Remember:** "Alphabetically, lng before lat" or "X-axis (longitude) comes before Y-axis (latitude)"
- Use `ST_Point(lng, lat)` consistently, never `ST_Point(lat, lng)`
- Test with known locations (e.g., Statue of Liberty: `ST_Point(-74.0445, 40.6892)`)

**Warning signs:** Distance queries return wildly incorrect results (e.g., 10,000 km instead of 5 km)

**Time cost if missed:** 1-2 hours debugging spatial queries

### Pitfall 4: Vercel Deployment Requires JavaScript Files, Not TypeScript

**What goes wrong:** Vercel serverless functions expect `.js` files in `/api` directory. TypeScript files (`.ts`) don't work. Backend fails to deploy with cryptic "function not found" errors.

**Why it happens:** Vercel runs Node.js, not `ts-node`. TypeScript must be compiled to JavaScript before deployment.

**How to avoid:**
- **Build before deploy:** Add `"build": "tsc"` to backend `package.json`
- Configure `vercel.json` to point to compiled output: `"buildCommand": "cd backend && npm run build"`
- Set output directory in `tsconfig.json`: `"outDir": "./dist"`
- Option 1: Commit `dist/` folder (simple, works immediately)
- Option 2: Use Vercel build step (cleaner, requires proper `vercel.json` config)

**Warning signs:** Local dev works, Vercel deployment returns 404 or 500 errors

**Time cost if missed:** 2-4 hours fighting Vercel configuration

### Pitfall 5: Environment Variables Not Prefixed with `VITE_`

**What goes wrong:** Frontend environment variables are `undefined` at runtime, causing API calls to fail. Backend can read `process.env.SUPABASE_URL`, but frontend gets `undefined`.

**Why it happens:** Vite only exposes environment variables prefixed with `VITE_` to the client bundle (security feature to prevent leaking server secrets).

**How to avoid:**
- Frontend `.env` variables **must** start with `VITE_`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Access via `import.meta.env.VITE_SUPABASE_URL` (not `process.env`)
- Backend uses normal names: `SUPABASE_URL`, `CLOUDINARY_API_SECRET`

**Warning signs:** `console.log(import.meta.env.VITE_API_URL)` prints `undefined`

**Time cost if missed:** 30 minutes of confusion, easy to fix once understood

### Pitfall 6: Module Not Found in Vercel (devDependencies vs dependencies)

**What goes wrong:** Backend deployment fails with "Cannot find module 'express'" or similar. Works locally but crashes in Vercel.

**Why it happens:** Vercel only installs `dependencies`, not `devDependencies` in production. If Express/Cloudinary/etc. are in `devDependencies`, they're missing in deployment.

**How to avoid:**
- **Runtime dependencies** → `dependencies`: express, @supabase/supabase-js, cloudinary, cors, dotenv
- **Build tools only** → `devDependencies`: typescript, @types/*, nodemon, ts-node, concurrently
- Rule: If the production server imports it, it goes in `dependencies`

**Warning signs:** `npm ls express` shows it under `devDependencies` instead of `dependencies`

**Time cost if missed:** 1 hour debugging deployment errors

### Pitfall 7: CORS Errors in Production (Vite Proxy Doesn't Work)

**What goes wrong:** Local development works perfectly (Vite proxy handles CORS), but production deployment has CORS errors. Frontend can't call backend API.

**Why it happens:** Vite proxy only runs in development (`npm run dev`). Production build is static files with no proxy server.

**How to avoid:**
- **Development:** Use Vite proxy (no CORS middleware needed)
- **Production:** Configure CORS on Express:

```typescript
import cors from 'cors'

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
```

- Set `FRONTEND_URL` env variable on Vercel to your deployed frontend domain

**Warning signs:** Works on `localhost:5173`, fails on `yourapp.vercel.app`

**Time cost if missed:** 1-2 hours debugging production-only issues

### Pitfall 8: Cloudinary Free Tier Limits (25 Credits/Month)

**What goes wrong:** Uploads work in testing, then stop working during demo. Error: "Usage limit exceeded."

**Why it happens:** Free tier provides 25 credits/month. Each transformation/delivery consumes credits. Easy to exceed during load testing or if images are large.

**How to avoid:**
- **Compress images before upload** (client-side or backend with sharp)
- **Use transformations sparingly** in v1 (e.g., `w_800,q_auto` for thumbnails, not 10 different sizes)
- **Monitor usage** in Cloudinary dashboard (Media Library → Usage)
- **Hackathon strategy:** Upload 10-20 demo images only, use mock data for rest

**Warning signs:** "Credit limit reached" error, uploads return 403

**Time cost if missed:** Could break demo; 30 minutes to implement fallback

### Pitfall 9: TypeScript Strict Mode Too Aggressive for New Developers

**What goes wrong:** With `"strict": true`, TypeScript errors block progress. New developer spends hours fixing type errors instead of building features. Demotivating, kills velocity.

**Why it happens:** Strict mode enables 8+ strictness flags. Requires deep TypeScript knowledge (null checks, `any` banned, strict function types, etc.).

**How to avoid:**
- **Hackathon recommendation:** `"strict": false` in `tsconfig.json` for both frontend and backend
- Enable basic safety only: `"noImplicitAny": false`, `"strictNullChecks": false`
- After v1 ships, gradually enable strict flags one at a time
- For experienced devs: Use `@tsconfig/strictest`, but not for first project under time pressure

**Warning signs:** Spending more time fixing TS errors than building features

**Time cost if missed:** Could cost 8-12 hours over 72-hour hackathon (unacceptable)

### Pitfall 10: Forgetting to Enable PostGIS Extension

**What goes wrong:** Spatial queries fail with "function st_point does not exist". Distance-based features (e.g., "stores near me") completely broken.

**Why it happens:** PostGIS extension must be manually enabled in Supabase. Not enabled by default.

**How to avoid:**
- **Before creating tables with geography columns:**
  1. Go to Supabase Dashboard → Database → Extensions
  2. Enable `postgis` extension
  3. Verify: Run `SELECT PostGIS_Version();` in SQL Editor
- **Alternative:** Run `CREATE EXTENSION IF NOT EXISTS postgis;` in SQL Editor

**Warning signs:** SQL queries with `ST_Point`, `ST_Distance` return function errors

**Time cost if missed:** 30 minutes to discover + re-run table creation scripts

## Code Examples

Verified patterns from official sources:

### Supabase Distance Query (PostGIS)

```sql
-- Source: https://supabase.com/docs/guides/database/extensions/postgis

-- Enable PostGIS extension (run once)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create stores table with geography column
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create spatial index for performance
CREATE INDEX stores_geo_index ON stores USING GIST (location);

-- Insert sample store (note: longitude first, then latitude)
INSERT INTO stores (name, location)
VALUES ('Sunset Thrift', ST_Point(-122.4194, 37.7749));

-- Query: Find stores within 10km of a location
-- Returns: id, name, distance in meters, sorted by closest first
CREATE OR REPLACE FUNCTION nearby_stores(lat FLOAT, lng FLOAT, radius_meters FLOAT DEFAULT 10000)
RETURNS TABLE (
  id UUID,
  name TEXT,
  distance_meters FLOAT
)
LANGUAGE SQL
AS $$
  SELECT
    id,
    name,
    ST_Distance(location, ST_Point(lng, lat)::geography) AS distance_meters
  FROM stores
  WHERE ST_DWithin(location, ST_Point(lng, lat)::geography, radius_meters)
  ORDER BY location <-> ST_Point(lng, lat)::geography;
$$;

-- Call from TypeScript:
-- const { data } = await supabase.rpc('nearby_stores', {
--   lat: 37.7749,
--   lng: -122.4194,
--   radius_meters: 5000
-- })
```

### Vite Config with Tailwind + Proxy

```typescript
// Source: https://tailwindcss.com/docs/guides/vite
// frontend/vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Haul',
        short_name: 'Haul',
        description: 'Discover thrift stores near you',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

### Express TypeScript Boilerplate

```typescript
// backend/src/index.ts
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { env } from './lib/env'

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
const PORT = env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 Environment: ${env.NODE_ENV}`)
})
```

```typescript
// backend/src/lib/env.ts
import { cleanEnv, str, port, url } from 'envalid'

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  PORT: port({ default: 3000 }),
  SUPABASE_URL: url(),
  SUPABASE_SERVICE_ROLE_KEY: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  FRONTEND_URL: url({ default: 'http://localhost:5173' }),
})
```

```json
// backend/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Environment Variables Template

```bash
# .env.example (commit this to git)

# ===========================
# Backend Configuration
# ===========================

NODE_ENV=development
PORT=3000

# Supabase (get from: https://app.supabase.com/project/_/settings/api)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Cloudinary (get from: https://console.cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
FRONTEND_URL=http://localhost:5173
```

```bash
# frontend/.env.example (commit this to git)

# ===========================
# Frontend Configuration
# ===========================
# NOTE: All variables MUST be prefixed with VITE_ to be accessible in browser

# Supabase (get from: https://app.supabase.com/project/_/settings/api)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# API Endpoint (for production, use your deployed backend URL)
VITE_API_URL=http://localhost:3000
```

### Cloudinary Upload Example

```typescript
// Source: https://cloudinary.com/blog/uploading-images-node-js-cloudinary-node-sdk
// backend/src/lib/cloudinary.ts

import { v2 as cloudinary } from 'cloudinary'
import { env } from './env'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

// backend/src/routes/upload.ts
import { cloudinary } from '../lib/cloudinary'
import express from 'express'

const router = express.Router()

router.post('/api/upload', async (req, res) => {
  try {
    // Assuming base64 image in req.body.image
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'haul/items',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    })

    res.json({
      url: result.secure_url,
      publicId: result.public_id
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed' })
  }
})

export default router
```

### Concurrently Script

```json
// Root package.json
{
  "name": "haul",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm:dev:*\" --names \"VITE,API\" --prefix-colors \"cyan,magenta\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build"
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
```

```json
// backend/package.json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

## State of the Art

| Old Approach | Current Approach (2026) | When Changed | Impact |
|--------------|-------------------------|--------------|--------|
| Create React App | Vite | 2023-2024 | 10x faster dev server, instant HMR, native ESM, smaller bundle |
| PostCSS Tailwind setup | `@tailwindcss/vite` plugin | 2025-2026 (Tailwind v4) | Simpler config, zero-config in many cases, faster builds |
| `@supabase/auth-helpers-*` | `@supabase/ssr` | 2024-2025 | Unified SSR package, better Next.js support, deprecates old helpers |
| Manual .env checks | Validation libraries (envalid, joi) | Ongoing standard | Type safety, clear errors, prevents production crashes |
| Separate repos (frontend/backend) | Monorepos with tooling (Turborepo, Nx) | 2023-2026 | Easier local dev, atomic commits, shared types, Vercel-optimized |
| Webpack | Vite/esbuild | 2020-2024 | Faster builds, simpler config, better DX |
| Manual CORS middleware | Vite proxy + CORS package | Ongoing standard | Zero CORS issues in dev, proper handling in prod |
| `nodemon` only | `nodemon` + `ts-node` + `concurrently` | 2021-2026 | TypeScript hot reload, multi-process dev servers |

**Deprecated/outdated:**
- **Create React App** - Officially deprecated, no longer maintained. Use Vite instead.
- **@supabase/auth-helpers** - Being replaced by `@supabase/ssr` for SSR frameworks. Use `@supabase/supabase-js` directly for client-side.
- **Old Tailwind PostCSS setup** - With Tailwind v4, use `@tailwindcss/vite` plugin instead of PostCSS config.
- **Port 3000 for Vite** - Changed to 5173 in Vite 3+ to avoid conflicts with other tools.

## Open Questions

Things that couldn't be fully resolved:

1. **Supabase Migrations vs SQL Editor for Solo Hackathon**
   - What we know: Migrations are production best practice, SQL Editor is faster for prototyping
   - What's unclear: Can migrations be added retroactively without data loss? How painful is migration from SQL Editor to CLI-based migrations?
   - Recommendation: **Use SQL Editor for Phase 1** (fastest path to working DB), add migrations in Phase 2+ if needed. For 72-hour hackathon, velocity > best practices.

2. **TypeScript Strictness Level for New Developer**
   - What we know: `strict: true` is industry standard for new projects, prevents bugs
   - What's unclear: How much does strict mode slow down a first-time TypeScript developer?
   - Recommendation: **Start with `strict: false`** for hackathon, enable incrementally post-v1. Strict mode TypeScript requires experience; under time pressure, permissive TS is better than no TS.

3. **Monorepo Tooling (Turborepo, Nx, or None)**
   - What we know: Monorepo structure is recommended for Vercel, easier local dev
   - What's unclear: Is Turborepo/Nx overhead worth it for 2-package monorepo?
   - Recommendation: **Use simple monorepo (no Turborepo/Nx)** for Phase 1. Shared workspace with `concurrently` is sufficient. Add Turborepo later if caching/task orchestration becomes bottleneck.

4. **PWA Features Priority for Phase 1**
   - What we know: `vite-plugin-pwa` can add service workers, offline support, manifest
   - What's unclear: How much does PWA setup slow down initial development? What's truly needed for "mobile PWA" vs nice-to-have?
   - Recommendation: **Phase 1: Manifest + icons only** (5 minutes). **Defer service workers** to Phase 2+. Manifest is minimum for "Add to Home Screen", offline support can wait.

5. **Vercel Deployment Structure for Monorepo**
   - What we know: Vercel supports monorepos, can deploy multiple projects from one repo
   - What's unclear: Should frontend and backend be separate Vercel projects, or single project with serverless functions in `/api`?
   - Recommendation: **Two separate Vercel projects** (one for frontend, one for backend). Simpler to reason about, clearer environment variables, independent deployments. Alternative: Single project with `/api` folder for serverless functions (more complex, tighter coupling).

## Sources

### Primary (HIGH confidence)

- [Tailwind CSS - Install with Vite](https://tailwindcss.com/docs/guides/vite) - Official Tailwind v4 setup with `@tailwindcss/vite` plugin
- [Supabase - PostGIS Extension](https://supabase.com/docs/guides/database/extensions/postgis) - Official PostGIS setup, distance queries, coordinate order
- [Supabase - Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) - RLS requirements, enabling RLS, policy creation
- [Vite - Server Options](https://vite.dev/config/server-options) - Official proxy configuration, port settings
- [TypeScript - TSConfig Strict](https://www.typescriptlang.org/tsconfig/strict.html) - Official strictness flags documentation

### Secondary (MEDIUM confidence)

- [Deploying MERN to Vercel (Monorepo with Express and Vite)](https://dev.to/bcncodeschool/deploying-a-mern-full-stack-web-application-on-vercelcom-with-express-and-vite-as-a-monorepo-49jc) - Monorepo deployment patterns
- [Vite + React + Express (2026)](https://medium.com/@encodedots/from-vite-to-express-how-to-build-a-full-stack-app-step-by-step-8de7958bbd61) - Full-stack setup guide
- [Cloudinary Node.js SDK Setup](https://cloudinary.com/blog/uploading-images-node-js-cloudinary-node-sdk) - Configuration and upload patterns
- [3 Biggest Mistakes Using Supabase](https://medium.com/@lior_amsalem/3-biggest-mistakes-using-supabase-854fe45712e3) - RLS pitfalls, service key misuse
- [Fixing 404 Errors on Vercel (TypeScript Express)](https://blog.itsahmadawais.com/fixing-404-errors-on-vercel-how-to-deploy-a-typescript-expressjs-nodejs-app) - Vercel deployment issues
- [Running React and Express with Concurrently](https://blog.logrocket.com/running-react-express-concurrently/) - Dev server patterns
- [Resolving CORS Issues in React with Vite](https://medium.com/@kam96.5.20/resolving-cors-issues-in-react-applications-with-vite-0d78753ca12d) - Vite proxy + CORS middleware
- [Vite + React + TypeScript Best Practices (2026)](https://medium.com/@taedmonds/best-practices-for-react-js-with-vite-and-typescript-what-i-use-and-why-f4482558ed89) - Project structure, TypeScript config

### Tertiary (LOW confidence)

- [Cloudinary Free Tier Limits (2026)](https://thedigitalprojectmanager.com/tools/cloudinary-pricing/) - Third-party pricing overview (verify with official Cloudinary docs)
- [Development Time Pitfalls](https://topflightapps.com/ideas/how-long-does-it-take-to-develop-an-app/) - General app development timelines (not specific to this stack)
- [Best Practices for Supabase (Leanware)](https://www.leanware.co/insights/supabase-best-practices) - Third-party best practices guide (verify critical claims with official docs)

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** - All libraries verified with official documentation and current npm versions
- Architecture: **HIGH** - Patterns sourced from official Vite, Tailwind, and Supabase docs
- Pitfalls: **MEDIUM-HIGH** - Based on recent community issues (2024-2026) and official troubleshooting guides
- Timelines: **MEDIUM** - Based on general development experience, not specific to this exact stack

**Research date:** 2026-01-22
**Valid until:** Approximately 30-60 days. Stack is relatively stable (Vite, React, Express are mature), but:
- Watch for Tailwind v5 changes (could affect `@tailwindcss/vite` plugin)
- Supabase CLI evolving rapidly (local dev features)
- Vercel deployment patterns may shift with new serverless runtimes

**Verification priority for planner:**
1. **Verify Cloudinary free tier limits** with official dashboard before Phase 1 - ensures demo won't break
2. **Test Vercel TypeScript deployment** in Phase 1 setup - validates deployment pattern works
3. **Confirm PostGIS enabled early** - blocks geospatial features if forgotten
