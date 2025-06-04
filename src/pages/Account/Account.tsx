import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, message, Card, Layout, Menu, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import OrderHistoryTab from "@/components/OrderHistoryTab/OrderHistoryTab"; // Import OrderHistoryTab component
import ChangePassword from "@/components/ChangePassword/ChangePassword";

const { Option } = Select;
const { Sider, Content } = Layout;

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // Track active tab
  const { user, logout, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate("/login");
  };

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
                <Menu.Item key="2" onClick={() => setActiveTab("changePassword")}>
                  Đổi mật khẩu
                </Menu.Item>
                <Menu.Item key="3" onClick={() => setActiveTab("orderHistory")}>
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
              {activeTab === "profile" && (
                <Form form={form} layout="vertical">
                  {/* Profile Form Fields */}
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item name="username" label="Tên đăng nhập">
                        <Input disabled />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ type: "email", required: true, message: "Vui lòng nhập email hợp lệ" }]}
                      >
                        <Input disabled={!isEditMode} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" }]}
                      >
                        <Input disabled={!isEditMode} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="address" label="Địa chỉ">
                        <Input disabled={!isEditMode} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    {isEditMode ? (
                      <>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={false}
                        >
                          Lưu thay đổi
                        </Button>
                        <Button
                          style={{ marginLeft: 8 }}
                          onClick={() => setIsEditMode(false)}
                        >
                          Hủy
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button type="default" danger onClick={handleLogoutConfirm}>
                          Đăng xuất
                        </Button>
                      </>
                    )}
                  </Form.Item>
                </Form>
              )}

              {activeTab === "orderHistory" && <OrderHistoryTab />}

              {activeTab === "changePassword" && <ChangePassword />}
            </Card>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default Account;