import { createContext } from 'react';
import type { Category } from '../types';

interface CategoryContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);
