import { api } from "../utils";
import type { Sale } from "../types";

interface SalePayload {
  customerName: string;
  address?: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export const getSales = async (from?: string, to?: string): Promise<Sale[]> => {
  const params = new URLSearchParams();
  if (from) params.append("from", from);
  if (to) params.append("to", to);
  return api.get<Sale[]>(`/reports?${params.toString()}`);
};

export const createSale = async (payload: SalePayload): Promise<Sale> => {
  return api.post<Sale>("/sales", payload);
};

export const updateSale = async (
  saleId: string,
  payload: SalePayload
): Promise<Sale> => {
  return api.patch<Sale>(`/sales/${saleId}`, payload);
};

export const deleteSale = async (saleId: string): Promise<void> => {
  await api.delete<void>(`/sales/${saleId}`);
};
