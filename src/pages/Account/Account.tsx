import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, message, Card, Space } from "antd";
import moment from "moment";
import { useAuthStore } from "@/stores/authStore";
import { UserUpdate } from "@/types/user";
import { useNavigate, Link } from "react-router-dom";
import ConfirmModal from "@/components/ConfirmModal";
import { userApi } from "@/config/api";

const { Option } = Select;

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const { user, logout, setUser } = useAuthStore();
  const navigate = useNavigate();
  const updateMutation = userApi.usePut();

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
    }, {
      onSuccess: (updatedUser: any) => {
        setUser({ ...user, ...updatedUser });
        message.success("Cập nhật thông tin thành công");
        setIsEditMode(false);
      },
    });
  };

  const handleEditClick = () => {
  setIsEditMode(true);
};

  const handleLogoutConfirm = () => {
    logout();
    navigate("/login");
    setIsLogoutModalVisible(false);
  };

  return (
    <Card title="Thông tin tài khoản" style={{ maxWidth: 700, margin: "0 auto" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="username" label="Tên đăng nhập">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true, message: "Vui lòng nhập email hợp lệ" }]}
        >
          <Input disabled={!isEditMode} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" }]}
        >
          <Input disabled={!isEditMode} />
        </Form.Item>

        <Form.Item name="address" label="Địa chỉ">
          <Input disabled={!isEditMode} />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính">
          <Select>
            <Option value="Male">Nam</Option>
            <Option value="Female">Nữ</Option>
            <Option value="Other">Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item name="age" label="Tuổi">
          <Input type="number" disabled={!isEditMode}/>
        </Form.Item>

        <Form.Item name="birthday" label="Ngày sinh">
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item hidden name="id">
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
    <>
      <Button
        type="primary"
        onClick={handleEditClick}
      >
        Chỉnh sửa
      </Button>
      <Button
        type="default"
        danger
        style={{ marginLeft: 8 }}
        onClick={handleLogoutConfirm}
      >
        Đăng xuất
      </Button>
      <Button
        style={{ marginLeft: 8 }}
        onClick={() => navigate("/change-password")}
      >
        Đổi mật khẩu
      </Button>
    </>
  )}
</Form.Item>
      </Form>

      <ConfirmModal
        visible={isLogoutModalVisible}
        title="Xác nhận đăng xuất"
        content="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsLogoutModalVisible(false)}
        confirmText="Đăng xuất"
        cancelText="Hủy"
      />
    </Card>
  );
};

export default Account;