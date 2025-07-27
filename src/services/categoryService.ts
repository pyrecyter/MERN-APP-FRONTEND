import { api } from '../utils/api';
import type { Category } from '../types';

export const getCategories = async (): Promise<Category[]> => {
  return api.get<Category[]>('/categories');
};

export const addCategory = async (name: string): Promise<Category> => {
  return api.post<Category>('/categories', { name });
};

export const updateCategory = async (id: string, name: string): Promise<Category> => {
  return api.patch<Category>(`/categories/${id}`, { name });
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
