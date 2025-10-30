import dayjs from "dayjs";

export const priceCalc = (product, l1) => {
  const { discountValue, discountExpire } = product;
  let endPrice = l1?.price || product?.price;
  let price = l1?.price || product?.price;
  let hasDiscount = false;

  if (discountValue && dayjs().isBefore(dayjs(discountExpire))) {
    hasDiscount = true;
    endPrice -= discountValue;
  }

  return { hasDiscount, endPrice, discountValue, price };
};
