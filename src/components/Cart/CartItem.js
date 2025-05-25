import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, InputNumber } from "antd";
import { catalogApi } from "@/config/api";
const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const { data: productData, isLoading } = catalogApi.useGet(`/products/${item.productId}`);
    const product = productData?.product;
    // Prioritize variant-specific image if available
    const variantImage = item.variant?.properties?.find(prop => prop.image)?.image;
    const image = variantImage || product?.imageFiles?.[0] || "https://via.placeholder.com/32";
    return (_jsxs("div", { className: "flex items-start border-b border-gray-200 py-2 gap-2", children: [_jsx("div", { className: "flex-shrink-0", children: isLoading ? (_jsx("div", { className: "w-8 h-8 bg-gray-200 animate-pulse rounded" })) : (_jsx("img", { src: image, alt: item.productName, className: "w-8 h-8 object-cover rounded", style: { width: "128px", height: "128px" } })) }), _jsxs("div", { className: "flex-1 flex flex-col gap-0.5", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("h3", { className: "text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis", children: item.productName }), _jsx("div", { className: "text-[10px] text-gray-600", children: item.variant?.properties?.length > 0 ? (item.variant.properties.map((prop) => (_jsxs("span", { children: [prop.type, ": ", prop.value, " "] }, `${prop.type}-${prop.value}`)))) : (_jsx("span", { children: "No variant selected" })) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(InputNumber, { min: 1, value: item.quantity, onChange: (value) => onQuantityChange(item.productId, value || 1), className: "w-12", size: "small" }), _jsxs("span", { className: "text-xs font-semibold", children: ["$", ((item.price * item.quantity))] }), _jsx(Button, { type: "link", danger: true, onClick: () => onRemove(item.productId), className: "text-red-500 p-0 text-[10px]", children: "Remove" })] })] })] }));
};
export default CartItem;
