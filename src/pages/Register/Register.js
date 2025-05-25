import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Select, Checkbox, Button, Typography, Card, Divider, Space, } from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
const { Option } = Select;
const { Title } = Typography;
const Register = () => {
    const [form] = Form.useForm();
    const { register } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            await register({
                email: values.email,
                password: values.password,
            });
            navigate("/login");
        }
        catch (error) {
            form.setFields([{ name: "email", errors: ["Registration failed"] }]);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-lg shadow-xl", bordered: false, children: [_jsx(Title, { level: 3, className: "text-center mb-6", children: "Create an Account" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, initialValues: { prefix: "84" }, children: [_jsx(Form.Item, { name: "email", label: "Email", rules: [
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "Invalid email!" },
                            ], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "password", label: "Password", rules: [{ required: true, message: "Please input your password!" }], hasFeedback: true, children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { name: "confirm", label: "Confirm Password", dependencies: ["password"], hasFeedback: true, rules: [
                                { required: true, message: "Please confirm your password!" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("The two passwords do not match!"));
                                    },
                                }),
                            ], children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { name: "phone", label: "Phone Number", rules: [{ required: true, message: "Please input your phone number!" }], children: _jsx(Input, { addonBefore: _jsx(Form.Item, { name: "prefix", noStyle: true, children: _jsxs(Select, { style: { width: 70 }, children: [_jsx(Option, { value: "84", children: "+84" }), _jsx(Option, { value: "85", children: "+85" })] }) }), style: { width: "100%" } }) }), _jsx(Form.Item, { name: "agreement", valuePropName: "checked", rules: [
                                {
                                    validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("Please agree to the terms")),
                                },
                            ], children: _jsxs(Checkbox, { children: ["I have read the ", _jsx("a", { href: "#", children: "agreement" })] }) }), _jsxs(Form.Item, { children: [_jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "Register" }), _jsxs("div", { className: "mt-4 text-center", children: ["Already have an account? ", _jsx(Link, { to: "/login", children: "Login" })] })] })] }), _jsx(Divider, { plain: true, children: "Or register with" }), _jsxs(Space, { direction: "vertical", className: "w-full", children: [_jsx(Button, { icon: _jsx(GoogleOutlined, {}), block: true, children: "Continue with Google" }), _jsx(Button, { icon: _jsx(FacebookFilled, {}), style: { background: "#3b5998", color: "#fff" }, block: true, children: "Continue with Facebook" })] })] }) }));
};
export default Register;
