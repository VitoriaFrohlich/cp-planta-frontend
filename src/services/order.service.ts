import axios, { AxiosInstance } from 'axios';
class OrderService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.API_URL,
      withCredentials: true
    });
  }
}
const orderServiceInstance = new OrderService();
export default orderServiceInstance;
