import React, { useState } from "react";
import { Layout, Menu, Avatar, Row, Col, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Profile from "@/components/Profile/Profile"; // Import Profile component
import ShippingAddresses from "@/components/ShippingAddresses/ShippingAddresses";
import ChangePassword from "../ForgotPassword/ChangePassword";
import OrderHistoryTab from "@/components/OrderHistoryTab/OrderHistoryTab";

const { Sider, Content } = Layout;

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Track active tab
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userAddresses = user.address || []; // Get user addresses from localStorage

  return (
    <Layout style={{ minHeight: "100vh", margin: "0 auto", maxWidth: "70%", borderRadius: "8px" }}>
      <Layout style={{ padding: "24px" }}>
        <Row gutter={24}>
          {/* Sidebar */}
          <Col span={6}>
            <Card
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  style={{ marginBottom: "16px" }}
                />
              </div>
              <Menu mode="inline" defaultSelectedKeys={["1"]} style={{ height: "100%" }}>
                <Menu.Item key="1" onClick={() => setActiveTab("profile")}>
                  Thông tin tài khoản
                </Menu.Item>
                <Menu.Item key="2" onClick={() => setActiveTab("shippingAddresses")}>
                  Địa chỉ nhận hàng
                </Menu.Item>
                <Menu.Item key="3" onClick={() => setActiveTab("changePassword")}>
                  Đổi mật khẩu
                </Menu.Item>
                <Menu.Item key="4" onClick={() => setActiveTab("orderHistory")}>
                  Lịch sử đơn hàng
                </Menu.Item>
              </Menu>
            </Card>
          </Col>

          {/* Profile Form Section */}
          <Col span={18}>
            <Card
              title="Thông tin tài khoản"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "24px",
              }}
            >
              {activeTab === "profile" && <Profile />}
              {activeTab === "shippingAddresses" && <ShippingAddresses addresses={userAddresses} />}
              {activeTab === "changePassword" && <ChangePassword />}
              {activeTab === "orderHistory" && <OrderHistoryTab />}
            </Card>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default Account;