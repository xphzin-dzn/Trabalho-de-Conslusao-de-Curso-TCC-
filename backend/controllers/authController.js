const { generateToken } = require('../config/auth');
const User = require('../models/User');
const mailer = require('../config/mailer');
const crypto = require('crypto');

module.exports = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      const token = generateToken(user);
      res.status(201).json({ token });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Usuário ou email já existe.' });
      }
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('Usuário não encontrado');

      const isValid = await user.validPassword(password);
      if (!isValid) throw new Error('Senha incorreta');

      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const resetToken = user.generatePasswordResetToken();
        await user.save();
        await mailer.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Redefinição de Senha',
          html: `<p>Token para redefinição de senha:</p><h3>${resetToken}</h3>`,
        });
      }
      res.status(200).json({ message: 'E-mail de recuperação enviado.' });
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro, tente novamente.' });
    }
  },

  async resetPassword(req, res) {
    const { token, password } = req.body;
    try {
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      const user = await User.findOne({ where: { resetPasswordToken: hashedToken } });
      if (!user || user.resetPasswordExpires < Date.now()) {
        return res.status(400).json({ error: 'Token inválido ou expirado.' });
      }
      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Não foi possível redefinir a senha.' });
    }
  },

  async changePassword(req, res) {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }
      const isPasswordValid = await user.validPassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'A senha atual está incorreta.' });
      }
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: 'Senha alterada com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao tentar alterar a senha.' });
    }
  }
};