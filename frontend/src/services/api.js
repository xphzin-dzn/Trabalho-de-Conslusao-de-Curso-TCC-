import axios from 'axios';

// Altere para o IP da sua máquina (ou localhost se estiver no Expo Web)
const API_BASE = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export default api;
