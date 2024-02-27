/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { TCoupon } from './coupon.interface';
import Coupon from './coupon.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createCouponInDB = async (payload: TCoupon) => {
  const result = await Coupon.create(payload);
  return result;
};

const getAllCouponsFromDB = async (query: Record<string, unknown>) => {
  const searchableField = ['couponCode'];

  const celebsQuery = new QueryBuilder(Coupon.find(), query)
    .search(searchableField)
    .fields()
    .filter()
    .sort();

  const result = await celebsQuery.modelQuery;
  const meta = await celebsQuery.countTotal();

  return {
    meta,
    result,
  };
};

const deleteCouponFromDB = async (id: string) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Coupon not available with this id',
    );
  }

  if (coupon.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Celebrity not available');
  }
  const result = await Coupon.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { runValidators: true },
  );
  return result;
};

export const CouponServices = {
  createCouponInDB,
  getAllCouponsFromDB,
  deleteCouponFromDB,
};
