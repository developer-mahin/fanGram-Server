/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TBannerImage } from './bannerImg.interface';
import BannerImage from './bannerImg.model';

const createBannerImageInDB = async (payload: TBannerImage) => {
  const result = await BannerImage.create(payload);
  return result;
};

const getAllBannerImageFromDB = async (query: Record<string, unknown>) => {
  const celebsQuery = new QueryBuilder(BannerImage.find(), query)
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
  const banner = await BannerImage.findById(id);
  if (!banner) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image not available');
  }

  if (banner.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image not available');
  }
  const result = await BannerImage.findByIdAndUpdate(
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
