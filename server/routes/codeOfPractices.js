const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const codeOfPractices  = require('../models'); // ✅ if that's the key name
const { Op } = require('sequelize');
const yup = require('yup');

// CREATE a new code of practice
router.post("/", async (req, res) => {
  const data = req.body;

  // Yup validation schema
  const validationSchema = yup.object({
    title: yup.string().trim().min(3).max(100).required(),
    description: yup.string().trim().min(3).max(500).required(),
    authority: yup.string().trim().min(2).max(100).required(),
    url: yup.string().url().required(),
  });

  try {
    const validated = await validationSchema.validate(data, { abortEarly: false });

    const [result] = await db.execute(
      'INSERT INTO cop (title, description, authority, url) VALUES (?, ?, ?, ?)',
      [validated.title, validated.description, validated.authority, validated.url]
    );

    res.status(201).json({
      id: result.insertId,
      ...validated,
    });
  } catch (err) {
    // Yup validation errors
    if (err.name === 'ValidationError') {
      res.status(400).json({ errors: err.errors });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// READ all codes of practice
router.get("/", async (req, res) => {
  try {
    let list = await codeOfPractices.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(list);
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