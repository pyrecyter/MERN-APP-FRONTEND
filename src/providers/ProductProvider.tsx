import { type ReactNode, useState, useEffect } from "react";
import { ProductContext } from "../contexts";
import type { Product } from "../types";
import { getProducts, isAuthenticated } from "../services";
import { useSnackbar } from "../hooks";

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { showMessage } = useSnackbar();

  useEffect(() => {
    if (!isAuthenticated()) return;
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        showMessage("Failed to fetch products", "error");
      }
    };

    fetchProducts();
  }, [showMessage]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
