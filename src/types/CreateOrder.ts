interface ProductionItem {
    final_product_id: Number;
    production_quantity_estimated: Number;
    production_quantity_real: Number;
    batch: string;
    batch_expiration: string;
}

export interface CreateOrderRequest {
    production_date: string;
    production_items: ProductionItem[];
}