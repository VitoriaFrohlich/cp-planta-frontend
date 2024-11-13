import axiosInstance from './axiosInstance';
import { Step, CreateStepRequest } from '../types/Step';

export const getAllSteps = async (): Promise<Step[]> => {
  const response = await axiosInstance.get<Step[]>('/step/getAll');
  return response.data;
};

export const createStep = async (data: CreateStepRequest): Promise<boolean> => {
  const response = await axiosInstance.post<{ return: boolean }>('/step', data);
  return response.data.return;
};
