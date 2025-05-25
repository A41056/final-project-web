import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { userApi } from "@/config/api";
const { Title } = Typography;
const ForgotPassword = () => {
    const [form] = Form.useForm();
    const resetPasswordMutation = userApi.useResetPassword();
    const handleSubmit = async (values) => {
        try {
            await resetPasswordMutation.mutateAsync(values);
            message.success("Mật khẩu mới đã được gửi đến email của bạn");
        }
        catch (err) {
            message.error(err.message || "Gửi mật khẩu mới thất bại");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-md shadow-md", bordered: false, children: [_jsx(Title, { level: 3, className: "text-center mb-6", children: "Forgot Password" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, children: [_jsx(Form.Item, { name: "email", label: "Email", rules: [
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "Invalid email!" },
                            ], children: _jsx(Input, {}) }), _jsxs(Form.Item, { children: [_jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "G\u1EEDi m\u1EADt kh\u1EA9u m\u1EDBi" }), _jsx("div", { className: "mt-4 text-center", children: _jsx(Link, { to: "/login", children: "Quay l\u1EA1i" }) })] })] })] }) }));
};
export default ForgotPassword;
