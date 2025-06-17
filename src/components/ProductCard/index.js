import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ id, img, name, rating, price, originalPrice, discountPercent }) => {
    const navigate = useNavigate();
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const calculatedDiscountPercent = originalPrice && Number(price) < originalPrice
        ? ((originalPrice - Number(price)) / originalPrice) * 100
        : discountPercent || 0;
    const handleClick = () => {
        navigate(`/products/${id}`);
    };
    return (_jsxs("div", { className: "product-card", onClick: handleClick, style: { cursor: "pointer" }, children: [_jsx("div", { className: "product-image", children: _jsx("img", { src: img, alt: name }) }), _jsx("p", { className: "product-name", children: name }), _jsxs("div", { className: "product-pricing", children: [_jsxs("span", { className: "discount-price", style: { opacity: originalPrice && Number(price) < originalPrice ? 0.5 : 1 }, children: ["$", price] }), originalPrice && Number(price) < originalPrice && (_jsxs(_Fragment, { children: [_jsxs("span", { className: "original-price", style: { textDecoration: "line-through", color: "#888" }, children: ["$", originalPrice] }), _jsx("div", { className: "discount-wrapper", children: _jsxs("span", { className: "discount-percent", style: { color: "red" }, children: ["-", Math.round(calculatedDiscountPercent), "%"] }) })] }))] })] }));
};
export default ProductCard;
