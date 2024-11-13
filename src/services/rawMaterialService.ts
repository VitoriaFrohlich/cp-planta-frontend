import axiosInstance from './axiosInstance';
import { RawMaterial, CreateRawMaterialRequest, RawMaterialList } from '../types/RawMaterial';

export const getAllRawMaterials = async (): Promise<RawMaterial[]> => {
  const response = await axiosInstance.get<RawMaterial[]>('/raw_material/getAll');
  return response.data;
};

export const createRawMaterial = async (data: CreateRawMaterialRequest): Promise<boolean> => {
  const response = await axiosInstance.post<{ return: boolean }>('/raw_material', data);
  return response.data.return;
};
