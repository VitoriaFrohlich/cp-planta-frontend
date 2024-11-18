import axiosInstance from './axiosInstance';
import { Category, CreateCategoryRequest } from '../types/Category';
import { response } from '../types/Default';

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get<response>('/categories');
  return response.data.data;
};

export const createCategory = async (
  data: CreateCategoryRequest
): Promise<boolean> => {
  const response = await axiosInstance.post<{ return: boolean }>(
    '/categories',
    data
  );
  return response.data.return;
};
