const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

router.post('/sensor-data', async (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: 'Formato de dados inválido. Esperava um array.' });
  }

  try {
    const newSensorData = await SensorData.bulkCreate(data);
    res.status(201).json(newSensorData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar os dados do sensor.' });
  }
});

module.exports = router;