import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCartStore, CartItem as CartItemType } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import CartBreadcrumb from "@/components/Cart/CartBreadcrumb";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import { Empty, message, Tabs } from "antd";
import { basketApi } from "@/config/api";
import OrderHistoryTab from "@/components/OrderHistoryTab/OrderHistoryTab";

const Cart: React.FC = () => {
  const { cart, itemCount, addItem, setCart } = useCartStore();
  const { user } = useAuthStore();
  const postBasket = basketApi.usePost();
  const location = useLocation();
  const initialTab = new URLSearchParams(location.search).get("tab") === "order-history" ? "order-history" : "cart";
  const [activeTab, setActiveTab] = useState<"cart" | "order-history">(initialTab);

  const getVariantKey = (item: CartItemType) =>
    `${item.productId}-${JSON.stringify(item.variant?.properties || [])}`;

  const handleQuantityChange = (productId: string, quantity: number) => {
    const item = cart?.items.find((i) =>
      getVariantKey(i) === getVariantKey({
        productId,
        variant: i.variant,
      } as CartItemType)
    );
    if (item) {
      addItem({ ...item, quantity: quantity - item.quantity });
    }
  };

  const handleRemove = (productId: string) => {
    if (cart) {
      const itemToRemove = cart.items.find((i) => i.productId === productId);
      if (!itemToRemove) return;

      const updatedItems = cart.items.filter(
        (item) => getVariantKey(item) !== getVariantKey(itemToRemove)
      );
      const updatedCart = {
        ...cart,
        items: updatedItems,
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
      setCart(updatedCart);
    }
  };

  const handleCheckout = async () => {
    if (!cart || !user) {
      message.error("Người dùng chưa đăng nhập hoặc giỏ hàng trống.");
      return;
    }

    const basketCheckoutDto = {
      UserId: user.id,
      CustomerId: user.id,
      UserName: user.username || "",
      FirstName: user.firstName || "",
      LastName: user.lastName || "",
      EmailAddress: user.email || "",
      AddressLine: "Số 82, Phố Mới",
      Country: "Việt Nam",
      Items: cart.items.map((item) => ({
        ProductId: item.productId,
        Quantity: item.quantity,
        UnitPrice: item.price,
        VariantProperties: item.variant?.properties?.map((prop) => ({
          Type: prop.type,
          Value: prop.value,
          Image: prop.image || null,
        })) || [],
      })),
    };

    try {
      const response = await postBasket.mutateAsync({
        endpoint: "/basket/checkout",
        data: { BasketCheckoutDto: basketCheckoutDto },
      });
      if (response.isSuccess && response.paymentUrl) {
        message.success("Đang chuyển hướng đến trang thanh toán...");
        window.location.href = response.paymentUrl;
      } else {
        message.error("Thanh toán thất bại. Không có URL thanh toán.");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi trong quá trình thanh toán.");
      console.error("Lỗi thanh toán:", error);
    }
  };

  return (
    <div className="container-detail w-full py-8">
      <CartBreadcrumb />
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as "cart" | "order-history")}
        className="cart-tabs"
        items={[
          {
            key: "cart",
            label: "Giỏ hàng",
            children: (
              <div className="w-full">
                {cart && cart.items.length > 0 ? (
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {cart.items.map((item) => (
                        <CartItem
                          key={getVariantKey(item)}
                          item={item}
                          onQuantityChange={handleQuantityChange}
                          onRemove={handleRemove}
                        />
                      ))}
                    </div>
                    <CartSummary
                      totalItems={itemCount}
                      totalPrice={cart.totalPrice}
                      onCheckout={handleCheckout}
                    />
                  </div>
                ) : (
                  <Empty
                    description="Giỏ hàng của bạn đang trống"
                    className="flex flex-col items-center justify-center min-h-[350px]"
                  >
                    <a href="/shop" className="text-blue-600 underline text-lg">
                      Tiếp tục mua sắm
                    </a>
                  </Empty>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Cart;