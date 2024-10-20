import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  setCart: (cart) => set({ cart }),

  // Cart Operations
  addItem: (product) => {
    set((state) => ({
      cart: [...state.cart, { qt: 1, product }],
    }));
  },
  removeItem: (itemToBeRemoved) => {
    set((state) => ({
      cart: state.cart.filter((item) => {
        if (
          item.product.id === itemToBeRemoved.id &&
          item.product?.l1?.uuid === itemToBeRemoved?.l1?.uuid
        )
          return false;
        else return item;
      }),
    }));
  },
  increase: (itemToBeIncreased) => {
    set((state) => ({
      cart: state.cart.map((item) => {
        if (
          item.product.id === itemToBeIncreased.id &&
          item.product?.l1?.uuid === itemToBeIncreased?.l1?.uuid
        )
          item.qt += 1;
        return item;
      }),
    }));
  },
  decrease: (itemToBeDecreased) => {
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.product.id === itemToBeDecreased.id && item.qt > 1)
          item.qt -= 1;
        return item;
      }),
    }));
  },

  clearCart: () => {
    set({
      cart: [],
    });
  },

  getItemsTotal: () => {
    return get()
      .cart.map((item) => item.qt)
      .reduce((a, b) => a + b, 0);
  },

  // getSubTotal: () => {
  //   return get()
  //     .cart.map((item) => item?.price * item.qt)
  //     .reduce((a, b) => a + b, 0);
  // },

  // getTotal: () => {
  //   return get()
  //     .cart.map((item) => item?.endPrice * item.qt)
  //     .reduce((a, b) => a + b, 0);
  // },

  getQty: (productId) => {
    return get().cart.find((item) => item?.product?.id === productId)?.qt || 0;
  },
}));

useCartStore.subscribe(console.log);
