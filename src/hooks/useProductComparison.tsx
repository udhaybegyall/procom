import { useContext } from "react";
import { ProductComparisonContext } from "../contexts/ProductComparisonContext";

export default function useProductComparison() {
  const context = useContext(ProductComparisonContext);

  if (context === undefined) {
    throw new Error(
      "useProductComparison must be used within a ProductComparisonProvider"
    );
  }

  return context;
}
