import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";
import { orderApi } from "@/config/api";
import { Empty, Spin, Tabs, Select, Card, Pagination, Tag } from "antd";
const { Option } = Select;
const statusMap = {
    1: { label: "Đang chờ xử lý", color: "yellow" },
    2: { label: "Đã xác nhận", color: "blue" },
    3: { label: "Đang giao hàng", color: "indigo" },
    4: { label: "Đã giao", color: "green" },
    5: { label: "Đã hủy", color: "red" },
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
    const [currentPage, setCurrentPage] = useState(1);
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
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };
    if (!user || !user.id) {
        return (_jsx(Empty, { description: "Vui l\u00F2ng \u0111\u0103ng nh\u1EADp \u0111\u1EC3 xem l\u1ECBch s\u1EED mua h\u00E0ng", children: _jsx("a", { href: "/login", className: "text-black underline text-sm", children: "\u0110\u0103ng nh\u1EADp" }) }));
    }
    if (orderLoading)
        return _jsx(Spin, { tip: "\u0110ang t\u1EA3i l\u1ECBch s\u1EED mua h\u00E0ng..." });
    if (orderError)
        return (_jsx(Empty, { description: "\u0110\u00E3 x\u1EA3y ra l\u1ED7i khi t\u1EA3i l\u1ECBch s\u1EED mua h\u00E0ng. Vui l\u00F2ng th\u1EED l\u1EA1i sau." }));
    // Paginate the filtered orders (show 10 orders per page)
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * 10, currentPage * 10);
    return (_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold mb-6", children: ["Your Orders: ", filteredOrders.length] }), _jsx(Tabs, { activeKey: activeTab, onChange: setActiveTab, items: tabItems, className: "mb-4" }), _jsx("div", { className: "mb-6 max-w-xs", children: _jsx(Select, { value: timeFilter, onChange: setTimeFilter, options: timeFilters, className: "w-full" }) }), filteredOrders.length === 0 ? (_jsx(Empty, { description: "Kh\u00F4ng c\u00F3 \u0111\u01A1n h\u00E0ng ph\u00F9 h\u1EE3p" })) : (_jsx("div", { className: "space-y-6", children: paginatedOrders.map(order => {
                    const status = statusMap[order.status] || {
                        label: "Không xác định",
                        color: "gray",
                    };
                    return (_jsxs(Card, { title: `Order ID: ${order.id}`, className: "mb-6", extra: _jsx("a", { href: `/order-history/${order.id}`, children: "View Details" }), children: [_jsx("div", { className: "mb-4", children: _jsx(Tag, { color: status.color, children: status.label }) }), _jsx("div", { className: "space-y-4", children: order.orderItems.map(item => (_jsxs("div", { className: "flex items-center gap-6 p-4", children: [_jsx("img", { src: item.variantProperties.find(v => v.image)?.image || "https://via.placeholder.com/80", alt: item.productName || "Product", className: "object-cover rounded-md", style: { maxWidth: "80px", maxHeight: "80px" } }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold", children: item.productName || "Unknown Product" }), _jsx("p", { className: "text-sm", children: item.variantProperties.length > 0
                                                        ? item.variantProperties.map(prop => `${prop.type}: ${prop.value}`).join(" • ")
                                                        : "No variants" })] }), _jsxs("div", { className: "text-right min-w-[140px]", children: [_jsxs("p", { children: ["Qty: ", item.quantity] }), _jsx("p", { className: "text-black font-semibold", children: item.price.toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }) })] })] }, item.productId))) }), _jsxs("div", { className: "text-right mt-4 font-semibold", children: ["Total:", " ", calculateTotalAmount(order.orderItems).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })] })] }, order.id));
                }) })), _jsx(Pagination, { current: currentPage, pageSize: 10, total: filteredOrders.length, onChange: handlePaginationChange, className: "mt-6" })] }));
};
export default OrderHistoryTab;
