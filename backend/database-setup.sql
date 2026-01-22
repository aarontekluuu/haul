-- Haul Database Setup
-- Run this in Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Enable PostGIS extension for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Stores table
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  hours JSONB,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (but no policies yet - backend will use service_role key)
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- Items table
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  condition TEXT,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'active',
  pickup_window_start TIMESTAMP,
  pickup_window_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  sold_at TIMESTAMP,
  picked_up_at TIMESTAMP
);

ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  email TEXT,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES users(id),
  store_id UUID REFERENCES stores(id),
  item_ids UUID[],
  total_price DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  store_payout DECIMAL(10, 2) NOT NULL,
  confirmation_code TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'pending',
  tx_hash TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  picked_up_at TIMESTAMP,
  refunded_at TIMESTAMP
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_store ON items(store_id);
CREATE INDEX idx_transactions_buyer ON transactions(buyer_id);
CREATE INDEX idx_transactions_store ON transactions(store_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- Geospatial index for stores
CREATE INDEX stores_lat_lng_idx ON stores(lat, lng);

-- Function to find nearby stores (using PostGIS)
CREATE OR REPLACE FUNCTION nearby_stores(
  user_lat DECIMAL,
  user_lng DECIMAL,
  radius_km DECIMAL DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  address TEXT,
  lat DECIMAL,
  lng DECIMAL,
  distance_km DECIMAL
)
LANGUAGE SQL
AS $$
  SELECT
    id,
    name,
    address,
    lat,
    lng,
    ROUND(
      CAST(
        ST_Distance(
          ST_MakePoint(lng, lat)::geography,
          ST_MakePoint(user_lng, user_lat)::geography
        ) / 1000 AS NUMERIC
      ),
      2
    ) AS distance_km
  FROM stores
  WHERE ST_DWithin(
    ST_MakePoint(lng, lat)::geography,
    ST_MakePoint(user_lng, user_lat)::geography,
    radius_km * 1000
  )
  ORDER BY ST_MakePoint(lng, lat)::geography <-> ST_MakePoint(user_lng, user_lat)::geography;
$$;

-- Verification query
SELECT 'Database setup complete!' AS status;
SELECT PostGIS_Version() AS postgis_version;
