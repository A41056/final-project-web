import React from "react";
import { Card, List, Button } from "antd";

interface ShippingAddressesProps {
  addresses: string[];  // List các địa chỉ nhận hàng của người dùng
  onAddAddress: () => void;  // Hàm xử lý khi thêm địa chỉ mới
}

const ShippingAddresses: React.FC<ShippingAddressesProps> = ({ addresses, onAddAddress }) => {
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
        dataSource={addresses}
        renderItem={(address, index) => (
          <List.Item key={index}>
            {address}
          </List.Item>
        )}
      />
      <Button
        type="primary"
        onClick={onAddAddress}
        style={{ marginTop: "16px", width: "100%" }}
      >
        Thêm địa chỉ mới
      </Button>
    </Card>
  );
};

export default ShippingAddresses;