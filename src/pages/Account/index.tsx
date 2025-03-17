import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import moment from "moment";
import { useAuthStore } from "@/stores/authStore";
import { updateUserProfile } from "@/services/accountServices";
import { UserUpdate } from "@/types/user";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/components/ConfirmModal";

const { Option } = Select;

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const formattedData = {
        ...user,
        birthday: user.createdDate ? moment(user.createdDate) : null,
      };
      form.setFieldsValue(formattedData);
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    console.log("onFinish called with values:", values);
    if (!user) {
      message.error("Không tìm thấy thông tin người dùng");
      return;
    }

    try {
      setLoading(true);
      const submitData: UserUpdate = {
        id: user.id,
        email: values.email,
        phone: values.phone,
        address: values.address,
        gender: values.gender,
        age: values.age,
      };

      await updateUserProfile(submitData);
      useAuthStore.getState().setUser({
        ...user,
        ...submitData,
      });
      message.success("Cập nhật thông tin thành công");
      setIsEditMode(false);
    } catch (error) {
      message.error("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Edit mode enabled, isEditMode before:", isEditMode);
    setIsEditMode(true);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate("/login");
    setIsLogoutModalVisible(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <h2>Thông tin người dùng</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={!isEditMode}
      >
        <Form.Item name="username" label="Tên đăng nhập">
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "Email không hợp lệ" },
            { required: true, message: "Vui lòng nhập email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Địa chỉ">
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính">
          <Select>
            <Option value="Male">Nam</Option>
            <Option value="Female">Nữ</Option>
            <Option value="Other">Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item name="age" label="Tuổi">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="birthday" label="Ngày sinh">
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item name="id" label="ID" hidden>
          <Input disabled />
        </Form.Item>

        <Form.Item>
          {isEditMode ? (
            <>
              <Button type="primary" htmlType="submit" loading={loading}>
                Lưu
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => setIsEditMode(false)}
              >
                Hủy
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              onClick={handleEditClick}
              disabled={isEditMode}
            >
              Chỉnh sửa
            </Button>
          )}
          <Button
            type="default"
            danger
            style={{ marginLeft: 8 }}
            onClick={handleLogoutClick}
            disabled={false}
          >
            Đăng xuất
          </Button>
        </Form.Item>
      </Form>

      {/* Custom ConfirmModal */}
      <ConfirmModal
        visible={isLogoutModalVisible}
        title="Xác nhận đăng xuất"
        content="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        confirmText="Đăng xuất"
        cancelText="Hủy"
      />
    </div>
  );
};

export default Account;
