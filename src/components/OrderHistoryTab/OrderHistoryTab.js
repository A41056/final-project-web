import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/stores/authStore";
import { orderApi } from "@/config/api";
import { Empty, Spin } from "antd";
const OrderHistoryTab = ({ isActive }) => {
    const { user } = useAuthStore();
    // Tạo endpoint chỉ khi user và user.id tồn tại
    const endpoint = isActive && user && user.id ? `/orders/customer/${user.id}` : "";
    // Lazy loading: Chỉ tải dữ liệu khi tab active và user tồn tại
    const { data: orderData, isLoading: orderLoading, error: orderError } = orderApi.useGet(endpoint);
    const statusMap = {
        1: "Đang chờ xử lý",
        2: "Đã xác nhận",
        3: "Đang giao hàng",
        4: "Đã giao",
        5: "Đã hủy",
    };
    // Tính tổng tiền từ orderItems
    const calculateTotalAmount = (items) => items.reduce((total, item) => total + item.quantity * item.price, 0);
    if (!user || !user.id) {
        return (_jsx(Empty, { description: "Vui l\u00F2ng \u0111\u0103ng nh\u1EADp \u0111\u1EC3 xem l\u1ECBch s\u1EED mua h\u00E0ng", className: "flex flex-col items-center justify-center min-h-[300px]", children: _jsx("a", { href: "/login", className: "text-blue-500 underline text-sm", children: "\u0110\u0103ng nh\u1EADp" }) }));
    }
    if (orderLoading) {
        return _jsx(Spin, { tip: "\u0110ang t\u1EA3i l\u1ECBch s\u1EED mua h\u00E0ng..." });
    }
    if (orderError) {
        return (_jsx(Empty, { description: "\u0110\u00E3 x\u1EA3y ra l\u1ED7i khi t\u1EA3i l\u1ECBch s\u1EED mua h\u00E0ng. Vui l\u00F2ng th\u1EED l\u1EA1i sau.", className: "flex flex-col items-center justify-center min-h-[300px]" }));
    }
    if (!orderData || !orderData.orders || orderData.orders.length === 0) {
        return (_jsx(Empty, { description: "B\u1EA1n ch\u01B0a c\u00F3 \u0111\u01A1n h\u00E0ng n\u00E0o", className: "flex flex-col items-center justify-center min-h-[300px]", children: _jsx("a", { href: "/shop", className: "text-blue-500 underline text-sm", children: "Ti\u1EBFp t\u1EE5c mua s\u1EAFm" }) }));
    }
    return (_jsx("div", { className: "w-full", children: orderData.orders.map((order) => (_jsxs("div", { className: "border border-gray-200 rounded-lg p-4 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-base font-semibold", children: ["M\u00E3 \u0111\u01A1n h\u00E0ng: ", order.id] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["T\u1ED5ng ti\u1EC1n: $", calculateTotalAmount(order.orderItems).toFixed(2)] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Tr\u1EA1ng th\u00E1i: ", statusMap[order.status] || "Không xác định"] })] }), _jsx("a", { href: `/order-history/${order.id}`, className: "text-blue-500 text-sm", children: "Xem chi ti\u1EBFt" })] }), _jsx("div", { className: "mt-2", children: order.orderItems.map((item, index) => (_jsxs("div", { className: "flex items-center gap-2 py-2 border-t border-gray-200", children: [_jsx("img", { src: item.variantProperties.find((prop) => prop.image)?.image ||
                                    "https://via.placeholder.com/32", alt: item.productName || "Sản phẩm", className: "w-8 h-8 object-cover rounded" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm", children: item.productName || "Sản phẩm không xác định" }), _jsx("p", { className: "text-xs text-gray-600", children: item.variantProperties.length > 0 ? (item.variantProperties.map((prop) => (_jsxs("span", { children: [prop.type, ": ", prop.value, " "] }, `${prop.type}-${prop.value}`)))) : (_jsx("span", { children: "Kh\u00F4ng c\u00F3 bi\u1EBFn th\u1EC3" })) }), _jsxs("p", { className: "text-xs", children: ["S\u1ED1 l\u01B0\u1EE3ng: ", item.quantity, " | Gi\u00E1: $", item.price.toFixed(2)] })] })] }, index))) })] }, order.id))) }));
};
export default OrderHistoryTab;
