import axios, { AxiosInstance } from 'axios';
class OrderService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://3.135.202.176:3000',
      withCredentials: true
    });
  }
}
export default new OrderService();
