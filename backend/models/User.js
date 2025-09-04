const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // Adicionado o campo de e-mail que estava em falta
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Adicionados campos para a redefinição de senha
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  hooks: {
    // Este hook encripta a senha quando um novo utilizador é criado
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    // --- ESTE É O HOOK ESSENCIAL QUE ESTAVA EM FALTA ---
    // Este hook encripta a senha sempre que ela for atualizada
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

// Compara a senha digitada com a senha encriptada no banco de dados
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Gera o token para a redefinição de senha
User.prototype.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutos

  return resetToken;
};

module.exports = User;