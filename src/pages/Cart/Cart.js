import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import CartBreadcrumb from "@/components/Cart/CartBreadcrumb";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import { Empty, message, Tabs } from "antd";
import { basketApi } from "@/config/api";
import OrderHistoryTab from "@/components/OrderHistoryTab/OrderHistoryTab";
const Cart = () => {
    const { cart, itemCount, addItem, setCart } = useCartStore();
    const { user } = useAuthStore();
    const postBasket = basketApi.usePost();
    const location = useLocation();
    const initialTab = new URLSearchParams(location.search).get("tab") === "order-history" ? "order-history" : "cart";
    const [activeTab, setActiveTab] = useState(initialTab);
    const getVariantKey = (item) => `${item.productId}-${JSON.stringify(item.variant?.properties || [])}`;
    const handleQuantityChange = (productId, quantity) => {
        const item = cart?.items.find((i) => getVariantKey(i) === getVariantKey({
            productId,
            variant: i.variant,
        }));
        if (item) {
            addItem({ ...item, quantity: quantity - item.quantity });
        }
    };
    const handleRemove = (productId) => {
        if (cart) {
            const itemToRemove = cart.items.find((i) => i.productId === productId);
            if (!itemToRemove)
                return;
            const updatedItems = cart.items.filter((item) => getVariantKey(item) !== getVariantKey(itemToRemove));
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
            }
            else {
                message.error("Thanh toán thất bại. Không có URL thanh toán.");
            }
        }
        catch (error) {
            message.error("Đã xảy ra lỗi trong quá trình thanh toán.");
            console.error("Lỗi thanh toán:", error);
        }
    };
    return (_jsxs("div", { className: "container-detail w-full py-8", children: [_jsx(CartBreadcrumb, {}), _jsx(Tabs, { activeKey: activeTab, onChange: (key) => setActiveTab(key), className: "cart-tabs", items: [
                    {
                        key: "cart",
                        label: "Giỏ hàng",
                        children: (_jsx("div", { className: "w-full", children: cart && cart.items.length > 0 ? (_jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [_jsx("div", { className: "flex-1 space-y-4 max-h-[600px] overflow-y-auto pr-2", children: cart.items.map((item) => (_jsx(CartItem, { item: item, onQuantityChange: handleQuantityChange, onRemove: handleRemove }, getVariantKey(item)))) }), _jsx(CartSummary, { totalItems: itemCount, totalPrice: cart.totalPrice, onCheckout: handleCheckout })] })) : (_jsx(Empty, { description: "Gi\u1ECF h\u00E0ng c\u1EE7a b\u1EA1n \u0111ang tr\u1ED1ng", className: "flex flex-col items-center justify-center min-h-[350px]", children: _jsx("a", { href: "/shop", className: "text-blue-600 underline text-lg", children: "Ti\u1EBFp t\u1EE5c mua s\u1EAFm" }) })) })),
                    },
                    {
                        key: "order-history",
                        label: "Lịch sử mua hàng",
                        children: _jsx(OrderHistoryTab, { isActive: activeTab === "order-history" }),
                    },
                ] })] }));
};
export default Cart;
