import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Form, Input, Button, Select, Card, Layout, Menu, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import OrderHistoryTab from "@/components/OrderHistoryTab/OrderHistoryTab"; // Import OrderHistoryTab component
import ChangePassword from "@/components/ChangePassword/ChangePassword";
import ShippingAddresses from "@/components/ShippingAddresses/ShippingAddresses";
const { Option } = Select;
const { Sider, Content } = Layout;
const Account = () => {
    const [form] = Form.useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState("profile"); // Track active tab
    const [userAddresses, setUserAddresses] = useState(["123 Main St", "456 Elm St"]);
    const { user, logout, setUser } = useAuthStore();
    const navigate = useNavigate();
    const handleEditClick = () => {
        setIsEditMode(true);
    };
    const handleLogoutConfirm = () => {
        logout();
        navigate("/login");
    };
    const handleAddAddress = () => {
        const newAddress = prompt("Nhập địa chỉ mới:");
        if (newAddress) {
            setUserAddresses([...userAddresses, newAddress]);
        }
    };
    return (_jsx(Layout, { style: { minHeight: "100vh", margin: "0 auto", maxWidth: "70%", borderRadius: "8px" }, children: _jsx(Layout, { style: { padding: "24px" }, children: _jsxs(Row, { gutter: 24, children: [_jsx(Col, { span: 6, children: _jsxs(Card, { style: {
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                padding: "20px",
                            }, children: [_jsx("div", { style: { display: "flex", justifyContent: "center" }, children: _jsx(Avatar, { size: 64, icon: _jsx(UserOutlined, {}), style: { marginBottom: "16px" } }) }), _jsxs(Menu, { mode: "inline", defaultSelectedKeys: ["1"], style: { height: "100%" }, children: [_jsx(Menu.Item, { onClick: () => setActiveTab("profile"), children: "Th\u00F4ng tin t\u00E0i kho\u1EA3n" }, "1"), _jsx(Menu.Item, { onClick: () => setActiveTab("shippingAddresses"), children: "\u0110\u1ECBa ch\u1EC9 nh\u1EADn h\u00E0ng" }, "2"), _jsx(Menu.Item, { onClick: () => setActiveTab("changePassword"), children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }, "3"), _jsx(Menu.Item, { onClick: () => setActiveTab("orderHistory"), children: "L\u1ECBch s\u1EED \u0111\u01A1n h\u00E0ng" }, "4")] })] }) }), _jsx(Col, { span: 18, children: _jsxs(Card, { title: "Th\u00F4ng tin t\u00E0i kho\u1EA3n", style: {
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                                padding: "24px",
                            }, children: [activeTab === "profile" && (_jsxs(Form, { form: form, layout: "vertical", children: [_jsxs(Row, { gutter: 24, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "username", label: "T\u00EAn \u0111\u0103ng nh\u1EADp", children: _jsx(Input, { disabled: true }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "email", label: "Email", rules: [{ type: "email", required: true, message: "Vui lòng nhập email hợp lệ" }], children: _jsx(Input, { disabled: !isEditMode }) }) })] }), _jsxs(Row, { gutter: 24, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "phone", label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", rules: [{ pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" }], children: _jsx(Input, { disabled: !isEditMode }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { name: "address", label: "\u0110\u1ECBa ch\u1EC9", children: _jsx(Input, { disabled: !isEditMode }) }) })] }), _jsx(Form.Item, { children: isEditMode ? (_jsxs(_Fragment, { children: [_jsx(Button, { type: "primary", htmlType: "submit", disabled: false, children: "L\u01B0u thay \u0111\u1ED5i" }), _jsx(Button, { style: { marginLeft: 8 }, onClick: () => setIsEditMode(false), children: "H\u1EE7y" })] })) : (_jsx(_Fragment, { children: _jsx(Button, { type: "default", danger: true, onClick: handleLogoutConfirm, children: "\u0110\u0103ng xu\u1EA5t" }) })) })] })), activeTab === "shippingAddresses" && _jsx(ShippingAddresses, { addresses: [], onAddAddress: function () {
                                        throw new Error("Function not implemented.");
                                    } }), activeTab === "orderHistory" && _jsx(OrderHistoryTab, {}), activeTab === "changePassword" && _jsx(ChangePassword, {})] }) })] }) }) }));
};
export default Account;
