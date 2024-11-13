export interface Order {
    id: string;
    description: string;
    status: string;
  }
  
  export interface OrderBatchMaterial {
    raw_material_id: string;
    quantity: number;
  }
  
  export interface CreateOrderRequest {
    final_product_id: string;
    order_batch_materials: OrderBatchMaterial[];
    production_line: string;
    expected_quantity: number;
  }
  
  export interface CreateOrderResponse {
    number: number;
    return: boolean;
    message: string;
  }
  