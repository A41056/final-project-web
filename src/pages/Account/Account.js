import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, message, Card } from "antd";
import moment from "moment";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/components/ConfirmModal";
import { userApi } from "@/config/api";
const { Option } = Select;
const Account = () => {
    const [form] = Form.useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const { user, logout, setUser } = useAuthStore();
    const navigate = useNavigate();
    const updateMutation = userApi.usePut();
    useEffect(() => {
        if (user) {
            const formattedData = {
                ...user,
                birthday: user.createdDate ? moment(user.createdDate) : null,
            };
            form.setFieldsValue(formattedData);
        }
    }, [user, form]);
    const onFinish = async (values) => {
        if (!user) {
            message.error("Không tìm thấy thông tin người dùng");
            return;
        }
        const submitData = {
            id: user.id,
            email: values.email,
            phone: values.phone,
            address: values.address,
            gender: values.gender,
            age: values.age,
        };
        updateMutation.mutate({
            endpoint: `/users/${user.id}`,
            data: submitData,
        }, {
            onSuccess: (updatedUser) => {
                setUser({ ...user, ...updatedUser });
                message.success("Cập nhật thông tin thành công");
                setIsEditMode(false);
            },
        });
    };
    const handleEditClick = () => {
        setIsEditMode(true);
    };
    const handleLogoutConfirm = () => {
        logout();
        navigate("/login");
        setIsLogoutModalVisible(false);
    };
    return (_jsxs(Card, { title: "Th\u00F4ng tin t\u00E0i kho\u1EA3n", style: { maxWidth: 700, margin: "0 auto" }, children: [_jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, children: [_jsx(Form.Item, { name: "username", label: "T\u00EAn \u0111\u0103ng nh\u1EADp", children: _jsx(Input, { disabled: true }) }), _jsx(Form.Item, { name: "email", label: "Email", rules: [{ type: "email", required: true, message: "Vui lòng nhập email hợp lệ" }], children: _jsx(Input, { disabled: !isEditMode }) }), _jsx(Form.Item, { name: "phone", label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", rules: [{ pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" }], children: _jsx(Input, { disabled: !isEditMode }) }), _jsx(Form.Item, { name: "address", label: "\u0110\u1ECBa ch\u1EC9", children: _jsx(Input, { disabled: !isEditMode }) }), _jsx(Form.Item, { name: "gender", label: "Gi\u1EDBi t\u00EDnh", children: _jsxs(Select, { children: [_jsx(Option, { value: "Male", children: "Nam" }), _jsx(Option, { value: "Female", children: "N\u1EEF" }), _jsx(Option, { value: "Other", children: "Kh\u00E1c" })] }) }), _jsx(Form.Item, { name: "age", label: "Tu\u1ED5i", children: _jsx(Input, { type: "number", disabled: !isEditMode }) }), _jsx(Form.Item, { name: "birthday", label: "Ng\u00E0y sinh", children: _jsx(DatePicker, { format: "DD/MM/YYYY", style: { width: "100%" }, disabled: true }) }), _jsx(Form.Item, { hidden: true, name: "id", children: _jsx(Input, { disabled: true }) }), _jsx(Form.Item, { children: isEditMode ? (_jsxs(_Fragment, { children: [_jsx(Button, { type: "primary", htmlType: "submit", loading: updateMutation.isLoading, disabled: updateMutation.isLoading, children: "L\u01B0u" }), _jsx(Button, { style: { marginLeft: 8 }, onClick: () => setIsEditMode(false), disabled: updateMutation.isLoading, children: "H\u1EE7y" })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { type: "primary", onClick: handleEditClick, children: "Ch\u1EC9nh s\u1EEDa" }), _jsx(Button, { type: "default", danger: true, style: { marginLeft: 8 }, onClick: handleLogoutConfirm, children: "\u0110\u0103ng xu\u1EA5t" }), _jsx(Button, { style: { marginLeft: 8 }, onClick: () => navigate("/change-password"), children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" })] })) })] }), _jsx(ConfirmModal, { visible: isLogoutModalVisible, title: "X\u00E1c nh\u1EADn \u0111\u0103ng xu\u1EA5t", content: "B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n \u0111\u0103ng xu\u1EA5t kh\u1ECFi t\u00E0i kho\u1EA3n kh\u00F4ng?", onConfirm: handleLogoutConfirm, onCancel: () => setIsLogoutModalVisible(false), confirmText: "\u0110\u0103ng xu\u1EA5t", cancelText: "H\u1EE7y" })] }));
};
export default Account;
