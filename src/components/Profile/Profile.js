import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import { userApi } from "@/config/api"; // Import API hook
import ConfirmModal from "@/components/ConfirmModal"; // Import ConfirmModal component
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [userData, setUserData] = useState(null); // Store user data
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    // Load user data from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setUserData(user);
        form.setFieldsValue({
            username: user.username,
            email: user.email,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    }, [form]);
    const updateUserMutation = userApi.usePut();
    const handleSubmit = async (values) => {
        const updatedData = { ...userData };
        // Only update fields that have changed
        let isUpdated = false;
        if (values.firstName !== userData.firstName) {
            updatedData.firstName = values.firstName;
            isUpdated = true;
        }
        if (values.lastName !== userData.lastName) {
            updatedData.lastName = values.lastName;
            isUpdated = true;
        }
        if (values.email !== userData.email) {
            updatedData.email = values.email;
            isUpdated = true;
        }
        if (values.phone !== userData.phone) {
            updatedData.phone = values.phone;
            isUpdated = true;
        }
        // If no fields have changed, do not send an update request
        if (!isUpdated) {
            Modal.info({
                title: "Thông báo",
                content: "Không có thay đổi nào để cập nhật.",
            });
            return;
        }
        // If there are updates, send them to the API
        updateUserMutation.mutate({
            endpoint: `/users/${userData.id}`,
            data: updatedData,
        }, {
            onSuccess: () => {
                localStorage.setItem("user", JSON.stringify(updatedData)); // Save updated user data to localStorage
                setIsEditMode(false); // Switch off edit mode
            },
        });
    };
    const handleLogoutConfirm = () => {
        setIsModalVisible(true); // Show the logout confirm modal
    };
    const onConfirmLogout = () => {
        // Handle logout logic (e.g., clear session, redirect to login page)
        localStorage.removeItem("user");
        setIsModalVisible(false); // Hide modal after confirmation
        navigate("/login");
    };
    const onCancelLogout = () => {
        setIsModalVisible(false); // Just hide the modal
    };
    return (_jsxs("div", { className: "profile-container", children: [_jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, children: [_jsxs(Row, { gutter: 24, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "username", label: "T\u00EAn t\u00E0i kho\u1EA3n", children: _jsx(Input, { disabled: true }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "email", label: "Email", rules: [{ type: "email", required: true, message: "Vui lòng nhập email hợp lệ" }], children: _jsx(Input, { disabled: !isEditMode }) }) })] }), _jsxs(Row, { gutter: 24, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "phone", label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", rules: [{ pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" }], children: _jsx(Input, { disabled: !isEditMode }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "firstName", label: "H\u1ECD", children: _jsx(Input, { disabled: !isEditMode }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "lastName", label: "T\u00EAn", children: _jsx(Input, { disabled: !isEditMode }) }) })] }), _jsx(Form.Item, { children: isEditMode ? (_jsxs(_Fragment, { children: [_jsx(Button, { type: "primary", htmlType: "submit", children: "L\u01B0u thay \u0111\u1ED5i" }), _jsx(Button, { style: { marginLeft: 8 }, onClick: () => setIsEditMode(false), children: "H\u1EE7y" })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { type: "default", danger: true, onClick: handleLogoutConfirm, children: "\u0110\u0103ng xu\u1EA5t" }), _jsx(Button, { type: "default", style: { marginLeft: 8 }, onClick: () => setIsEditMode(true), children: "Ch\u1EC9nh s\u1EEDa" })] })) })] }), _jsx(ConfirmModal, { open: isModalVisible, title: "X\u00E1c nh\u1EADn \u0111\u0103ng xu\u1EA5t", content: "B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n \u0111\u0103ng xu\u1EA5t?", onConfirm: onConfirmLogout, onCancel: onCancelLogout, confirmText: "\u0110\u1ED3ng \u00FD", cancelText: "H\u1EE7y" })] }));
};
export default Profile;
