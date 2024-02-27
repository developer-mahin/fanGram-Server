import { Router } from 'express';
import { CouponController } from './coupon.controller';
import { CouponValidation } from './coupon.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(CouponValidation.createCouponValidation),
  CouponController.createCoupon,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  CouponController.getCoupons,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  CouponController.deleteCoupon,
);

export const couponRoutes = router;
