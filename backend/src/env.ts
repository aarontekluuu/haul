import { cleanEnv, port, str } from 'envalid'

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development' }),
  PORT: port({ default: 3000 }),
  FRONTEND_URL: str({ default: 'http://localhost:5173' }),
  SUPABASE_URL: str(),
  SUPABASE_SERVICE_ROLE_KEY: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  PRIVY_APP_ID: str(),
  PRIVY_APP_SECRET: str(),
})
