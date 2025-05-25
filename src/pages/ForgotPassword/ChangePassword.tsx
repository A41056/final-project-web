import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useMutation } from "react-query";
import { useAuthStore } from "@/stores/authStore";
import { fetchWithAuth } from "@/config/api";

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();
  const logout = useAuthStore((state) => state.logout);

  const changePasswordMutation = useMutation({
    mutationFn: (values: any) =>
      fetchWithAuth(`/change-password`, {
        method: "POST",
        body: JSON.stringify(values),
      }),
    onSuccess: () => {
      message.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại.");
      logout();
      window.location.href = "/login";
    },
    onError: () => {
      message.error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
    },
  });

  const onFinish = (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp");
      return;
    }
    changePasswordMutation.mutate({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <Card title="Đổi mật khẩu" style={{ maxWidth: 500, margin: "0 auto" }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={changePasswordMutation.isLoading}
          >
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;