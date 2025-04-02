import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { userApi } from "@/config/api";

const { Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const loginMutation = userApi.useLogin();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginMutation.mutateAsync({
        Email: values.email,
        Password: values.password,
      });
      await login({
        email: values.email,
        password: values.password,
      });
      navigate("/");
    } catch (error: any) {
      form.setFields([
        {
          name: "password",
          errors: ["Login failed. Please check your credentials."],
        },
      ]);
    }
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  };

  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6">
        <Form
          form={form}
          {...formItemLayout}
          onFinish={handleSubmit}
          initialValues={{
            prefix: "84",
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loginMutation.isLoading}
              disabled={loginMutation.isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
