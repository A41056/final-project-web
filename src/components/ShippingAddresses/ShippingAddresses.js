import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, List, Button, Modal, Input, Form } from "antd";
const ShippingAddresses = ({ addresses }) => {
    const [newAddress, setNewAddress] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updatedAddresses, setUpdatedAddresses] = useState(addresses);
    const handleCancel = () => {
        setIsModalVisible(false);
        setNewAddress("");
    };
    const handleAddAddress = () => {
        if (newAddress.trim() === "") {
            Modal.error({
                title: "Thông báo",
                content: "Địa chỉ không thể để trống.",
            });
            return;
        }
        const updatedList = [...updatedAddresses, newAddress];
        setUpdatedAddresses(updatedList);
        localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user") || "{}"), address: updatedList }));
        setIsModalVisible(false);
        setNewAddress("");
    };
    return (_jsxs(Card, { title: "\u0110\u1ECBa ch\u1EC9 nh\u1EADn h\u00E0ng", style: {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "24px",
        }, children: [_jsx(List, { size: "small", bordered: true, dataSource: updatedAddresses, renderItem: (address, index) => (_jsx(List.Item, { children: address }, index)) }), _jsx(Button, { type: "primary", onClick: () => setIsModalVisible(true), style: { marginTop: "16px", width: "100%" }, children: "Th\u00EAm \u0111\u1ECBa ch\u1EC9 m\u1EDBi" }), _jsx(Modal, { title: "Th\u00EAm \u0111\u1ECBa ch\u1EC9 m\u1EDBi", open: isModalVisible, onOk: handleAddAddress, onCancel: handleCancel, children: _jsx(Form, { layout: "vertical", children: _jsx(Form.Item, { label: "\u0110\u1ECBa ch\u1EC9 m\u1EDBi", children: _jsx(Input, { value: newAddress, onChange: (e) => setNewAddress(e.target.value), placeholder: "Nh\u1EADp \u0111\u1ECBa ch\u1EC9 m\u1EDBi" }) }) }) })] }));
};
export default ShippingAddresses;
