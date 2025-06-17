import React, { useState } from "react";
import { Card, List, Button, Modal, Input, Form } from "antd";

interface ShippingAddressesProps {
  addresses: string[];
}

const ShippingAddresses: React.FC<ShippingAddressesProps> = ({ addresses }) => {
  const [newAddress, setNewAddress] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedAddresses, setUpdatedAddresses] = useState<string[]>(addresses);

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewAddress("");
  };

  const handleAddAddress = () => {
    if (newAddress.trim() === "") {
      Modal.error({
        title: "Thông báo",
        content: "Địa chỉ không thể để trống.",
      });
      return;
    }

    const updatedList = [...updatedAddresses, newAddress];
    setUpdatedAddresses(updatedList);
    localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user") || "{}"), address: updatedList }));
    setIsModalVisible(false);
    setNewAddress("");
  };

  return (
    <Card
      title="Địa chỉ nhận hàng"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "24px",
      }}
    >
      <List
        size="small"
        bordered
        dataSource={updatedAddresses}
        renderItem={(address, index) => (
          <List.Item key={index}>
            {address}
          </List.Item>
        )}
      />
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginTop: "16px", width: "100%" }}
      >
        Thêm địa chỉ mới
      </Button>

      <Modal
        title="Thêm địa chỉ mới"
        open={isModalVisible}
        onOk={handleAddAddress}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Địa chỉ mới">
            <Input
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Nhập địa chỉ mới"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ShippingAddresses;