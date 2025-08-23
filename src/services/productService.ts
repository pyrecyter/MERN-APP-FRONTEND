import { api } from "../utils/api";
import type { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  return api.get<Product[]>("/products");
};

export const addProduct = async (
  productData: Omit<Product, "_id" | "images">
): Promise<Product> => {
  return api.post<Product>("/products", productData);
};

export const updateProduct = async (
  id: string,
  productData: Partial<Product>
): Promise<Product> => {
  return api.patch<Product>(`/products/${id}`, productData);
};

export const deleteProduct = async (id: string): Promise<void> => {
  return api.delete(`/products/${id}`);
};

export const updateStock = async (
  id: string,
  stock: number
): Promise<Product> => {
  return api.patch<Product>(`/products/${id}/stock`, { stock });
};
