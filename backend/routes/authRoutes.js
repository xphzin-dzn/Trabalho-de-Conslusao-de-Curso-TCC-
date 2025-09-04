const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Certifique-se que importa o middleware

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// --- NOVA ROTA PROTEGIDA ABAIXO ---
router.put('/change-password', authMiddleware, authController.changePassword);

module.exports = router;