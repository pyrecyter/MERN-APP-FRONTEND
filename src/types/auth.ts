export interface AuthResponse {
  message?: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "manager" | "cashier" | "stock_keeper";
  };
  token: string;
}
