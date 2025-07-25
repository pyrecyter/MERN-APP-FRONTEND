export interface User {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier' | 'stock_keeper';
}