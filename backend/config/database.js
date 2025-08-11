const { Sequelize } = require('sequelize'); // Adicione esta linha

const sequelize = new Sequelize('tcc_esp32', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;