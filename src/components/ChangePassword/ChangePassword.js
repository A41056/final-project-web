import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button } from "antd";
const ChangePassword = () => {
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }), _jsxs(Form, { layout: "vertical", style: { maxWidth: "500px", margin: "0 auto" }, children: [_jsx(Form.Item, { name: "currentPassword", label: "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i", rules: [{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }], children: _jsx(Input.Password, { style: { width: "100%" } }) }), _jsx(Form.Item, { name: "newPassword", label: "M\u1EADt kh\u1EA9u m\u1EDBi", rules: [{ required: true, message: "Vui lòng nhập mật khẩu mới!" }], children: _jsx(Input.Password, { style: { width: "100%" } }) }), _jsx(Form.Item, { name: "confirmPassword", label: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u", dependencies: ["newPassword"], rules: [
                            { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("newPassword") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                                },
                            }),
                        ], children: _jsx(Input.Password, { style: { width: "100%" } }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", style: { width: "100%", padding: "10px" }, children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }) })] })] }));
};
export default ChangePassword;
