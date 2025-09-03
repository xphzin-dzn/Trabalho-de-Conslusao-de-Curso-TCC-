const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { velocidade, temperatura, tensao, corrente, timestamp } = req.body;

    if (!velocidade || !temperatura || !tensao || !corrente) {
      return res.status(400).json({ error: "Dados incompletos!" });
    }

    const newData = await SensorData.create({
      velocidade: parseFloat(velocidade),
      temperatura: parseFloat(temperatura),
      tensao: parseFloat(tensao),
      corrente: parseFloat(corrente),
      timestamp: timestamp || Date.now()
    });

    res.status(201).json(newData);

  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get('/', async (req, res) => {
  try {
    const allData = await SensorData.findAll({
      order: [['timestamp', 'DESC']]
    });
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;