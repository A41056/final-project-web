import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, message, Card } from "antd";
import { useMutation } from "react-query";
import { useAuthStore } from "@/stores/authStore";
import { fetchWithAuth } from "@/config/api";
const ChangePassword = () => {
    const [form] = Form.useForm();
    const logout = useAuthStore((state) => state.logout);
    const changePasswordMutation = useMutation({
        mutationFn: (values) => fetchWithAuth(`/change-password`, {
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
    const onFinish = (values) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error("Mật khẩu xác nhận không khớp");
            return;
        }
        changePasswordMutation.mutate({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        });
    };
    return (_jsx(Card, { title: "\u0110\u1ED5i m\u1EADt kh\u1EA9u", style: { maxWidth: 500, margin: "0 auto" }, children: _jsxs(Form, { layout: "vertical", form: form, onFinish: onFinish, autoComplete: "off", children: [_jsx(Form.Item, { label: "M\u1EADt kh\u1EA9u c\u0169", name: "oldPassword", rules: [{ required: true, message: "Vui lòng nhập mật khẩu cũ" }], children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { label: "M\u1EADt kh\u1EA9u m\u1EDBi", name: "newPassword", rules: [{ required: true, message: "Vui lòng nhập mật khẩu mới" }], children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { label: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi", name: "confirmPassword", rules: [{ required: true, message: "Vui lòng xác nhận mật khẩu" }], children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", loading: changePasswordMutation.isLoading, children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }) })] }) }));
};
export default ChangePassword;
