/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { TCelebrity } from './celebrity.interface';
import Celebrity from './celebrity.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createCelebrityInDB = async (file: any, payload: TCelebrity) => {
  const celebData = {
    imgUrl: file.path,
    ...payload,
  };

  const result = await Celebrity.create(celebData);
  return result;
};

const getAllCelebrityFromDB = async (query: Record<string, unknown>) => {
  const searchableField = ['celebrity_name'];

  const productsQuery = new QueryBuilder(Celebrity.find(), query)
    .search(searchableField)
    .fields()
    .filter()
    .sort();

  const result = await productsQuery.modelQuery;
  const meta = await productsQuery.countTotal();

  return {
    meta,
    result,
  };
};

const deleteCelebrityFromDB = async (id: string) => {
  const celebrity = await Celebrity.findById(id);
  if (!celebrity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Celebrity not available with this id',
    );
  }

  if (celebrity.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Celebrity not available');
  }
  const result = await Celebrity.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { runValidators: true },
  );
  return result;
};

const updatedCelebrityInDB = async (
  id: string,
  payload: Partial<TCelebrity>,
) => {
  const product = await Celebrity.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Celebrity not found');
  }

  if (product.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'product not available');
  }

  if (payload.hashtag) {
    await Celebrity.findByIdAndUpdate(
      id,
      { $addToSet: { hashtag: { $each: payload.hashtag } } },
      { new: true },
    );
  }

  const result = await Celebrity.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );
  return result;
};

const getSingleCelebrityFromDB = async (id: string) => {
  const result = await Celebrity.findById(id);
  return result;
};

export const CelebrityServices = {
  createCelebrityInDB,
  deleteCelebrityFromDB,
  updatedCelebrityInDB,
  getAllCelebrityFromDB,
  getSingleCelebrityFromDB,
};
