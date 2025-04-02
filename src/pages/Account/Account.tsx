import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import moment from "moment";
import { useAuthStore } from "@/stores/authStore";
import { UserUpdate } from "@/types/user";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/components/ConfirmModal";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";

const { Option } = Select;

const USER_API_URL = import.meta.env.USER_API_URL || "http://localhost:6006";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = useAuthStore.getState().token;
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    if (response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const { user, logout, setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation để cập nhật user profile
  const updateMutation = useMutation({
    mutationFn: ({ endpoint, data }: { endpoint: string; data: UserUpdate }) =>
      fetchWithAuth(`${USER_API_URL}${endpoint}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (updatedUser) => {
      setUser({ ...user!, ...updatedUser }); // Cập nhật store
      message.success("Cập nhật thông tin thành công");
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });

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
    if (!user) {
      message.error("Không tìm thấy thông tin người dùng");
      return;
    }

    const submitData: UserUpdate = {
      id: user.id,
      email: values.email,
      phone: values.phone,
      address: values.address,
      gender: values.gender,
      age: values.age,
    };

    updateMutation.mutate({
      endpoint: `/users/${user.id}`,
      data: submitData,
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
              <Button
                type="primary"
                htmlType="submit"
                loading={updateMutation.isLoading}
                disabled={updateMutation.isLoading}
              >
                Lưu
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => setIsEditMode(false)}
                disabled={updateMutation.isLoading}
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
