import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.135.202.176:3000', // Substitua pelo IP público ou hostname do backend
  timeout: 5000, // Timeout opcional para evitar longas esperas
  headers: {
    'Content-Type': 'application/json' // Cabeçalho padrão
  }
});

export default axiosInstance;
