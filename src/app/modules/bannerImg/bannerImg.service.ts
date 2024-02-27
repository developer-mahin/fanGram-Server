/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import Coupon from './bannerImg.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { TBannerImage } from './bannerImg.interface';

const createBannerImageInDB = async (payload: TBannerImage) => {
  const result = await Coupon.create(payload);
  return result;
};

const getAllBannerImageFromDB = async (query: Record<string, unknown>) => {
  const celebsQuery = new QueryBuilder(Coupon.find(), query)
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

const deleteBannerImageFromDB = async (id: string) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image available with this id');
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

export const BannerImageServices = {
  createBannerImageInDB,
  getAllBannerImageFromDB,
  deleteBannerImageFromDB,
};
