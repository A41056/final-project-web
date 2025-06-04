import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, InputNumber } from "antd";
import { catalogApi } from "@/config/api";
const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const { data: productData, isLoading } = catalogApi.useGet(`/products/${item.productId}`);
    const product = productData?.product;
    const variantImage = item.variant?.properties?.find((prop) => prop.image)?.image;
    const image = variantImage || product?.imageFiles?.[0] || "https://via.placeholder.com/128";
    return (_jsxs("div", { className: "flex flex-col md:flex-row items-center border-b border-gray-300 py-4 gap-6", children: [_jsx("div", { className: "flex-shrink-0", children: isLoading ? (_jsx("div", { className: "w-32 h-32 bg-gray-300 animate-pulse rounded" })) : (_jsx("img", { src: image, alt: item.productName, className: "rounded-lg shadow", style: {
                        width: "128px",
                        height: "128px",
                        objectFit: "cover",
                        maxWidth: "100%",
                        maxHeight: "100%",
                    } })) }), _jsxs("div", { className: "flex-1 flex flex-col justify-between min-w-0", children: [_jsx("h3", { className: "text-lg font-semibold truncate", children: item.productName }), _jsx("div", { className: "text-sm text-gray-600 mt-1", children: item.variant?.properties?.length
                            ? item.variant.properties.map((prop) => (_jsxs("span", { className: "mr-3", children: [_jsxs("strong", { children: [prop.type, ":"] }), " ", prop.value] }, `${prop.type}-${prop.value}`)))
                            : "No variant selected" }), _jsxs("div", { className: "flex items-center gap-4 mt-4", children: [_jsx(InputNumber, { min: 1, value: item.quantity, onChange: (value) => onQuantityChange(item.productId, value || 1), className: "w-20", size: "middle" }), _jsxs("span", { className: "text-lg font-semibold", children: ["$", (item.price * item.quantity).toLocaleString()] }), _jsx(Button, { type: "link", danger: true, onClick: () => onRemove(item.productId), className: "text-red-600 p-0 text-base", children: "X\u00F3a" })] })] })] }));
};
export default CartItem;
