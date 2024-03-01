/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TLatestWork } from './latestWork.interface';
import LatestWork from './latestWork.model';

const createLatestWorkInDB = async (payload: TLatestWork, file: any) => {
  const path = file.filename;
  const result = await LatestWork.create({ ...payload, path });
  return result;
};

const getAllLatestWorkFromDB = async (query: Record<string, unknown>) => {
  const celebsQuery = new QueryBuilder(LatestWork.find(), query)
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

const deleteLatestWorkFromDB = async (id: string) => {
  const banner = await LatestWork.findById(id);
  if (!banner) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image not available');
  }

  if (banner.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image not available');
  }
  const result = await LatestWork.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { runValidators: true },
  );
  return result;
};

export const LatestWorkServices = {
  createLatestWorkInDB,
  getAllLatestWorkFromDB,
  deleteLatestWorkFromDB,
};
