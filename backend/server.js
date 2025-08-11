require('dotenv').config(); // Adicione no topo para variáveis de ambiente
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

// Importe as novas rotas
const sensorRoutes = require('./routes/sensorRoutes');
const authRoutes = require('./routes/authRoutes'); // Nova rota de autenticação

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas públicas (não requerem autenticação)
app.use('/api/auth', authRoutes); // Login e registro

// Rotas protegidas (requerem token JWT)
app.use('/api/sensor-data', sensorRoutes); // Dados dos sensores

// Sincronização do banco de dados
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('✅ Servidor rodando em http://localhost:3000');
      console.log('✅ Banco de dados conectado!');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1); // Encerra o processo em caso de erro grave
  });

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware para erros globais
app.use((err, req, res, next) => {
  console.error('Erro interno:', err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});