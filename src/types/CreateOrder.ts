interface ProductionItem {
  final_product_id: number;
  production_quantity_estimated: number;
  production_quantity_real: number;
  batch: string;
  batch_expiration: string;
}

export interface CreateOrderRequest {
  production_date: string;
  production_items: ProductionItem[];
}
