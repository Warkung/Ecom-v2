export interface UploadImageProps {
  form: {
    images: any[];
    [key: string]: any;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type OrderAdminType = OrderAdminType2[];

export interface OrderAdminType2 {
  id: number;
  cartTotal: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  orderedById: number;
  stripePaymentId: string;
  currency: string;
  amount: number;
  status: string;
  products: Product[];
  orderedBy: OrderedBy;
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

export interface OrderedBy {
  name: string | null;
  email: string;
  address: string;
}
