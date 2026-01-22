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
