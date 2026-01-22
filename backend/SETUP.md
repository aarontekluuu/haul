## Backend Setup (Phase 1)

### Supabase
1. Create a new Supabase project.
2. Open the SQL editor and run `backend/database-setup.sql`.
3. Confirm the "Database setup complete!" message and PostGIS version.

### Environment
1. Copy `backend/.env.example` → `backend/.env`.
2. Fill in the Supabase URL and service role key.
3. Fill in Cloudinary credentials.

### Run locally
```
npm install
npm run dev
```

### Deploy on Vercel (backend)
1. Create a new Vercel project with root directory `backend`.
2. Set build settings: default (Vercel detects `api/index.ts`).
3. Add env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `PRIVY_APP_ID`, `PRIVY_APP_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `FRONTEND_URL`.
