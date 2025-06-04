import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";
import { orderApi } from "@/config/api";
import { Empty, Spin, Tabs, Select } from "antd";
const { Option } = Select;
const statusMap = {
    1: { label: "Đang chờ xử lý", bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
    2: { label: "Đã xác nhận", bgColor: "bg-blue-100", textColor: "text-blue-800" },
    3: { label: "Đang giao hàng", bgColor: "bg-indigo-100", textColor: "text-indigo-800" },
    4: { label: "Đã giao", bgColor: "bg-green-100", textColor: "text-green-800" },
    5: { label: "Đã hủy", bgColor: "bg-red-100", textColor: "text-red-800" },
};
const timeFilters = [
    { label: "Past 1 Month", value: "1m" },
    { label: "Past 3 Months", value: "3m" },
    { label: "Past 6 Months", value: "6m" },
    { label: "Past 12 Months", value: "12m" },
    { label: "All", value: "all" },
];
const tabItems = [
    { key: "all", label: "Orders" },
    { key: "not-shipped", label: "Not Yet Shipped" },
    { key: "cancelled", label: "Cancelled Orders" },
];
const OrderHistoryTab = () => {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState("all");
    const [timeFilter, setTimeFilter] = useState("all");
    // Fetch orders only when user is logged in
    const endpoint = user?.id ? `/orders/customer/${user.id}` : "";
    const { data: orderData, isLoading: orderLoading, error: orderError } = orderApi.useGet(endpoint);
    // Filter orders based on tab and time filter
    const filteredOrders = useMemo(() => {
        if (!orderData?.orders)
            return [];
        let filtered = orderData.orders;
        if (activeTab === "not-shipped")
            filtered = filtered.filter(o => o.status === 3);
        else if (activeTab === "cancelled")
            filtered = filtered.filter(o => o.status === 5);
        if (timeFilter !== "all") {
            const monthsAgo = parseInt(timeFilter.replace("m", ""), 10);
            const cutoffDate = new Date();
            cutoffDate.setMonth(cutoffDate.getMonth() - monthsAgo);
            filtered = filtered.filter(o => {
                const orderDate = new Date(o.createdAt ?? 0);
                return orderDate >= cutoffDate;
            });
        }
        return filtered;
    }, [orderData, activeTab, timeFilter]);
    const calculateTotalAmount = (items) => items.reduce((total, item) => total + item.quantity * item.price, 0);
    if (!user || !user.id) {
        return (_jsx(Empty, { description: "Vui l\u00F2ng \u0111\u0103ng nh\u1EADp \u0111\u1EC3 xem l\u1ECBch s\u1EED mua h\u00E0ng", className: "flex flex-col items-center justify-center min-h-[300px]", children: _jsx("a", { href: "/login", className: "text-black underline text-sm", children: "\u0110\u0103ng nh\u1EADp" }) }));
    }
    if (orderLoading)
        return _jsx(Spin, { tip: "\u0110ang t\u1EA3i l\u1ECBch s\u1EED mua h\u00E0ng...", className: "py-10" });
    if (orderError)
        return (_jsx(Empty, { description: "\u0110\u00E3 x\u1EA3y ra l\u1ED7i khi t\u1EA3i l\u1ECBch s\u1EED mua h\u00E0ng. Vui l\u00F2ng th\u1EED l\u1EA1i sau.", className: "flex flex-col items-center justify-center min-h-[300px]" }));
    return (_jsxs("div", { className: "text-black", children: [_jsxs("h2", { className: "text-2xl font-bold mb-6", children: ["Your Orders: ", filteredOrders.length] }), _jsx(Tabs, { activeKey: activeTab, onChange: setActiveTab, items: tabItems, className: "mb-4" }), _jsx("div", { className: "mb-6 max-w-xs", children: _jsx(Select, { value: timeFilter, onChange: setTimeFilter, options: timeFilters, className: "w-full", popupClassName: "text-black" }) }), filteredOrders.length === 0 ? (_jsx(Empty, { description: "Kh\u00F4ng c\u00F3 \u0111\u01A1n h\u00E0ng ph\u00F9 h\u1EE3p", className: "flex flex-col items-center justify-center min-h-[300px]" })) : (_jsx("div", { className: "space-y-6", children: filteredOrders.map(order => {
                    const status = statusMap[order.status] || {
                        label: "Không xác định",
                        bgColor: "bg-gray-100",
                        textColor: "text-gray-800",
                    };
                    return (_jsxs("div", { className: "bg-white rounded-lg shadow-md border border-gray-300 p-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-6", children: [_jsx("div", { children: _jsxs("h3", { className: "text-lg font-semibold text-black break-words", children: ["Order ID:", _jsx("br", {}), _jsx("span", { className: "font-mono text-indigo-700", children: order.id })] }) }), _jsx("div", { children: _jsx("span", { className: `${status.bgColor} ${status.textColor} inline-block px-3 py-1 rounded-full font-semibold`, children: status.label }) }), _jsx("div", { children: _jsxs("p", { className: "text-black font-semibold text-lg", children: ["Total:", _jsx("br", {}), calculateTotalAmount(order.orderItems).toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })] }) }), _jsx("div", { className: "text-right", children: _jsx("a", { href: `/order-history/${order.id}`, className: "text-indigo-700 font-semibold hover:underline", children: "View Details \u2192" }) })] }), _jsx("div", { className: "space-y-4", children: order.orderItems.map(item => (_jsxs("div", { className: "flex items-center gap-6 border rounded-lg border-gray-200 p-4 hover:shadow-sm transition-shadow duration-150", children: [_jsx("img", { src: item.variantProperties.find(v => v.image)?.image || "https://via.placeholder.com/80", alt: item.productName || "Product", className: "w-20 h-20 object-cover rounded-md flex-shrink-0 border border-gray-300", style: { maxWidth: 80, maxHeight: 80 } }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-lg font-semibold text-black truncate", children: item.productName || "Unknown Product" }), _jsx("p", { className: "text-sm text-gray-600 truncate mt-1", children: item.variantProperties.length > 0
                                                        ? item.variantProperties.map(prop => `${prop.type}: ${prop.value}`).join(" • ")
                                                        : "No variants" })] }), _jsxs("div", { className: "text-right min-w-[140px]", children: [_jsxs("p", { className: "text-black font-semibold", children: ["Qty: ", item.quantity] }), _jsx("p", { className: "text-indigo-700 font-semibold mt-1 text-lg", children: item.price.toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }) })] })] }, item.productId))) })] }, order.id));
                }) }))] }));
};
export default OrderHistoryTab;
