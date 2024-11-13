import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL, // Use variáveis de ambiente para o URL da API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
