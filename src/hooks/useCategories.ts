import { useContext } from 'react';
import { CategoryContext } from '../contexts';

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return { categories: context.categories, setCategories: context.setCategories };
};
