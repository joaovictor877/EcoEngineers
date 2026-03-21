-- Users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'operator',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Materials
CREATE TABLE IF NOT EXISTS materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  unit VARCHAR(20) DEFAULT 'kg',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_materials_name (name)
) ENGINE=InnoDB;

-- Wastes
CREATE TABLE IF NOT EXISTS wastes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  material_id INT,
  quantity DECIMAL(12,3) NOT NULL,
  location VARCHAR(255),
  recovered TINYINT(1) DEFAULT 0,
  value DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_wastes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_wastes_material FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Waste tracking
CREATE TABLE IF NOT EXISTS waste_tracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  waste_id INT,
  status VARCHAR(100) NOT NULL,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_waste_tracking_waste FOREIGN KEY (waste_id) REFERENCES wastes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Seed sample materials
INSERT INTO materials (name, category, unit)
SELECT 'Aço', 'Metal', 'kg'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE name = 'Aço');

INSERT INTO materials (name, category, unit)
SELECT 'Ferro', 'Metal', 'kg'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE name = 'Ferro');

INSERT INTO materials (name, category, unit)
SELECT 'Alumínio', 'Metal', 'kg'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE name = 'Alumínio');

INSERT INTO materials (name, category, unit)
SELECT 'Cobre', 'Metal', 'kg'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE name = 'Cobre');
