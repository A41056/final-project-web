import React, { useState, useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";
import { orderApi } from "@/config/api";
import { Empty, Spin, Tabs, Select, Card, Pagination, Tag } from "antd";

const { Option } = Select;

interface VariantProperty {
  type: string;
  value: string;
  image: string | null;
}

interface OrderItem {
  productId: string;
  productName?: string;
  quantity: number;
  price: number;
  variantProperties: VariantProperty[];
}

interface Order {
  id: string;
  status: number;
  orderItems: OrderItem[];
  createdAt?: string; // nếu có để filter time
}

interface OrderHistoryResponse {
  orders: Order[];
}

const statusMap: Record<
  number,
  { label: string; color: string }
> = {
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

const OrderHistoryTab: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch orders only when user is logged in
  const endpoint = user?.id ? `/orders/customer/${user.id}` : "";

  const { data: orderData, isLoading: orderLoading, error: orderError } =
    orderApi.useGet(endpoint) as {
      data: OrderHistoryResponse | undefined;
      isLoading: boolean;
      error: any;
    };

  // Filter orders based on tab and time filter
  const filteredOrders = useMemo(() => {
    if (!orderData?.orders) return [];

    let filtered = orderData.orders;

    if (activeTab === "not-shipped") filtered = filtered.filter(o => o.status === 3);
    else if (activeTab === "cancelled") filtered = filtered.filter(o => o.status === 5);

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

  const calculateTotalAmount = (items: OrderItem[]) =>
    items.reduce((total, item) => total + item.quantity * item.price, 0);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!user || !user.id) {
    return (
      <Empty description="Vui lòng đăng nhập để xem lịch sử mua hàng">
        <a href="/login" className="text-black underline text-sm">Đăng nhập</a>
      </Empty>
    );
  }

  if (orderLoading) return <Spin tip="Đang tải lịch sử mua hàng..." />;

  if (orderError)
    return (
      <Empty description="Đã xảy ra lỗi khi tải lịch sử mua hàng. Vui lòng thử lại sau." />
    );

  // Paginate the filtered orders (show 10 orders per page)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Orders: {filteredOrders.length}</h2>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} className="mb-4" />

      <div className="mb-6 max-w-xs">
        <Select value={timeFilter} onChange={setTimeFilter} options={timeFilters} className="w-full" />
      </div>

      {filteredOrders.length === 0 ? (
        <Empty description="Không có đơn hàng phù hợp" />
      ) : (
        <div className="space-y-6">
          {paginatedOrders.map(order => {
            const status = statusMap[order.status] || {
              label: "Không xác định",
              color: "gray",
            };
            return (
              <Card key={order.id} title={`Order ID: ${order.id}`} className="mb-6" extra={<a href={`/order-history/${order.id}`}>View Details</a>}>
                <div className="mb-4">
                  <Tag color={status.color}>{status.label}</Tag>
                </div>
                <div className="space-y-4">
                  {order.orderItems.map(item => (
                    <div key={item.productId} className="flex items-center gap-6 p-4">
                      <img
                        src={item.variantProperties.find(v => v.image)?.image || "https://via.placeholder.com/80"}
                        alt={item.productName || "Product"}
                        className="object-cover rounded-md"
                        style={{ maxWidth: "80px", maxHeight: "80px" }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.productName || "Unknown Product"}</p>
                        <p className="text-sm">
                          {item.variantProperties.length > 0
                            ? item.variantProperties.map(prop => `${prop.type}: ${prop.value}`).join(" • ")
                            : "No variants"}
                        </p>
                      </div>
                      <div className="text-right min-w-[140px]">
                        <p>Qty: {item.quantity}</p>
                        <p className="text-black font-semibold">
                          {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right mt-4 font-semibold">
                  Total:{" "}
                  {calculateTotalAmount(order.orderItems).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Pagination
        current={currentPage}
        pageSize={10}
        total={filteredOrders.length}
        onChange={handlePaginationChange}
        className="mt-6"
      />
    </div>
  );
};

export default OrderHistoryTab;