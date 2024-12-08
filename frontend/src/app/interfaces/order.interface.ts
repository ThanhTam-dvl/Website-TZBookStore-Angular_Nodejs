export interface OrderStatus {
  width: string;
  text: string;
  class: string;
}

export interface OrderStatusMap {
  [key: string]: OrderStatus;
}

export interface OrderItem {
  book_id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: number;
  user_id: number;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  payment_method: string;
  order_notes: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
} 