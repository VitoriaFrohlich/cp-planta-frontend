import axios, { AxiosInstance } from "axios";

interface UpdateCategoryDTO {
    description: string;
    active: boolean;
}

export class categoryService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: "http://3.135.202.176:3000",
        });
    }

    getAllCategories = async () => {
        return this.api.get("/categories?orderBy=id");
    }
    
    getCategoryById = async (id: number) => {
        return this.api.get(`/categories/${id}`);
    }

    createCategory = async (description: string) => {
        return this.api.post("/categories", {description});
    }

    updateCategory = async (id: number, body: UpdateCategoryDTO) => {
        return this.api.put(`/categories/${id}`, {body});
    }

    deleteCategory = async (id: number) => {
        return this.api.delete(`/categories/${id}`);
    }
}