const PessoaController = require('../controllers/PessoaController');
const express = require('express');
const router = express.Router();

router.get('/:id', PessoaController.getByIdHandler);

router.post('/', async (req, res) => {

    try {
        const data = await PessoaController.create(req, res);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;