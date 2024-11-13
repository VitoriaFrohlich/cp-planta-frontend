import axiosInstance from './axiosInstance';
import { Category, CreateCategoryRequest } from '../types/Category';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get<Category[]>('/category/getAll');
  return response.data;
};

export const createCategory = async (data: CreateCategoryRequest): Promise<boolean> => {
  const response = await axiosInstance.post<{ return: boolean }>('/category', data);
  return response.data.return;
};
