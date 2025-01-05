import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  voucher: null, // Stores the entire voucher object
  totalPrice: 0,
  deliveryCost: 5000, // Adjust as needed

  setCart: (cart) => set({ cart }),

  // Cart Operations
  addItem: (product) => {
    if (product?.l1) {
      product.price = product?.l1?.price;
      product.endPrice = product?.l1?.endPrice; //TODO : handl endprice from BE -done
    }
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
        else return true;
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
          return { ...item, qt: item.qt + 1 };
        return item;
      }),
    }));
  },
  decrease: (itemToBeDecreased) => {
    set((state) => ({
      cart: state.cart.map((item) => {
        if (
          item.product.id === itemToBeDecreased.id &&
          item.qt > 1 &&
          item.product?.l1?.uuid === itemToBeDecreased?.l1?.uuid
        )
          return { ...item, qt: item.qt - 1 };
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

  getQty: (product) => {
    return (
      get().cart.find(
        (item) =>
          item?.product?.id === product?.id &&
          item?.product?.l1?.uuid === product?.l1?.uuid
      )?.qt || 0
    );
  },

  clearVoucher: () => {
    set({
      voucher: null,
    });
  } ,

  setVoucher: (voucher) => {
    set({ voucher });
    // Optionally, recalculate totalPrice here if needed
  },
}));

useCartStore.subscribe(({ cart, voucher }) => {
  localStorage.setItem("karada-cart", JSON.stringify(cart));
  // Optionally, persist voucher if needed
});
