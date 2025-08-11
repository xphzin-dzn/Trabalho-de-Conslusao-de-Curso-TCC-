const axios = require('axios');

async function sendData() {
  const data = {
    velocidade: (Math.random() * 100).toFixed(2),
    temperatura: (25 + Math.random() * 10).toFixed(2),
    tensao: (12 + Math.random() * 5).toFixed(2),
    corrente: (0.5 + Math.random() * 2).toFixed(2),
    timestamp: Date.now()
  };

  try {
    const response = await axios.post('http://localhost:3000/api/sensor-data', data, {
      timeout: 5000 // 5 segundos de timeout
    });
    console.log('✅ Dados enviados:', data);
  } catch (error) {
    console.error('❌ Falha na conexão:');
    console.error('- URL correta?', error.config.url);
    console.error('- Servidor está rodando?');
    console.error('- Erro completo:', error.message);
  }
}

// Teste imediato + a cada 2 segundos
sendData();
setInterval(sendData, 2000);