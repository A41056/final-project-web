import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { icons } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { basketApi, catalogApi } from "@/config/api";
import { Dropdown, Menu } from "antd";
const Navbar = () => {
    const { isAuthenticated } = useAuthStore();
    const { itemCount, mergeCart, hasMergedServerCart } = useCartStore();
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const { data: cartData } = basketApi.useGet(user?.id ? `/basket/${user.id}` : "", { enabled: !!user?.id });
    useEffect(() => {
        if (isAuthenticated && cartData?.cart && !hasMergedServerCart) {
            mergeCart(cartData.cart);
        }
    }, [isAuthenticated, cartData, mergeCart, hasMergedServerCart]);
    const { data: categoryTree } = catalogApi.useGet("/categories/tree");
    // Đệ quy chuyển subcategories thành menu item antd
    const renderCategoryMenuItems = (categories) => categories.map((cat) => ({
        key: cat.id,
        label: _jsx(Link, { to: `/category/${cat.slug}`, children: cat.name }),
        children: cat.subcategories?.length ? renderCategoryMenuItems(cat.subcategories) : undefined,
    }));
    const categoryMenuItems = categoryTree?.[0] ? renderCategoryMenuItems(categoryTree[0].subcategories) : [];
    const categoryMenu = _jsx(Menu, { items: categoryMenuItems, mode: "vertical", selectable: false });
    return (_jsxs(_Fragment, { children: [!isAuthenticated && (_jsxs("aside", { className: "promo-bar", children: [_jsx("p", { children: "Sign up and get 20% off to your first order." }), _jsx(Link, { to: "/register", "aria-label": "Go to register", className: "text-white", children: "Sign Up Now" })] })), _jsx("header", { children: _jsx("nav", { className: "navbar", children: _jsxs("ul", { className: "nav_group", children: [_jsx("li", { className: "logo", children: _jsx(Link, { to: "/", "aria-label": "Go to homepage", children: "SHOP.CO" }) }), _jsx("li", { className: "nav_links", children: _jsx("ul", { children: categoryTree?.[0] && (_jsx("li", { className: "dropdown", children: _jsx(Dropdown, { overlay: categoryMenu, trigger: ["hover"], placement: "bottomLeft", arrow: true, overlayClassName: "category-dropdown-menu", children: _jsxs("span", { style: { display: "inline-flex", alignItems: "center", cursor: "pointer" }, "aria-haspopup": "true", "aria-expanded": "false", children: [categoryTree[0].name, _jsx("img", { src: icons.downArrow, alt: "Expand shop menu", style: { marginLeft: 6, width: 12, height: 12, userSelect: "none" } })] }) }) })) }) }), _jsx("li", { className: "search", children: _jsxs("form", { children: [_jsx("button", { type: "submit", children: _jsx("img", { src: icons.search, alt: "Search" }) }), _jsx("input", { type: "text", id: "search", name: "q", placeholder: "Search for products..." })] }) }), _jsxs("li", { className: "user_actions", children: [_jsxs(Link, { to: "/cart", "aria-label": "View Cart", className: "relative", children: [_jsx("img", { src: icons.cart, alt: "Cart" }), itemCount > 0 && (_jsx("span", { className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center", children: itemCount }))] }), _jsx(Link, { to: "/account", "aria-label": "View Account", children: _jsx("img", { src: icons.person, alt: "User Account" }) })] })] }) }) })] }));
};
export default Navbar;
