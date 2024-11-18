import axios, { AxiosInstance } from 'axios';
class HomeService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://3.135.202.176:3000'
    });
  }
  async getOrders() {
    try {
      const response = await this.api.get('/orders');
      return response.data;
    } catch (error) {
      console.error(
        'Erro ao buscar ordens:',
        process.env.NEXT_PUBLIC_API_URL,
        error
      );
      return [];
    }
  }
}
const homeServiceInstance = new HomeService();
export default homeServiceInstance;
