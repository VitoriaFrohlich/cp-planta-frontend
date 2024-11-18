import axiosInstance from './AxiosInstance';

export interface UpdateCategoryDTO {
  description: string;
  active: boolean;
}

export class categoryService {
  getAllCategories = async () => {
    return axiosInstance.get('/categories?orderBy=id');
  };

  getCategoryById = async (id: number) => {
    return axiosInstance.get(`/categories/${id}`);
  };

  createCategory = async (description: string) => {
    return axiosInstance.post('/categories', { description });
  };

  updateCategory = async (id: number, data: UpdateCategoryDTO) => {
    const response = axiosInstance.patch(`/categories/${id}`, data);
    return response;
  };

  deleteCategory = async (id: number) => {
    return axiosInstance.delete(`/categories/${id}`);
  };
}
