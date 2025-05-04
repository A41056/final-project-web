import React from "react";
import { useAuthStore } from "@/stores/authStore";
import { orderApi } from "@/config/api";
import { Empty, Spin } from "antd";

// Định nghĩa interface cho đơn hàng
interface OrderItem {
  productId: string;
  productName?: string; // Có thể không có trong API, để tùy chọn
  quantity: number;
  price: number;
  variantProperties: { type: string; value: string; image: string | null }[];
}

interface Address {
  firstName: string;
  lastName: string;
  emailAddress: string;
  addressLine: string;
  country: string;
  state: string | null;
  zipCode: string | null;
}

interface Order {
  id: string;
  customerId: string;
  orderName: string;
  shippingAddress: Address;
  billingAddress: Address;
  status: number;
  orderItems: OrderItem[];
}

interface OrderHistoryResponse {
  orders: Order[];
}

interface OrderHistoryTabProps {
  isActive: boolean; // Xác định tab có đang được chọn không (cho lazy loading)
}

const OrderHistoryTab: React.FC<OrderHistoryTabProps> = ({ isActive }) => {
  const { user } = useAuthStore();

  // Tạo endpoint chỉ khi user và user.id tồn tại
  const endpoint = isActive && user && user.id ? `/orders/customer/${user.id}` : "";

  // Lazy loading: Chỉ tải dữ liệu khi tab active và user tồn tại
  const { data: orderData, isLoading: orderLoading, error: orderError } =
    orderApi.useGet(endpoint) as {
      data: OrderHistoryResponse | undefined;
      isLoading: boolean;
      error: any;
    };

  const statusMap: Record<number, string> = {
    1: "Đang chờ xử lý",
    2: "Đã xác nhận",
    3: "Đang giao hàng",
    4: "Đã giao",
    5: "Đã hủy",
  };

  // Tính tổng tiền từ orderItems
  const calculateTotalAmount = (items: OrderItem[]): number =>
    items.reduce((total, item) => total + item.quantity * item.price, 0);

  if (!user || !user.id) {
    return (
      <Empty
        description="Vui lòng đăng nhập để xem lịch sử mua hàng"
        className="flex flex-col items-center justify-center min-h-[300px]"
      >
        <a href="/login" className="text-blue-500 underline text-sm">
          Đăng nhập
        </a>
      </Empty>
    );
  }

  if (orderLoading) {
    return <Spin tip="Đang tải lịch sử mua hàng..." />;
  }

  if (orderError) {
    return (
      <Empty
        description="Đã xảy ra lỗi khi tải lịch sử mua hàng. Vui lòng thử lại sau."
        className="flex flex-col items-center justify-center min-h-[300px]"
      />
    );
  }

  if (!orderData || !orderData.orders || orderData.orders.length === 0) {
    return (
      <Empty
        description="Bạn chưa có đơn hàng nào"
        className="flex flex-col items-center justify-center min-h-[300px]"
      >
        <a href="/shop" className="text-blue-500 underline text-sm">
          Tiếp tục mua sắm
        </a>
      </Empty>
    );
  }

  return (
    <div className="w-full">
      {orderData.orders.map((order: Order) => (
        <div key={order.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold">Mã đơn hàng: {order.id}</h3>
              <p className="text-sm text-gray-600">
                Tổng tiền: ${calculateTotalAmount(order.orderItems).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Trạng thái: {statusMap[order.status] || "Không xác định"}
              </p>
            </div>
            <a href={`/order-history/${order.id}`} className="text-blue-500 text-sm">
              Xem chi tiết
            </a>
          </div>
          <div className="mt-2">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 py-2 border-t border-gray-200">
                <img
                  src={
                    item.variantProperties.find((prop) => prop.image)?.image ||
                    "https://via.placeholder.com/32"
                  }
                  alt={item.productName || "Sản phẩm"}
                  className="w-8 h-8 object-cover rounded"
                />
                <div>
                  <p className="text-sm">{item.productName || "Sản phẩm không xác định"}</p>
                  <p className="text-xs text-gray-600">
                    {item.variantProperties.length > 0 ? (
                      item.variantProperties.map((prop) => (
                        <span key={`${prop.type}-${prop.value}`}>
                          {prop.type}: {prop.value}{" "}
                        </span>
                      ))
                    ) : (
                      <span>Không có biến thể</span>
                    )}
                  </p>
                  <p className="text-xs">
                    Số lượng: {item.quantity} | Giá: ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryTab;