const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação

// Todas as rotas exigem autenticação (mas não filtram por usuário)
router.use(authMiddleware);

// Rota POST para receber dados do ESP32 (aberta para qualquer usuário autenticado)
router.post('/', async (req, res) => {
  try {
    const { velocidade, temperatura, tensao, corrente, timestamp } = req.body;

    // Validação básica
    if (!velocidade || !temperatura || !tensao || !corrente) {
      return res.status(400).json({ error: "Dados incompletos!" });
    }

    const newData = await SensorData.create({
      velocidade: parseFloat(velocidade),
      temperatura: parseFloat(temperatura),
      tensao: parseFloat(tensao),
      corrente: parseFloat(corrente),
      timestamp: timestamp || Date.now()
      // Removido userId, pois os dados são compartilhados
    });

    res.status(201).json(newData);

  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota GET para listar todos os dados (acesso livre para usuários autenticados)
router.get('/', async (req, res) => {
  try {
    const allData = await SensorData.findAll({
      order: [['timestamp', 'DESC']] // Ordena do mais recente
    });
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;