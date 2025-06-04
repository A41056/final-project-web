import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, List, Button } from "antd";
const ShippingAddresses = ({ addresses, onAddAddress }) => {
    return (_jsxs(Card, { title: "\u0110\u1ECBa ch\u1EC9 nh\u1EADn h\u00E0ng", style: {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "24px",
        }, children: [_jsx(List, { size: "small", bordered: true, dataSource: addresses, renderItem: (address, index) => (_jsx(List.Item, { children: address }, index)) }), _jsx(Button, { type: "primary", onClick: onAddAddress, style: { marginTop: "16px", width: "100%" }, children: "Th\u00EAm \u0111\u1ECBa ch\u1EC9 m\u1EDBi" })] }));
};
export default ShippingAddresses;
