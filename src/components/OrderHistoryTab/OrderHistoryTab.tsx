import React, { useState, useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";
import { orderApi } from "@/config/api";
import { Empty, Spin, Tabs, Select } from "antd";

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
  { label: string; bgColor: string; textColor: string }
> = {
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

const OrderHistoryTab: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

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

  if (!user || !user.id) {
    return (
      <Empty description="Vui lòng đăng nhập để xem lịch sử mua hàng" className="flex flex-col items-center justify-center min-h-[300px]">
        <a href="/login" className="text-black underline text-sm">Đăng nhập</a>
      </Empty>
    );
  }

  if (orderLoading) return <Spin tip="Đang tải lịch sử mua hàng..." className="py-10" />;

  if (orderError)
    return (
      <Empty description="Đã xảy ra lỗi khi tải lịch sử mua hàng. Vui lòng thử lại sau." className="flex flex-col items-center justify-center min-h-[300px]" />
    );

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mb-6">Your Orders: {filteredOrders.length}</h2>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} className="mb-4" />

      <div className="mb-6 max-w-xs">
        <Select value={timeFilter} onChange={setTimeFilter} options={timeFilters} className="w-full" popupClassName="text-black" />
      </div>

      {filteredOrders.length === 0 ? (
        <Empty description="Không có đơn hàng phù hợp" className="flex flex-col items-center justify-center min-h-[300px]" />
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => {
            const status = statusMap[order.status] || {
              label: "Không xác định",
              bgColor: "bg-gray-100",
              textColor: "text-gray-800",
            };
            return (
              <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-300 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black break-words">
                      Order ID:
                      <br />
                      <span className="font-mono text-indigo-700">{order.id}</span>
                    </h3>
                  </div>
                  <div>
                    <span className={`${status.bgColor} ${status.textColor} inline-block px-3 py-1 rounded-full font-semibold`}>
                      {status.label}
                    </span>
                  </div>
                  <div>
                    <p className="text-black font-semibold text-lg">
                      Total:
                      <br />
                      {calculateTotalAmount(order.orderItems).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <a href={`/order-history/${order.id}`} className="text-indigo-700 font-semibold hover:underline">
                      View Details &rarr;
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.orderItems.map(item => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-6 border rounded-lg border-gray-200 p-4 hover:shadow-sm transition-shadow duration-150"
                    >
                      <img
                        src={item.variantProperties.find(v => v.image)?.image || "https://via.placeholder.com/80"}
                        alt={item.productName || "Product"}
                        className="w-20 h-20 object-cover rounded-md flex-shrink-0 border border-gray-300"
                        style={{ maxWidth: 80, maxHeight: 80 }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-black truncate">{item.productName || "Unknown Product"}</p>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {item.variantProperties.length > 0
                            ? item.variantProperties.map(prop => `${prop.type}: ${prop.value}`).join(" • ")
                            : "No variants"}
                        </p>
                      </div>
                      <div className="text-right min-w-[140px]">
                        <p className="text-black font-semibold">Qty: {item.quantity}</p>
                        <p className="text-indigo-700 font-semibold mt-1 text-lg">
                          {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryTab;