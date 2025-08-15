const { generateToken } = require('../config/auth');
const User = require('../models/User');

module.exports = {
  async register(req, res) {
    try {
      // Modificado para receber 'username' e 'email'
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password }); // Adicionado email
      const token = generateToken(user);
      res.status(201).json({ token });
    } catch (error) {
      // Adicionada uma verificação para erros de validação (como email duplicado)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Usuário ou email já existe.' });
      }
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      // O login continua funcionando com username ou email, vamos ajustar para email
      const { email, password } = req.body; // Alterado para email para corresponder à tela de login
      const user = await User.findOne({ where: { email } }); // Alterado para buscar por email
      if (!user) throw new Error('Usuário não encontrado');

      const isValid = await user.validPassword(password);
      if (!isValid) throw new Error('Senha incorreta');

      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
};