require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

const sensorRoutes = require('./routes/sensorRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use('/api/sensor-data', sensorRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('✅ Servidor rodando em http://localhost:3000');
      console.log('✅ Banco de dados conectado!');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1);
  });

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error('Erro interno:', err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});