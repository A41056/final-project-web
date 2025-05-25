import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { userApi } from "@/config/api";

const { Title } = Typography;

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const resetPasswordMutation = userApi.useResetPassword();

  const handleSubmit = async (values: { email: string }) => {
    try {
      await resetPasswordMutation.mutateAsync(values);
      message.success("Mật khẩu mới đã được gửi đến email của bạn");
    } catch (err: any) {
      message.error(err.message || "Gửi mật khẩu mới thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-md" bordered={false}>
        <Title level={3} className="text-center mb-6">Forgot Password</Title>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi mật khẩu mới
            </Button>
            <div className="mt-4 text-center">
              <Link to="/login">Quay lại</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;