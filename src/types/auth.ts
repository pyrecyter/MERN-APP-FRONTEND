export interface AuthResponse {
  message?: string;
  user: {
    name: string;
    email: string;
    role: "admin" | "manager" | "cashier" | "stock_keeper";
  };
  token: string;
}
