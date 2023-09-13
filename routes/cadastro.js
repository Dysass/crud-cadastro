const PessoaController = require('../controllers/PessoaController');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

    try {
        const data = await PessoaController.create(req, res);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', PessoaController.getByIdHandler);


router.put('/:id', async (req, res) => {
  try {
    const updatedData = await PessoaController.update(req.params.id, req.body);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const deletedMessage = await PessoaController.deletePerson(req.params.id);
      res.status(200).json(deletedMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;