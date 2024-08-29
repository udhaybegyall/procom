import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Table, Button, notification } from "antd";
import { Product } from "../types";
import useProducts from "../hooks/useProducts";
import { useTheme } from "../theme";

export default function CompareProducts() {
  const location = useLocation();
  const navigate = useNavigate();
  const { products: allProducts } = useProducts();
  const [compareProducts, setCompareProducts] = useState<Product[]>(
    (location.state as { products: Product[] })?.products || []
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const theme = useTheme();

  const columns = [
    { title: "Attribute", dataIndex: "attribute", key: "attribute" },
    ...compareProducts.map((product) => ({
      title: product.title,
      dataIndex: product.id.toString(),
      key: product.id.toString(),
    })),
  ];

  const data = [
    {
      attribute: "Title",
      ...Object.fromEntries(compareProducts.map((p) => [p.id, p.title])),
    },
    {
      attribute: "Price",
      ...Object.fromEntries(compareProducts.map((p) => [p.id, p.price])),
    },
    {
      attribute: "Brand",
      ...Object.fromEntries(compareProducts.map((p) => [p.id, p.brand])),
    },
    {
      attribute: "Category",
      ...Object.fromEntries(compareProducts.map((p) => [p.id, p.category])),
    },
    {
      attribute: "Discount",
      ...Object.fromEntries(
        compareProducts.map((p) => [p.id, p.discountPercentage])
      ),
    },
  ];

  const handleRemove = (productId: number) => {
    setCompareProducts(compareProducts.filter((p) => p.id !== productId));
    notification.info({
      message: "Product Removed",
      description: "The product has been removed from comparison.",
    });
    if (compareProducts.length <= 2) {
      navigate("/");
    }
  };

  const handleAddMore = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = (selectedProducts: Product[]) => {
    const newProducts = selectedProducts.filter(
      (p) => !compareProducts.some((cp) => cp.id === p.id)
    );
    if (compareProducts.length + newProducts.length > 4) {
      notification.warning({
        message: "Maximum Products Reached",
        description: "You can compare up to 4 products at a time.",
      });
      return;
    }
    setCompareProducts([...compareProducts, ...newProducts]);
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

      {compareProducts.map((product) => (
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
        disabled={compareProducts.length >= 4}
        style={{ marginTop: "20px", marginLeft: "5px" }}
      >
        Add More
      </Button>

      <Modal
        title="Add More Products"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Table
          dataSource={allProducts.filter(
            (p) => !compareProducts.some((cp) => cp.id === p.id)
          )}
          columns={[
            { title: "Title", dataIndex: "title", key: "title" },
            { title: "Brand", dataIndex: "brand", key: "brand" },
            { title: "Price", dataIndex: "price", key: "price" },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Button onClick={() => handleModalOk([record])}>Add</Button>
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
