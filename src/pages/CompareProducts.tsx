import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Table, Button, notification } from "antd";
import { Product } from "../types";
import { useTheme } from "../theme";

import useProducts from "../hooks/useProducts";
import ComparisonResult from "../components/ComparisonResult";
import useProductComparison from "../hooks/useProductComparison";

export default function CompareProducts() {
  const navigate = useNavigate();
  const { products: allProducts } = useProducts();

  const { comparedProducts, removeProduct, addProduct } =
    useProductComparison();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const theme = useTheme();

  const columns = [
    { title: "Attribute", dataIndex: "attribute", key: "attribute" },
    ...comparedProducts.map((product) => ({
      title: product.title,
      dataIndex: product.id.toString(),
      key: product.id.toString(),
    })),
  ];

  const data = [
    {
      attribute: "Title",
      ...Object.fromEntries(comparedProducts.map((p) => [p.id, p.title])),
    },
    {
      attribute: "Price",
      ...Object.fromEntries(comparedProducts.map((p) => [p.id, p.price])),
    },
    {
      attribute: "Brand",
      ...Object.fromEntries(comparedProducts.map((p) => [p.id, p.brand])),
    },
    {
      attribute: "Category",
      ...Object.fromEntries(comparedProducts.map((p) => [p.id, p.category])),
    },
    {
      attribute: "Discount",
      ...Object.fromEntries(
        comparedProducts.map((p) => [p.id, p.discountPercentage])
      ),
    },
  ];

  const handleRemove = (productId: number) => {
    removeProduct(productId);

    notification.info({
      message: "Product Removed",
      description: "The product has been removed from comparison.",
    });

    // navigate back to the product details page if there are no more products to compare with
    if (comparedProducts.length <= 2) {
      navigate("/");
    }
  };

  const handleAddMore = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = (product: Product) => {
    // const newProducts = selectedProducts.filter(
    //   (p) => !comparedProducts.some((cp) => cp.id === p.id)
    // );
    if (comparedProducts.length > 4) {
      notification.warning({
        message: "Maximum Products Reached",
        description: "You can compare up to 4 products at a time.",
      });
      return;
    }

    addProduct(product);
    setIsModalVisible(false);

    notification.success({
      message: "Products Added",
      description: "Selected products have been added to comparison.",
    });
  };

  return (
    <div style={{ backgroundColor: theme.background, color: theme.text }}>
      <h2>Compare Products</h2>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.attribute}
      />

      {comparedProducts.map((product) => (
        <Button
          key={product.id}
          onClick={() => handleRemove(product.id)}
          style={{ marginLeft: "5px" }}
        >
          Remove {product.title}
        </Button>
      ))}

      <Button
        onClick={handleAddMore}
        disabled={comparedProducts.length >= 4}
        style={{ marginTop: "20px", marginLeft: "5px" }}
      >
        Add More
      </Button>

      {comparedProducts.length >= 2 && (
        <ComparisonResult products={comparedProducts} />
      )}

      <Modal
        title="Add More Products"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Table
          dataSource={allProducts.filter(
            (p) => !comparedProducts.some((cp) => cp.id === p.id)
          )}
          columns={[
            { title: "Title", dataIndex: "title", key: "title" },
            { title: "Brand", dataIndex: "brand", key: "brand" },
            { title: "Price", dataIndex: "price", key: "price" },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Button onClick={() => handleModalOk(record)}>Add</Button>
              ),
            },
          ]}
          pagination={false}
          scroll={{ y: 500 }}
        />
      </Modal>
    </div>
  );
}
