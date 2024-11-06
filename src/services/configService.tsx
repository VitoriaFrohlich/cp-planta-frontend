import axios, { AxiosInstance } from "axios";

export class configService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3000/api"
        });
    }

    //Category

    getAllCategories = async () => {
        return this.api.get("/categories");
    }
    
    getCategoryById = async (id: number) => {
        return this.api.get(`/categories/${id}`);
    }

    createCategory = async (data: CategoryDTO) => {
        return this.api.post("/categories", data);
    }

    updateCategory = async (id: number, data: CategoryDTO) => {
        return this.api.put(`/categories/${id}`, data);
    }

    deleteCategory = async (id: number) => {
        return this.api.delete(`/categories/${id}`);
    }
}