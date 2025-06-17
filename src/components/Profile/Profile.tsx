import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import { userApi } from "@/config/api"; // Import API hook
import ConfirmModal from "@/components/ConfirmModal";  // Import ConfirmModal component
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState<any>(null); // Store user data
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserData(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }, [form]);

  const updateUserMutation = userApi.usePut();

  const handleSubmit = async (values: any) => {
    const updatedData = { ...userData };

    // Only update fields that have changed
    let isUpdated = false;
    if (values.firstName !== userData.firstName) {
      updatedData.firstName = values.firstName;
      isUpdated = true;
    }
    if (values.lastName !== userData.lastName) {
      updatedData.lastName = values.lastName;
      isUpdated = true;
    }
    if (values.email !== userData.email) {
      updatedData.email = values.email;
      isUpdated = true;
    }
    if (values.phone !== userData.phone) {
      updatedData.phone = values.phone;
      isUpdated = true;
    }

    // If no fields have changed, do not send an update request
    if (!isUpdated) {
      Modal.info({
        title: "Thông báo",
        content: "Không có thay đổi nào để cập nhật.",
      });
      return;
    }

    // If there are updates, send them to the API
    updateUserMutation.mutate(
      {
        endpoint: `/users/${userData.id}`,
        data: updatedData,
      },
      {
        onSuccess: () => {
          localStorage.setItem("user", JSON.stringify(updatedData)); // Save updated user data to localStorage
          setIsEditMode(false); // Switch off edit mode
        },
      }
    );
  };

  const handleLogoutConfirm = () => {
    setIsModalVisible(true); // Show the logout confirm modal
  };

  const onConfirmLogout = () => {
    // Handle logout logic (e.g., clear session, redirect to login page)
    localStorage.removeItem("user");
    setIsModalVisible(false); // Hide modal after confirmation
    navigate("/login");
  };

  const onCancelLogout = () => {
    setIsModalVisible(false); // Just hide the modal
  };

  return (
    <div className="profile-container">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="username" label="Tên tài khoản">
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
            <Form.Item name="firstName" label="Họ">
              <Input disabled={!isEditMode} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="lastName" label="Tên">
              <Input disabled={!isEditMode} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          {isEditMode ? (
            <>
              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => setIsEditMode(false)}>
                Hủy
              </Button>
            </>
          ) : (
            <>
              <Button type="default" danger onClick={handleLogoutConfirm}>
                Đăng xuất
              </Button>
              <Button
                type="default"
                style={{ marginLeft: 8 }}
                onClick={() => setIsEditMode(true)}
              >
                Chỉnh sửa
              </Button>
            </>
          )}
        </Form.Item>
      </Form>

      <ConfirmModal
        open={isModalVisible}
        title="Xác nhận đăng xuất"
        content="Bạn có chắc chắn muốn đăng xuất?"
        onConfirm={onConfirmLogout}
        onCancel={onCancelLogout}
        confirmText="Đồng ý"
        cancelText="Hủy"
      />
    </div>
  );
};

export default Profile;