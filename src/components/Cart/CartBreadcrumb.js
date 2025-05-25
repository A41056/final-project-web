import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const CartBreadcrumb = () => {
    return (_jsxs("ul", { className: "flex self-start gap-2 md:gap-4 text-gray-600 cursor-pointer py-3 text-xs md:text-sm", children: [_jsxs("li", { children: [_jsx(Link, { to: "/home", className: "hover:text-black text-gray-600 no-underline", children: "Home" }), _jsx("span", { className: "mx-1", children: "/" })] }), _jsxs("li", { children: [_jsx(Link, { to: "/shop", className: "hover:text-black text-gray-600 no-underline", children: "Shop" }), _jsx("span", { className: "mx-1", children: "/" })] }), _jsx("li", { className: "text-black", children: "Cart" })] }));
};
export default CartBreadcrumb;
