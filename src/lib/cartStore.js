import { priceCalc } from "@/helper/priceCalc";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  voucher: null, // Stores the entire voucher object
  totalPrice: 0,

  setCart: (cart) => set({ cart }),

  // Cart Operations
  addItem: (product) => {
    if (product?.l1) {
      product.price = product?.l1?.price;
      product.finalPrice = product?.l1?.finalPrice;
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
      .cart.map(
        (item) => priceCalc(item?.product, item?.product?.l1)?.price * item.qt
      )
      .reduce((a, b) => a + b, 0);
  },

  getTotal: () => {
    return get()
      .cart.map(
        (item) =>
          priceCalc(item?.product, item?.product?.l1)?.finalPrice * item.qt
      )
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
  },

  setVoucher: (voucher) => {
    set({ voucher });
    // Optionally, recalculate totalPrice here if needed
  },

  getVoucherDiscount: () => {
    const { cart, voucher } = get();

    if (!voucher || !cart || cart.length === 0) {
      return 0;
    }

    let applicableItems = [];
    let subtotalForDiscount = 0;

    if (voucher.apply_to_all) {
      // Apply to all items
      applicableItems = cart;
      subtotalForDiscount = cart.reduce((total, item) => {
        const price =
          priceCalc(item?.product, item?.product?.l1)?.finalPrice || 0;
        return total + price * item.qt;
      }, 0);
    } else if (voucher.product_ids && voucher.product_ids.length > 0) {
      // Apply only to specific products
      applicableItems = cart.filter((item) =>
        voucher.product_ids.includes(item.product?.id)
      );
      subtotalForDiscount = applicableItems.reduce((total, item) => {
        const price =
          priceCalc(item?.product, item?.product?.l1)?.finalPrice || 0;
        return total + price * item.qt;
      }, 0);
    }

    if (subtotalForDiscount === 0) {
      return 0;
    }

    let discount = 0;
    if (voucher.type === "%") {
      discount = (voucher.value / 100) * subtotalForDiscount;
    } else {
      discount = Math.min(voucher.value, subtotalForDiscount);
    }

    // Apply max_amount limit if specified
    if (voucher.max_amount && discount > voucher.max_amount) {
      discount = voucher.max_amount;
    }

    return discount;
  },

  getTotalWithVoucher: () => {
    const total = get().getTotal();
    const discount = get().getVoucherDiscount();
    return Math.max(0, total - discount);
  },

  getVoucherApplicableItems: () => {
    const { cart, voucher } = get();

    if (!voucher || !cart || cart.length === 0) {
      return [];
    }

    if (voucher.apply_to_all) {
      return cart;
    } else if (voucher.product_ids && voucher.product_ids.length > 0) {
      return cart.filter((item) =>
        voucher.product_ids.includes(item.product?.id)
      );
    }

    return [];
  },
}));

useCartStore.subscribe(({ cart, voucher }) => {
  localStorage.setItem("karada-cart", JSON.stringify(cart));
  // Optionally, persist voucher if needed
});
