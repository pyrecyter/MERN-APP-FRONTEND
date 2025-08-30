export interface SaleItem {
  productId: string;
  productName: string;
  productUnitPrice: number;
  quantity: number;
}

export interface Sale {
  _id: string;
  items: SaleItem[];
  customerName: string;
  address?: string;
  totalPrice: number;
}
