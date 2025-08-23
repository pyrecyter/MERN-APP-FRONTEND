import { createContext } from "react";
import type { Product } from "../types";

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);
