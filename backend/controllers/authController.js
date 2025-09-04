// Importações necessárias para o funcionamento do controlador
const { generateToken } = require('../config/auth');
const User = require('../models/User');
const mailer = require('../config/mailer');
const crypto = require('crypto');

module.exports = {
  /**
   * @description Regista um novo utilizador no sistema.
   * Recebe username, email e password, cria o utilizador e retorna um token de autenticação.
   */
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      // O token não é enviado na resposta, conforme o novo fluxo
      res.status(201).json({ message: 'Utilizador criado com sucesso.' });
    } catch (error) {
      // Trata erros, especialmente o caso de e-mail ou nome de utilizador duplicado.
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Usuário ou email já existe.' });
      }
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * @description Autentica um utilizador existente.
   * Recebe email e password, verifica as credenciais e retorna um token se forem válidas.
   */
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

  /**
   * @description Inicia o processo de redefinição de senha.
   * Gera um token seguro, guarda-o no utilizador e envia-o por e-mail.
   */
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        const resetToken = user.generatePasswordResetToken();
        await user.save();

        // Envia o e-mail com o token (não encriptado) para o utilizador.
        await mailer.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Redefinição de Senha',
          html: `<p>Você solicitou uma redefinição de senha. Use o seguinte token para redefinir sua senha:</p>
                 <h3>${resetToken}</h3>
                 <p>Este token é válido por 15 minutos.</p>`,
        });
      }

      // Por segurança, respondemos sempre com sucesso para não revelar se um e-mail existe.
      res.status(200).json({ message: 'E-mail de recuperação enviado.' });

    } catch (error) {
      console.error('Erro no forgotPassword:', error);
      res.status(500).json({ error: 'Ocorreu um erro, tente novamente.' });
    }
  },

  /**
   * @description Finaliza o processo de redefinição de senha.
   * Valida o token e, se for válido, atualiza a senha do utilizador.
   */
  async resetPassword(req, res) {
    const { token, password } = req.body;

    try {
      // Encripta o token recebido para comparar com o que está no banco de dados.
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await User.findOne({
        where: {
          resetPasswordToken: hashedToken,
        }
      });

      // Verifica se o token existe e não expirou.
      if (!user || user.resetPasswordExpires < Date.now()) {
        return res.status(400).json({ error: 'Token inválido ou expirado.' });
      }

      // Atualiza a senha e limpa os campos do token. O hook no modelo User fará o hash.
      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      res.status(200).json({ message: 'Senha redefinida com sucesso.' });

    } catch (error) {
      console.error('Erro no resetPassword:', error);
      res.status(500).json({ error: 'Não foi possível redefinir a senha.' });
    }
  },

  /**
   * @description Altera a senha de um utilizador já autenticado.
   * Verifica a senha atual antes de permitir a alteração.
   */
  async changePassword(req, res) {
    // O ID do utilizador vem do token, que foi validado pelo middleware de autenticação.
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }

      // Valida se a senha atual fornecida pelo utilizador está correta.
      const isPasswordValid = await user.validPassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'A senha atual está incorreta.' });
      }

      // Atribui a nova senha. O hook 'beforeUpdate' no modelo User fará o hash.
      user.password = newPassword;
      await user.save();

      res.status(200).json({ message: 'Senha alterada com sucesso.' });

    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao tentar alterar a senha.' });
    }
  }
};

