export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  // Add other user fields as needed
}

export interface Category {
  id: string;
  name: string;
  // Add other category fields as needed
}

export interface Product {
  id: string;
  name: string;
  price: number;
  // Add other product fields as needed
}

export interface CartItem extends Product {
  count: number;
}

export interface EcomStoreState {
  user: User | null;
  token: string | null;
  categories: Category[];
  products: Product[];
  carts: CartItem[];
  actionLogin: (form: Record<string, any>) => Promise<any>;
  actionGetCategories: () => Promise<void>;
  actionGetProducts: (count: number) => Promise<void>;
  actionSearchFilters: (arg: any) => Promise<void>;
  actionAddToCart: (product: Product) => Promise<void>;
  actionUpdateQuantity: (id: string, newQuantity: number) => void;
  actionRemoveFromCart: (id: string) => void;
  actionClearCart: () => void;
  getTotalPrice: () => number;
}
