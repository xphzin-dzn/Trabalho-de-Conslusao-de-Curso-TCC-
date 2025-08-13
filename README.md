TCC - Sistema de Monitoramento com ESP32
Um sistema completo para coleta, armazenamento e visualização de dados de sensores (velocidade, temperatura, tensão e corrente) utilizando:

ESP32 (envio via Bluetooth)

Backend Node.js (API REST + MySQL)

App Mobile (React Native)

🛠 Tecnologias
Hardware
ESP32 com Bluetooth (BLE)

Sensores (simulados ou reais)

Backend
Node.js + Express

MySQL + Sequelize (ORM)

Autenticação JWT

Frontend Mobile
React Native (TypeScript)

React Navigation

React Native Chart Kit (gráficos)

⚙️ Configuração
1. Backend

cd backend
npm install
Banco de Dados
Crie um banco MySQL chamado tcc_esp32

Configure as credenciais no .env:


DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tcc_esp32
JWT_SECRET=sua_chave_secreta_aqui

Iniciar
node server.js

2. Mobile (React Native)

cd mobile
npm install
Configuração
Altere API_URL no arquivo src/services/api.ts para seu IP local

Executar
npx react-native run-android  # ou run-ios

3. ESP32 (Opcional)
Carregue o sketch esp32_ble_json.ino (na pasta /esp32)

O dispositivo aparecerá como ESP32_Sensor via Bluetooth

📌 Funcionalidades
✅ Autenticação de usuários (JWT)
✅ Coleta de dados via BLE/HTTP
✅ Armazenamento em banco de dados
✅ Gráficos em tempo real
✅ Simulador de dados (para desenvolvimento)


