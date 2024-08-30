import { Table, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { Product } from "../types";
import { useTheme } from "../theme";

import useProductComparison from "../hooks/useProductComparison";

import useProducts from "../hooks/useProducts";

export default function ProductDetails() {
  const { products = [], loading, error } = useProducts();
  const { comparedProducts, addProduct } = useProductComparison();

  const navigate = useNavigate();
  const theme = useTheme();

  console.log(products);

  const columns: ColumnsType<Product> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => {
        return <img src={thumbnail} alt="thumbnail" width="100" height="100" />;
      },
    },
    {
      title: "Compare",
      key: "compare",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleCompare(record)}
          disabled={comparedProducts.some((p) => p.id === record.id)}
        >
          Compare
        </Button>
      ),
    },
  ];

  // handle compare button logic
  const handleCompare = (product: Product) => {
    if (comparedProducts.length >= 4) {
      // notify user if they try to add more than 4 products
      notification.warning({
        message: "Maximum products selected",
        description: "You can compare up to 4 products at a time.",
      });
      return;
    }

    // add product to comparedProducts array
    addProduct(product);

    // notify user that the product has been added to the comparison list
    notification.success({
      message: "Product added to comparison",
      description: `${product.title} has been added to the comparison list.`,
    });
  };

  // navigate to the compare page if the user has selected enough products
  const compareProducts = () => {
    if (comparedProducts.length < 2) {
      notification.warning({
        message: "Not enough products selected",
        description: "Please select at least 2 products to compare.",
      });
      return;
    }
    navigate("/compare");
  };

  if (loading) return <div style={{ color: theme.text }}>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ backgroundColor: theme.background, color: theme.text }}>
      <h2>Product Details</h2>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 500 }}
      />
      <Button
        type="primary"
        onClick={compareProducts}
        disabled={comparedProducts.length < 2}
      >
        Compare Products
      </Button>
    </div>
  );
}
