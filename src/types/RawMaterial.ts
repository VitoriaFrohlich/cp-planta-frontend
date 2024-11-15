import { Category } from './Category';

export interface RawMaterial {
  id: string;
  description: string;
  category: Category;
  image: string;
  batch_quantity: number;
}

export interface CreateRawMaterialRequest {
  description: string;
  category_id: string;
  image: string;
}

export interface RawMaterialList {
  id: string;
  description: string;
}
