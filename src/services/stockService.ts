import axiosInstance from './axiosInstance';
import { Stock, CreateStockRequest } from '../types/Stock';

export const getAllStockItems = async (): Promise<Stock[]> => {
  const response = await axiosInstance.get<Stock[]>('/stock/getAll');
  return response.data;
};

export const createStockItem = async (data: CreateStockRequest): Promise<boolean> => {
  const response = await axiosInstance.post<{ return: boolean }>('/stock', data);
  return response.data.return;
};
