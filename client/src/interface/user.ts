export type OrderType = OrderType2[];

export interface OrderType2 {
  id: number;
  cartTotal: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  orderedById: number;
  stripePaymentId: string;
  amount: number;
  status: string;
  currency: string;
  products: Product[];
}

export interface Product {
  id: number;
  productId: number;
  orderId: number;
  count: number;
  price: number;
  product: Product2;
}

export interface Product2 {
  id: number;
  title: string;
  description: string;
  price: number;
  sold: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}