export interface LoginResponse {
  data: {
    payload: {
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