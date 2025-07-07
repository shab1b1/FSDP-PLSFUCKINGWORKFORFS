const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// CREATE a new code of practice
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await db.execute(
      'INSERT INTO cop (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all codes of practice
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM cop');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single code of practice by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM cop WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a code of practice by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await db.execute(
      'UPDATE cop SET title = ?, description = ? WHERE id = ?',
      [title, description, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ id: req.params.id, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a code of practice by ID
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.execute(
      'DELETE FROM cop WHERE id = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Code of Practice deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;