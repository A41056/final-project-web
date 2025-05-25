import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Space,
  Checkbox,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  LoginOutlined,
  GoogleOutlined,
  FacebookFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import { userApi } from "@/config/api";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const loginMutation = userApi.useLogin();

  const handleSubmit = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    try {
      const response = await loginMutation.mutateAsync({
        Email: values.email,
        Password: values.password,
      });

      await login({
        email: values.email,
        password: values.password,
      });
      console.log('OKKKKKK');
      
      message.success("Đăng nhập thành công");
      navigate("/");
    } catch (error: any) {
      form.setFields([
        {
          name: "password",
          errors: ["Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."],
        },
      ]);
    }
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card
        className="w-full max-w-md shadow-xl rounded-2xl"
        bodyStyle={{ padding: "32px" }}
      >
        <Space direction="vertical" className="w-full" size="large">
          <div className="text-center mb-4">
            <Title level={3} style={{ marginBottom: 0 }}>
              Đăng nhập tài khoản
            </Title>
            <Text type="secondary">Chào mừng bạn quay trở lại 👋</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="you@example.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <Row justify="space-between" align="middle">
              <Col>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ tôi</Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <Link to="/forgot-password">
                  <Text type="secondary" underline>
                    Quên mật khẩu?
                  </Text>
                </Link>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<LoginOutlined />}
                loading={loginMutation.isLoading}
                block
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>hoặc đăng nhập với</Divider>

          <Row gutter={12}>
            <Col span={12}>
              <Button
                icon={<GoogleOutlined />}
                block
                onClick={() => handleSocialLogin("google")}
              >
                Google
              </Button>
            </Col>
            <Col span={12}>
              <Button
                icon={<FacebookFilled />}
                style={{ backgroundColor: "#1877f2", color: "#fff" }}
                block
                onClick={() => handleSocialLogin("facebook")}
              >
                Facebook
              </Button>
            </Col>
          </Row>

          <div className="text-center">
            <Text type="secondary">
              Chưa có tài khoản?{" "}
              <Link to="/register">
                <Text strong underline>
                  Đăng ký ngay
                </Text>
              </Link>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;