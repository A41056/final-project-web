import { create } from "zustand";

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  color: string | null;
}

interface Cart {
  userId: string;
  items: CartItem[];
  totalPrice: number;
}

interface CartState {
  cart: Cart | null;
  itemCount: number;
  setCart: (cart: Cart) => void;
  addItem: (item: CartItem) => void;
  clearCart: () => void;
}

const loadCartFromStorage = (): Cart | null => {
  const cartString = localStorage.getItem("cart");
  return cartString ? JSON.parse(cartString) : null;
};

export const useCartStore = create<CartState>((set) => ({
  cart: loadCartFromStorage(),
  itemCount:
    loadCartFromStorage()?.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    ) || 0,
  setCart: (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const newItemCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    set({ cart, itemCount: newItemCount });
  },
  addItem: (item) =>
    set((state) => {
      const currentCart = state.cart || {
        userId: "",
        items: [],
        totalPrice: 0,
      };
      if (!currentCart.userId && localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user")!);
        currentCart.userId = user.id;
      }
      const updatedItems = [...currentCart.items, item];
      const updatedTotalPrice = updatedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      const updatedCart = {
        ...currentCart,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      const newItemCount = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
      return { cart: updatedCart, itemCount: newItemCount };
    }),
  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: null, itemCount: 0 });
  },
}));
