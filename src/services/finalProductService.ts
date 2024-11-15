import axiosInstance from './axiosInstance';
import {
  FinalProduct,
  CreateFinalProductRequest,
  ProductStep,
  ProductMaterial,
  BatchProduct
} from '../types/FinalProduct';

export const getAllFinalProducts = async (): Promise<FinalProduct[]> => {
  const response = await axiosInstance.get<FinalProduct[]>(
    '/final-product/getAll'
  );
  return response.data;
};

export const createFinalProduct = async (
  data: CreateFinalProductRequest
): Promise<boolean> => {
  const response = await axiosInstance.post<{ return: boolean }>(
    '/final_product',
    data
  );
  return response.data.return;
};

export const getProductSteps = async (
  productId: string
): Promise<ProductStep[]> => {
  const response = await axiosInstance.get<ProductStep[]>(
    `/product_step/getByProduct/${productId}`
  );
  return response.data;
};

export const getProductMaterials = async (
  productId: string
): Promise<ProductMaterial[]> => {
  const response = await axiosInstance.get<ProductMaterial[]>(
    `/product_material/getByProduct/${productId}`
  );
  return response.data;
};

export const getBatchProducts = async (
  productId: string
): Promise<BatchProduct[]> => {
  const response = await axiosInstance.get<BatchProduct[]>(
    `/batch_product/getByProduct/${productId}`
  );
  return response.data;
};
