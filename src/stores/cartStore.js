import { create } from "zustand";
const loadCartFromStorage = () => {
    const cartString = localStorage.getItem("cart");
    const hasMerged = localStorage.getItem("hasMergedServerCart");
    let cart = cartString ? JSON.parse(cartString) : null;
    if (cart) {
        // Migrate old items without variant
        cart.items = cart.items.map((item) => ({
            ...item,
            variant: item.variant || { properties: [{ type: "Color", value: item.color || "Unknown" }], price: item.price, stockCount: 0 },
        }));
        localStorage.setItem("cart", JSON.stringify(cart)); // Update storage with migrated data
    }
    return {
        cart,
        hasMergedServerCart: hasMerged ? JSON.parse(hasMerged) : false,
    };
};
export const useCartStore = create((set) => {
    const { cart, hasMergedServerCart } = loadCartFromStorage();
    return {
        cart,
        itemCount: cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0,
        hasMergedServerCart,
        setCart: (cart) => {
            localStorage.setItem("cart", JSON.stringify(cart));
            const newItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            set({ cart, itemCount: newItemCount });
        },
        addItem: (item) => set((state) => {
            const currentCart = state.cart || { userId: "", items: [], totalPrice: 0 };
            if (!currentCart.userId && localStorage.getItem("user")) {
                const user = JSON.parse(localStorage.getItem("user"));
                currentCart.userId = user.id;
            }
            const existingItemIndex = currentCart.items.findIndex((i) => i.productId === item.productId &&
                JSON.stringify(i.variant.properties) === JSON.stringify(item.variant.properties));
            let updatedItems;
            if (existingItemIndex >= 0) {
                updatedItems = currentCart.items.map((i, index) => index === existingItemIndex
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i);
            }
            else {
                updatedItems = [...currentCart.items, { ...item }];
            }
            const updatedTotalPrice = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
            const updatedCart = {
                ...currentCart,
                items: updatedItems,
                totalPrice: updatedTotalPrice,
            };
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            const newItemCount = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
            return { cart: updatedCart, itemCount: newItemCount };
        }),
        mergeCart: (serverCart) => set((state) => {
            const localCart = state.cart || { userId: serverCart.userId, items: [], totalPrice: 0 };
            const serverItems = serverCart.items || [];
            if (state.hasMergedServerCart &&
                localCart.items.length === serverItems.length &&
                serverItems.every((serverItem) => localCart.items.some((localItem) => localItem.productId === serverItem.productId &&
                    JSON.stringify(localItem.variant.properties) === JSON.stringify(serverItem.variant.properties) &&
                    localItem.quantity === serverItem.quantity))) {
                return state;
            }
            const mergedItems = [...localCart.items];
            serverItems.forEach((serverItem) => {
                const existingItemIndex = mergedItems.findIndex((i) => i.productId === serverItem.productId &&
                    JSON.stringify(i.variant.properties) === JSON.stringify(serverItem.variant.properties));
                if (existingItemIndex >= 0) {
                    if (mergedItems[existingItemIndex].quantity !== serverItem.quantity) {
                        mergedItems[existingItemIndex] = {
                            ...mergedItems[existingItemIndex],
                            quantity: serverItem.quantity,
                        };
                    }
                }
                else {
                    mergedItems.push({ ...serverItem });
                }
            });
            const updatedTotalPrice = mergedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
            const updatedCart = {
                userId: serverCart.userId,
                items: mergedItems,
                totalPrice: updatedTotalPrice,
            };
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            localStorage.setItem("hasMergedServerCart", JSON.stringify(true));
            const newItemCount = mergedItems.reduce((sum, i) => sum + i.quantity, 0);
            return {
                cart: updatedCart,
                itemCount: newItemCount,
                hasMergedServerCart: true,
            };
        }),
        clearCart: () => {
            localStorage.removeItem("cart");
            localStorage.removeItem("hasMergedServerCart");
            set({ cart: null, itemCount: 0, hasMergedServerCart: false });
        },
    };
});
