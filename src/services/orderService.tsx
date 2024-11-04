import axios, { AxiosInstance } from 'axios';
class OrderService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.API_URL,
    });
  }

  async getRawMaterials() {
    try {
      return this.api.get('/products');
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getCompositions() {
    try {
      return this.api.get('/compositions?orderBy=id');
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getRawMaterialById(id: number) {
    try {
      return this.api.get(`products/${id}`);
    } catch (error) {
      console.log(error);
      return {};
    }

  }

  async createOrder(data: OrderDTO) {
    try {
      return this.api.post('/orders', data);
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  //getEtapas

  //getProductLines ?

  //getNomeOrdem
}
const orderService = new OrderService();

export default new OrderService();
