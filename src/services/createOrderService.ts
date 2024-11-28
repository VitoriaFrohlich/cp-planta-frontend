import axiosInstance from './axiosInstance';
import { response } from '../types/Default';
import { CreateOrderRequest } from '../types/CreateOrder';

export const postCreateOrder = async (data: CreateOrderRequest) => {
  const response = await axiosInstance.post<response>('/production/', data);
  return response.data.sucess;
};

export const getAllBatchsByRawMaterial = async (id: string) => {
  const response = await axiosInstance.get<response>('/stock/batchs/' + id);
  return response.data.data;
};

export const getStepsByProductId = async (id: string) => {
  const response = await axiosInstance.get<response>(
    '/compositions/steps-by-product/' + id
  );
  return response.data.data;
};

export const getAllFinalProductSelect = async () => {
  const response = await axiosInstance.get<response>('/products/made-short');
  return response.data.data;
};

export const getAllCompositions = async () => {
  const response = await axiosInstance.get<response>('/compositions');
  return response.data.data;
};
