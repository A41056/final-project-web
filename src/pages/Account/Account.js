import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Layout, Menu, Avatar, Row, Col, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Profile from "@/components/Profile/Profile"; // Import Profile component
import ShippingAddresses from "@/components/ShippingAddresses/ShippingAddresses";
import ChangePassword from "../ForgotPassword/ChangePassword";
import OrderHistoryTab from "@/components/OrderHistoryTab/OrderHistoryTab";
const { Sider, Content } = Layout;
const Account = () => {
    const [activeTab, setActiveTab] = useState("profile"); // Track active tab
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userAddresses = user.address || []; // Get user addresses from localStorage
    return (_jsx(Layout, { style: { minHeight: "100vh", margin: "0 auto", maxWidth: "70%", borderRadius: "8px" }, children: _jsx(Layout, { style: { padding: "24px" }, children: _jsxs(Row, { gutter: 24, children: [_jsx(Col, { span: 6, children: _jsxs(Card, { style: {
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                padding: "20px",
                            }, children: [_jsx("div", { style: { display: "flex", justifyContent: "center" }, children: _jsx(Avatar, { size: 64, icon: _jsx(UserOutlined, {}), style: { marginBottom: "16px" } }) }), _jsxs(Menu, { mode: "inline", defaultSelectedKeys: ["1"], style: { height: "100%" }, children: [_jsx(Menu.Item, { onClick: () => setActiveTab("profile"), children: "Th\u00F4ng tin t\u00E0i kho\u1EA3n" }, "1"), _jsx(Menu.Item, { onClick: () => setActiveTab("shippingAddresses"), children: "\u0110\u1ECBa ch\u1EC9 nh\u1EADn h\u00E0ng" }, "2"), _jsx(Menu.Item, { onClick: () => setActiveTab("changePassword"), children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }, "3"), _jsx(Menu.Item, { onClick: () => setActiveTab("orderHistory"), children: "L\u1ECBch s\u1EED \u0111\u01A1n h\u00E0ng" }, "4")] })] }) }), _jsx(Col, { span: 18, children: _jsxs(Card, { title: "Th\u00F4ng tin t\u00E0i kho\u1EA3n", style: {
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                                padding: "24px",
                            }, children: [activeTab === "profile" && _jsx(Profile, {}), activeTab === "shippingAddresses" && _jsx(ShippingAddresses, { addresses: userAddresses }), activeTab === "changePassword" && _jsx(ChangePassword, {}), activeTab === "orderHistory" && _jsx(OrderHistoryTab, {})] }) })] }) }) }));
};
export default Account;
