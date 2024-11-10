import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  voucher: null, // Stores the entire voucher object
  totalPrice: 0,
  deliveryCost: 5000, // Adjust as needed

  setCart: (cart) => set({ cart }),

  // Cart Operations
  addItem: (product, option = null) => {
    const endPrice = product.endPrice || product.price;
    set((state) => ({
      cart: [...state.cart, { qt: 1, product, endPrice,  l1: option }],
    }));
  },
  removeItem: (product, option = null) => {
    set((state) => ({
      cart: state.cart.filter((item) => {
        return !(
          item.product.id === product.id &&
          (item.l1?.uuid || null) === (option?.uuid || null)
        );
      }),
    }));
  },
  increase: (product, option = null) => {
    set((state) => ({
      cart: state.cart.map((item) => {
        if (
          item.product.id === product.id &&
          (item.l1?.uuid || null) === (option?.uuid || null)
        )
          return { ...item, qt: item.qt + 1 };
        return item;
      }),
    }));
  },
  decrease: (product, option = null) => {
    set((state) => ({
      cart: state.cart.map((item) => {
        if (
          item.product.id === product.id &&
          (item.l1?.uuid || null) === (option?.uuid || null) &&
          item.qt > 1
        ) {
          return { ...item, qt: item.qt - 1 };
        }
        return item;
      }),
    }));
  },

  clearCart: () => {
    set({
      cart: [],
      voucher: null,
      totalPrice: 0,
    });
  },

  getItemsTotal: () => {
    return get()
      .cart.map((item) => item.qt)
      .reduce((a, b) => a + b, 0);
  },

  getSubTotal: () => {
    return get()
      .cart.map((item) => item?.product?.price * item.qt)
      .reduce((a, b) => a + b, 0);
  },

  getTotal: () => {
    return get()
      .cart.map((item) => item?.product?.endPrice * item.qt)
      .reduce((a, b) => a + b, 0);
  },

  getQty: (productId, option = null) => {
    const item = get().cart.find(
      (item) =>
        item?.product?.id === productId &&
        (item.l1?.uuid || null) === (option?.uuid || null)
    );
    return item?.qt || 0;
  },

  setVoucher: (voucher) => {
    set({ voucher });
    // Optionally, recalculate totalPrice here if needed
  },
}));

useCartStore.subscribe(({ cart, voucher }) => {
  localStorage.setItem("karada-cart", JSON.stringify(cart));
  // Optionally, persist voucher if needed
});