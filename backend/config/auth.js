require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'minha_chave_secreta_super_segura';

function generateToken(user) {
  return jwt.sign({ id: user.id }, secret, { expiresIn: '24h' });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };