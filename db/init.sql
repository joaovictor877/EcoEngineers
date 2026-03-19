-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'operator',
  created_at TIMESTAMP DEFAULT now()
);

-- Materials
CREATE TABLE IF NOT EXISTS materials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  unit VARCHAR(20) DEFAULT 'kg',
  created_at TIMESTAMP DEFAULT now()
);

-- Wastes
CREATE TABLE IF NOT EXISTS wastes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  material_id INTEGER REFERENCES materials(id) ON DELETE SET NULL,
  quantity NUMERIC(12,3) NOT NULL,
  location VARCHAR(255),
  recovered BOOLEAN DEFAULT false,
  value NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Waste tracking
CREATE TABLE IF NOT EXISTS waste_tracking (
  id SERIAL PRIMARY KEY,
  waste_id INTEGER REFERENCES wastes(id) ON DELETE CASCADE,
  status VARCHAR(100) NOT NULL,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT now()
);

-- Seed sample materials
INSERT INTO materials (name, category, unit)
VALUES
  ('Aço', 'Metal', 'kg'),
  ('Ferro', 'Metal', 'kg'),
  ('Alumínio', 'Metal', 'kg'),
  ('Cobre', 'Metal', 'kg')
ON CONFLICT DO NOTHING;
