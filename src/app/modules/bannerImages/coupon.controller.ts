import httpStatus from 'http-status';
import { CouponServices } from './coupon.service';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCouponInDB(
    // req.file,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Coupon created successful',
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CouponServices.deleteCouponFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Coupon successfully deleted',
  });
});

const getCoupons = catchAsync(async (req, res) => {
  const result = await CouponServices.getAllCouponsFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All Coupons retrieve successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const CouponController = {
  createCoupon,
  deleteCoupon,
  getCoupons,
};
