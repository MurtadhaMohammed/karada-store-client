import dayjs from "dayjs";

export const priceCalc = (product, l1) => {
  const { discountValue, saleExpire, onSale } = product;
  let finalPrice = l1?.price || product?.price;
  let price = l1?.price || product?.price;
  let hasDiscount = onSale;

  if (discountValue && dayjs().isBefore(dayjs(saleExpire))) {
    hasDiscount = true;
    finalPrice -= discountValue;
  }

  return { hasDiscount, finalPrice, discountValue, price };
};
