import React from "react";
import { useCartStore } from "@/stores/cartStore";
import CartBreadcrumb from "@/components/Cart/CartBreadcrumb";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import { Empty } from "antd";

const Cart: React.FC = () => {
  const { cart, itemCount, addItem, setCart } = useCartStore();

  const handleQuantityChange = (productId: string, quantity: number) => {
    const item = cart?.items.find(
      (i) =>
        i.productId === productId &&
        JSON.stringify(i.variant?.properties || []) === JSON.stringify(
          cart.items.find((it) => it.productId === productId)?.variant?.properties || []
        )
    );
    if (item) {
      addItem({ ...item, quantity: quantity - item.quantity });
    }
  };

  const handleRemove = (productId: string) => {
    if (cart) {
      const updatedItems = cart.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            JSON.stringify(item.variant?.properties || []) === JSON.stringify(
              cart.items.find((it) => it.productId === productId)?.variant?.properties || []
            )
          )
      );
      const updatedCart = {
        ...cart,
        items: updatedItems,
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
      setCart(updatedCart);
    }
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  return (
    <div className="container-detail flex flex-col items-center justify-center px-4 md:px-24 py-5 gap-2.5 max-w-full">
      <hr className="my-4 border-t border-gray-200 w-full" />
      <CartBreadcrumb />

      <div className="w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
        {cart && cart.items.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-7">
            <div className="flex-1">
              {cart.items.map((item) => (
                <CartItem
                  key={`${item.productId}-${JSON.stringify(item.variant?.properties || [])}`}
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
            description="Your cart is empty"
            className="flex flex-col items-center justify-center min-h-[400px]"
          >
            <a href="/shop" className="text-blue-500 underline">
              Continue Shopping
            </a>
          </Empty>
        )}
      </div>
    </div>
  );
};

export default Cart;