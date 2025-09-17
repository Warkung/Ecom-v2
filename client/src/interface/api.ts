export interface AuthResponse {
  // Add properties based on your API response, for example:
  // id: string;
  // name: string;
  // email: string;
  // role: string;
  [key: string]: any;
}

export interface PayloadType {
  paymentIntent: {
    amount: number;
    currency: string;
    id: string;
    status: string;
  };
}