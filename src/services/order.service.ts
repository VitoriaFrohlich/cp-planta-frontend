import axiosInstance from './axiosInstance';
import { Order, CreateOrderRequest, CreateOrderResponse } from '../types/Order';

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await axiosInstance.get<Order[]>('/order/getAll');
  return response.data;
};

export const createOrder = async (
  data: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const response = await axiosInstance.post<CreateOrderResponse>(
    '/order',
    data
  );
  return response.data;
};
