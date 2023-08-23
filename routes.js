const Person = require('./person');
const express = require('express');
const router = express.Router();

router.post('/cadastro', async (req, res) => {
    try {
      const person = new Person(req.body);
      await person.save();
      res.status(201).json(person);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });