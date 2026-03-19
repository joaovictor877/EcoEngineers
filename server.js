require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const app = express();
app.use(cors());
app.use(express.json());

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).send({ error: 'Invalid token' });
  }
}

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name,email,password_hash) VALUES ($1,$2,$3) RETURNING id,name,email,role',
      [name, email, hash]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const r = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = r.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Materials
app.get('/api/materials', authMiddleware, async (req, res) => {
  try {
    const r = await pool.query('SELECT * FROM materials ORDER BY name');
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get materials' });
  }
});

app.post('/api/materials', authMiddleware, async (req, res) => {
  try {
    const { name, category, unit } = req.body;
    const r = await pool.query('INSERT INTO materials (name,category,unit) VALUES ($1,$2,$3) RETURNING *', [name, category, unit || 'kg']);
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create material' });
  }
});

// Wastes
app.post('/api/wastes', authMiddleware, async (req, res) => {
  try {
    const { material_id, quantity, location, value } = req.body;
    const r = await pool.query(
      'INSERT INTO wastes (user_id, material_id, quantity, location, value) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [req.user.id, material_id, quantity, location, value || 0]
    );
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register waste' });
  }
});

app.get('/api/wastes', authMiddleware, async (req, res) => {
  try {
    const r = await pool.query('SELECT w.*, m.name AS material_name FROM wastes w LEFT JOIN materials m ON w.material_id = m.id ORDER BY w.created_at DESC');
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch wastes' });
  }
});

// Dashboard stats
app.get('/api/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const total = await pool.query('SELECT COALESCE(SUM(quantity),0) as total FROM wastes');
    const reused = await pool.query('SELECT COALESCE(SUM(quantity),0) as reused FROM wastes WHERE recovered = true');
    const by_material = await pool.query('SELECT m.name, COALESCE(SUM(w.quantity),0) as total FROM materials m LEFT JOIN wastes w ON w.material_id = m.id GROUP BY m.name ORDER BY total DESC');
    res.json({ total_kg: Number(total.rows[0].total), reused_kg: Number(reused.rows[0].reused), by_material: by_material.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute dashboard stats' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server running on', port));