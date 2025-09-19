export interface LoginResponse {
  data: {
    payload: {
      enabled: any;
      role: string;
    };
  };
}

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}