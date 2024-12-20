import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import type { CouponCode } from "./couponCodes";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
  const ACTIVE_SALE_BY_COUPON_CODE_QUERY = defineQuery(`
    *[_type == "sales" && couponCode == $couponCode && isActive == true]
    | order(validFrom desc)[0]
  `);

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_CODE_QUERY,
      // pass the couponCode as a parameter to the query
      params: { couponCode },
    });

    return activeSale ? activeSale.data : null;
  } catch (error) {
    console.error(`Error fetching sale by coupon code ${couponCode}`, error);
    return null;
  }
};
