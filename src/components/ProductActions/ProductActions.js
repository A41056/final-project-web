import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const ProductActions = ({ variants, selectedVariant, quantity, onQuantityChange, onAddToCart, isAddingToCart, }) => {
    const getTotalPrice = () => {
        const selectedVar = variants.find((v) => v.properties.every((prop) => selectedVariant[prop.type] === prop.value));
        const price = selectedVar ? selectedVar.price : variants[0]?.price || 0;
        return (price * quantity).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "total-price text-xl font-semibold", children: ["Total Price: $", getTotalPrice()] }), _jsxs("div", { className: "add-quantity-group flex items-center justify-start gap-8 self-end w-full", children: [_jsxs("div", { className: "add-quantity flex items-center justify-between w-40 h-12 bg-gray-200 rounded-full px-5", children: [_jsx("button", { className: "minus-button w-6 h-6 flex items-center justify-center bg-gray-200 border-none cursor-pointer", onClick: () => onQuantityChange(-1), disabled: isAddingToCart, children: "-" }), _jsx("span", { children: quantity }), _jsx("button", { className: "add-button w-6 h-6 flex items-center justify-center bg-gray-200 border-none cursor-pointer", onClick: () => onQuantityChange(1), disabled: isAddingToCart, children: "+" })] }), _jsx("button", { className: "add-to-card bg-black text-white w-96 h-12 rounded-full px-12 cursor-pointer", onClick: onAddToCart, disabled: isAddingToCart, children: isAddingToCart ? "Adding..." : "Add to Cart" })] })] }));
};
export default ProductActions;
