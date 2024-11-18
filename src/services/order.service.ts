import axiosInstance from './axiosInstance';
import { Order, CreateOrderRequest, CreateOrderResponse } from '../types/Order';
import { response } from '../types/Default';

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await axiosInstance.get<Order[]>('/order/getAll');
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axiosInstance.get<response>('/orders');
    if(!response.data.sucess)
    {
      throw response.data.message;
    }
    return response.data.data;
  } catch (error) {
    console.error(
      'Erro ao buscar ordens:',
      process.env.NEXT_PUBLIC_API_URL,
      error
    );
    return [];
  }
}

export const createOrder = async (
  data: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const response = await axiosInstance.post<CreateOrderResponse>(
    '/order',
    data
  );
  return response.data;
};
