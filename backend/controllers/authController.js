const { generateToken } = require('../config/auth');
const User = require('../models/User');

module.exports = {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      const token = generateToken(user);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
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