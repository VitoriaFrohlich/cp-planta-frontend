import axios, { AxiosInstance } from 'axios';
class OrderService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  
  async getFinalProducts() {
    try {
      return this.api.get('/final_product');
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getCompositionsById(id: number) {
    try {
      return this.api.get(`compositions/${id}`);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getRawMaterialById(id: number) {
    try {
      return this.api.get(`raw_product/${id}`);
    } catch (error) {
      console.log(error);
      return {};
    }

  }

  async createOrder(data: any) {
    try {
      return this.api.post('/orders', data);
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  async getStepsById(id: number) {
    try {
      return this.api.get(`/steps${id}`);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //getProductLines ?

  //getNomeOrdem
}
const orderService = new OrderService();

export default new OrderService();
