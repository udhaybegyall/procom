import { createContext, useState, ReactNode } from "react";
import { Product } from "../types";

interface ProductComparisonContextType {
  comparedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearProducts: () => void;
}

export const ProductComparisonContext = createContext<
  ProductComparisonContextType | undefined
>(undefined);

export const ProductComparisonProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    if (
      comparedProducts.length < 4 &&
      !comparedProducts.some((p) => p.id === product.id)
    ) {
      setComparedProducts([...comparedProducts, product]);
    }
  };

  const removeProduct = (productId: number) => {
    setComparedProducts(comparedProducts.filter((p) => p.id !== productId));
  };

  const clearProducts = () => {
    setComparedProducts([]);
  };

  return (
    <ProductComparisonContext.Provider
      value={{
        comparedProducts,
        addProduct,
        removeProduct,
        clearProducts,
      }}
    >
      {children}
    </ProductComparisonContext.Provider>
  );
};
