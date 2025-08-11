// Importações necessárias no topo do arquivo
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme sua estrutura

// Definição do modelo
const SensorData = sequelize.define('SensorData', {
  velocidade: DataTypes.FLOAT,
  temperatura: DataTypes.FLOAT,
  tensao: DataTypes.FLOAT,
  corrente: DataTypes.FLOAT,
  timestamp: DataTypes.BIGINT
}, {
  tableName: 'sensor_data', // Garante que usará a tabela existente
  timestamps: false // Remove os campos 'createdAt' e 'updatedAt' (opcional)
});

module.exports = SensorData;