import { Product } from "../types";

export default function ComparisonResult({
  products,
}: {
  products: Product[];
}) {
  const calculateValue = (product: Product) => {
    return product.discountPercentage / product.price;
  };

  const getBestValueProduct = () => {
    return products.reduce((best, current) =>
      calculateValue(current) > calculateValue(best) ? current : best
    );
  };

  const bestValueProduct = getBestValueProduct();

  return (
    <div
      style={{
        marginTop: "30px",
      }}
    >
      <h3>Comparison Result</h3>
      <p>Best value product: {bestValueProduct.title}</p>
      <p>
        Brand: {bestValueProduct.brand} | Price: ${bestValueProduct.price} |
        Discount: {bestValueProduct.discountPercentage}%
      </p>
    </div>
  );
}
