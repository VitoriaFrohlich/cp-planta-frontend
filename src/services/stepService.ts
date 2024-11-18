import axiosInstance from './axiosInstance';
import { Step, CreateStepRequest } from '../types/Step';
import { response } from '../types/Default';

export const getSteps = async (): Promise<Step[]> => {
  const response = await axiosInstance.get<response>(
    '/steps/'
  );

  return response.data.data;
};

export const createStep = async (data: CreateStepRequest): Promise<boolean> => {
  const response = await axiosInstance.post<{ return: boolean }>('/step', data);
  return response.data.return;
};
