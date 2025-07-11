const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const { codeOfPractice } = require('../models'); // ✅ if that's the key name
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
    let list = await codeOfPractice.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET a code of practice by ID
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let foundCodeOfPractice = await codeOfPractice.findByPk(id);
    if (!foundCodeOfPractice) {
      return res.status(404).json({ error: 'Code of Practice not found' });
    }
    res.json(foundCodeOfPractice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a code of practice by ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if record exists
    const foundCodeOfPractice = await codeOfPractice.findByPk(id);
    if (!foundCodeOfPractice) {
      return res.status(404).json({ error: 'Code of Practice not found' });
    }

    // Validate request body
    const validationSchema = yup.object({
      title: yup.string().trim().min(3).max(100),
      description: yup.string().trim().min(3).max(500),
      authority: yup.string().trim().min(2).max(100),
      url: yup.string().url()
    });

    const validatedData = await validationSchema.validate(req.body, { abortEarly: false });

    // Update the record
    await foundCodeOfPractice.update(validatedData);

    res.json({
      message: "Code of Practice was updated successfully.",
      data: foundCodeOfPractice
    });

  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    // Handle other errors
    res.status(500).json({ error: err.message });
  }
});

// DELETE a code of practice by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    // First check if the record exists
    const foundCodeOfPractice = await codeOfPractice.findByPk(id);
    if (!foundCodeOfPractice) {
      return res.status(404).json({ 
        error: 'Code of Practice not found',
        message: `Code of Practice with id ${id} does not exist.`
      });
    }
    
    // Delete the record
    const num = await codeOfPractice.destroy({
      where: { id: id }
    });
    
    if (num === 1) {
      res.json({
        message: "Code of Practice was deleted successfully."
      });
    } else {
      // This shouldn't happen since we checked existence, but just in case
      res.status(500).json({
        error: "Unexpected error during deletion",
        message: `Failed to delete Code of Practice with id ${id}.`
      });
    }
    
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      message: "An error occurred while deleting the Code of Practice."
    });
  }
});

module.exports = router;