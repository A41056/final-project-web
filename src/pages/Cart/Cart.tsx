import React from "react";
import { useCartStore, CartItem as CartItemType } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import CartBreadcrumb from "@/components/Cart/CartBreadcrumb";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import { Empty, message } from "antd";
import { basketApi } from "@/config/api";

const Cart: React.FC = () => {
  const { cart, itemCount, addItem, setCart } = useCartStore();
  const { user } = useAuthStore();
  const postBasket = basketApi.usePost();

  const getVariantKey = (item: CartItemType) =>
    `${item.productId}-${JSON.stringify(item.variant?.properties || [])}`;

  const handleQuantityChange = (productId: string, quantity: number) => {
    const item = cart?.items.find((i) =>
      getVariantKey(i) === getVariantKey({
        productId,
        variant: i.variant
      } as CartItemType));
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
      message.error("User not logged in or cart is empty.");
      return;
    }

    const basketCheckoutDto = {
      UserId: user.id,
      CustomerId: user.id, // Assuming customer ID is same as user ID; adjust if needed
      UserName: user.username || "",
      FirstName: user.firstName || "",
      LastName: user.lastName || "",
      EmailAddress: user.email || "",
      AddressLine: "So 82, Pho Moi", // Placeholder; update with actual address if available
      Country: "VietNam", // Placeholder; update with actual country if available
      Items: cart.items.map((item) => ({
        ProductId: item.productId,
        Quantity: item.quantity,
        UnitPrice: item.price / 100, // Convert cents to dollars
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
      if (response.IsSuccess) {
        message.success("Checkout successful!");
        //setCart(null); // Clear the cart on successful checkout
      } else {
        message.error("Checkout failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred during checkout.");
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="container-detail flex flex-col items-center justify-center px-4 md:px-24 py-4 gap-2 max-w-full">
      <hr className="my-3 border-t border-gray-200 w-full" />
      <CartBreadcrumb />

      <div className="w-full">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Your Cart</h1>
        {cart && cart.items.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
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
            description="Your cart is empty"
            className="flex flex-col items-center justify-center min-h-[300px]"
          >
            <a href="/shop" className="text-blue-500 underline text-sm">
              Continue Shopping
            </a>
          </Empty>
        )}
      </div>
    </div>
  );
};

export default Cart;