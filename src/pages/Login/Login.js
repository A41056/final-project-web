import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Card, Space, Checkbox, Row, Col, Divider, message, } from "antd";
import { LockOutlined, MailOutlined, LoginOutlined, GoogleOutlined, FacebookFilled, } from "@ant-design/icons";
import { userApi } from "@/config/api";
const { Title, Text } = Typography;
const Login = () => {
    const [form] = Form.useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const loginMutation = userApi.useLogin();
    const handleSubmit = async (values) => {
        try {
            const response = await loginMutation.mutateAsync({
                Email: values.email,
                Password: values.password,
            });
            await login({
                email: values.email,
                password: values.password,
            });
            message.success("Đăng nhập thành công");
            navigate("/");
        }
        catch (error) {
            form.setFields([
                {
                    name: "password",
                    errors: ["Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."],
                },
            ]);
        }
    };
    const handleSocialLogin = (provider) => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100 px-4", children: _jsx(Card, { className: "w-full max-w-md shadow-xl rounded-2xl", children: _jsxs(Space, { direction: "vertical", className: "w-full", size: "large", children: [_jsxs("div", { className: "text-center mb-4", children: [_jsx(Title, { level: 3, style: { marginBottom: 0 }, children: "\u0110\u0103ng nh\u1EADp t\u00E0i kho\u1EA3n" }), _jsx(Text, { type: "secondary", children: "Ch\u00E0o m\u1EEBng b\u1EA1n quay tr\u1EDF l\u1EA1i" })] }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, size: "large", initialValues: { remember: true }, children: [_jsx(Form.Item, { name: "email", label: "Email", rules: [{ required: true, message: "Vui lòng nhập email!" }], children: _jsx(Input, { prefix: _jsx(MailOutlined, {}), placeholder: "you@example.com" }) }), _jsx(Form.Item, { name: "password", label: "M\u1EADt kh\u1EA9u", rules: [{ required: true, message: "Vui lòng nhập mật khẩu!" }], children: _jsx(Input.Password, { prefix: _jsx(LockOutlined, {}), placeholder: "Nh\u1EADp m\u1EADt kh\u1EA9u" }) }), _jsxs(Row, { justify: "space-between", align: "middle", children: [_jsx(Col, { children: _jsx(Form.Item, { name: "remember", valuePropName: "checked", noStyle: true, children: _jsx(Checkbox, { children: "Ghi nh\u1EDB t\u00F4i" }) }) }), _jsx(Col, { children: _jsx(Link, { to: "/forgot-password", children: _jsx(Text, { type: "secondary", underline: true, children: "Qu\u00EAn m\u1EADt kh\u1EA9u?" }) }) })] }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", icon: _jsx(LoginOutlined, {}), loading: loginMutation.isLoading, block: true, children: "\u0110\u0103ng nh\u1EADp" }) })] }), _jsx(Divider, { plain: true, children: "ho\u1EB7c \u0111\u0103ng nh\u1EADp v\u1EDBi" }), _jsxs(Row, { gutter: 12, children: [_jsx(Col, { span: 12, children: _jsx(Button, { icon: _jsx(GoogleOutlined, {}), block: true, onClick: () => handleSocialLogin("google"), children: "Google" }) }), _jsx(Col, { span: 12, children: _jsx(Button, { icon: _jsx(FacebookFilled, {}), style: { backgroundColor: "#1877f2", color: "#fff" }, block: true, onClick: () => handleSocialLogin("facebook"), children: "Facebook" }) })] }), _jsx("div", { className: "text-center", children: _jsxs(Text, { type: "secondary", children: ["Ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?", " ", _jsx(Link, { to: "/register", children: _jsx(Text, { strong: true, underline: true, children: "\u0110\u0103ng k\u00FD ngay" }) })] }) })] }) }) }));
};
export default Login;
