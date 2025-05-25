import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons";
const ProductCard = ({ id, img, name, rating, price, originalPrice, discountPercent, }) => {
    const navigate = useNavigate();
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const handleClick = () => {
        navigate(`/products/${id}`);
    };
    return (_jsxs("div", { className: "product-card", onClick: handleClick, style: { cursor: "pointer" }, children: [_jsx("div", { className: "product-image", children: _jsx("img", { src: img, alt: name }) }), _jsx("p", { className: "product-name", children: name }), _jsxs("div", { className: "product-rating", children: [_jsxs("div", { className: "stars", children: [Array(fullStars)
                                .fill(null)
                                .map((_, index) => (_jsx("img", { src: icons.star, alt: "full star" }, `full-${index}`))), hasHalfStar && (_jsx("img", { src: icons.halfStar, alt: "half star" }, "half"))] }), _jsxs("span", { children: [rating, " / 5"] })] }), _jsxs("div", { className: "product-pricing", children: [_jsxs("span", { className: "discount-price", children: ["$", price] }), originalPrice && discountPercent && (_jsxs(_Fragment, { children: [_jsxs("span", { className: "original-price", children: ["$", originalPrice] }), _jsx("div", { className: "discount-wrapper", children: _jsxs("span", { className: "discount-percent", children: ["-", discountPercent, "%"] }) })] }))] })] }));
};
export default ProductCard;
