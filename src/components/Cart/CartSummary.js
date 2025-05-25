import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "antd";
const CartSummary = ({ totalItems, totalPrice, onCheckout }) => {
    return (_jsxs("div", { className: "flex flex-col items-end gap-3 p-3 md:p-4 bg-gray-100 rounded-lg w-full md:w-1/3", children: [_jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex justify-between text-xs md:text-sm", children: [_jsxs("span", { children: ["Items (", totalItems, "):"] }), _jsxs("span", { children: ["$", (totalPrice / 100).toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between text-xs md:text-sm mt-1", children: [_jsx("span", { children: "Shipping:" }), _jsx("span", { className: "text-gray-500", children: "TBD" })] }), _jsx("hr", { className: "my-3 border-t border-gray-300" }), _jsxs("div", { className: "flex justify-between text-base md:text-lg font-semibold", children: [_jsx("span", { children: "Total:" }), _jsxs("span", { children: ["$", (totalPrice)] })] })] }), _jsx(Button, { type: "primary", size: "middle", className: "w-full md:w-auto bg-black border-none", onClick: onCheckout, children: "Proceed to Checkout" })] }));
};
export default CartSummary;
