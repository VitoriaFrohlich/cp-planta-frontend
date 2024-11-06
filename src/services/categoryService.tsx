import axios, { AxiosInstance } from "axios";

export class categoryService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3000"
        });
    }

    getAllCategories = async () => {
        return this.api.get("/categories");
    }
    
    getCategoryById = async (id: number) => {
        return this.api.get(`/categories/${id}`);
    }

    createCategory = async (description: string) => {
        return this.api.post("/categories", {description});
    }

    updateCategory = async (id: number, description: string) => {
        return this.api.put(`/categories/${id}`, {description});
    }

    deleteCategory = async (id: number) => {
        return this.api.delete(`/categories/${id}`);
    }
}