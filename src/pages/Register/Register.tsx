import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Typography,
  Card,
  Divider,
  Space,
} from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      await register({
        email: values.email,
        password: values.password,
      });
      navigate("/login");
    } catch (error) {
      form.setFields([{ name: "email", errors: ["Registration failed"] }]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-lg shadow-xl" bordered={false}>
        <Title level={3} className="text-center mb-6">Create an Account</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ prefix: "84" }}
        >
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

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input
              addonBefore={
                <Form.Item name="prefix" noStyle>
                  <Select style={{ width: 70 }}>
                    <Option value="84">+84</Option>
                    <Option value="85">+85</Option>
                  </Select>
                </Form.Item>
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error("Please agree to the terms")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="#">agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
            <div className="mt-4 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form.Item>
        </Form>

        <Divider plain>Or register with</Divider>
        <Space direction="vertical" className="w-full">
          <Button icon={<GoogleOutlined />} block>
            Continue with Google
          </Button>
          <Button icon={<FacebookFilled />} style={{ background: "#3b5998", color: "#fff" }} block>
            Continue with Facebook
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Register;