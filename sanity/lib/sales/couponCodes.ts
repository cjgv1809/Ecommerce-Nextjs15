export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
  XMAS2024: "XMAS2024",
  NEWYEAR25: "NEWYEAR25",
} as const;

export type CouponCode = (typeof COUPON_CODES)[keyof typeof COUPON_CODES];
