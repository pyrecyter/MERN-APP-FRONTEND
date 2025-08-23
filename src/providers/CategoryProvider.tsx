import React, { useState, useEffect } from "react";
import { CategoryContext } from "../contexts";
import type { Category } from "../types";
import { getCategories, isAuthenticated } from "../services";
import { useSnackbar } from "../hooks";

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { showMessage } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isAuthenticated()) return;
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        showMessage("Failed to fetch categories", "error");
      }
    };
    fetchCategories();
  }, [showMessage]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
