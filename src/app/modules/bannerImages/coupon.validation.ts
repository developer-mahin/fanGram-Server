import { z } from 'zod';

const createCouponValidation = z.object({
  body: z.object({
    couponCode: z.string({ required_error: 'Coupon Code is required' }),
    discount: z
      .number({ required_error: 'Coupon Code is required' })
      .min(0, { message: 'Price must be a positive number' }),
    isDelete: z.boolean().default(false),
  }),
});

export const CouponValidation = {
  createCouponValidation,
};
