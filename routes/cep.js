const CepController = require('../controllers/CepController');
const express = require('express');
const router = express.Router();

router.get('/:cep', async (req, res) => {
    const cep = req.params.cep;

    try {
        const data = await CepController.get(cep);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;