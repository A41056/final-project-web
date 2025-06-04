import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "antd";
const CartSummary = ({ totalItems, totalPrice, onCheckout }) => {
    return (_jsxs("div", { className: "flex flex-col items-stretch gap-6 p-6 bg-gray-100 rounded-xl shadow-md w-full md:w-96", children: [_jsxs("div", { className: "flex justify-between text-base font-medium", children: [_jsx("span", { children: "S\u1ED1 s\u1EA3n ph\u1EA9m:" }), _jsx("span", { children: totalItems })] }), _jsxs("div", { className: "flex justify-between text-base font-medium", children: [_jsx("span", { children: "Th\u00E0nh ti\u1EC1n:" }), _jsxs("span", { className: "text-green-700 font-bold text-xl", children: ["$", totalPrice.toLocaleString()] })] }), _jsx(Button, { type: "primary", size: "large", className: "bg-black border-none hover:bg-gray-900", onClick: onCheckout, children: "Ti\u1EBFn h\u00E0nh thanh to\u00E1n" })] }));
};
export default CartSummary;
