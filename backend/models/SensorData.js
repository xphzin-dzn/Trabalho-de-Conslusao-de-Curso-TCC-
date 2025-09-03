const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SensorData = sequelize.define('SensorData', {
  velocidade: DataTypes.FLOAT,
  temperatura: DataTypes.FLOAT,
  tensao: DataTypes.FLOAT,
  corrente: DataTypes.FLOAT,
  timestamp: DataTypes.BIGINT
}, {
  tableName: 'sensor_data',
  timestamps: false
});

module.exports = SensorData;