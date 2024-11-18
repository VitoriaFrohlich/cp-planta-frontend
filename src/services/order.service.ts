import axios, { AxiosInstance } from 'axios';
class OrderService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL
    });
  }
}
const orderServiceInstance = new OrderService();
export default orderServiceInstance;
