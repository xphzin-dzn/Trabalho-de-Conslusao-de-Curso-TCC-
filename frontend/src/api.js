import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Altere para o IP da sua máquina se estiver testando no celular
});

export default api;