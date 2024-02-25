/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
// import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TCelebrity } from './celebrity.interface';
import Celebrity from './celebrity.model';
import QueryBuilder from '../../builder/QueryBuilder';

// const createCelebrityInDB = async (file: any, payload: TCelebrity) =>

const createCelebrityInDB = async (payload: TCelebrity) => {
  // const fileName = payload.product_name + payload.release_date;
  // const path = file.path;

  // const { secure_url } = await sendImageToCloudinary(fileName, path);

  // const productData = {
  //   ...payload,
  //   product_image: secure_url,
  // };

  const result = await Celebrity.create(payload);
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
  const product = await Celebrity.findById(id);
  if (!product) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Celebrity not available with this id',
    );
  }

  if (product.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Celebrity not available');
  }
  const result = await Celebrity.findByIdAndUpdate(
    id,
    { isDelete: true },
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
    await Celebrity.findById(id, {
      $addToSet: { hashtag: payload.hashtag },
    });
  }

  const result = await Celebrity.findByIdAndUpdate(
    id,
    { $set: payload },
    { runValidators: true },
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
