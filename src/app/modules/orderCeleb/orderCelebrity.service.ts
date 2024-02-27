/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
// import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import QueryBuilder from '../../builder/QueryBuilder';
import { TOrderCelebrity } from './orderCelebrity.interface';
import OrderCelebrity from './orderCelebrity.model';
import User from '../user/user.model';
import Celebrity from '../celebrity/celebrity.model';
import AppError from '../../utils/AppError';

// const createCelebrityInDB = async (file: any, payload: TCelebrity) =>

const createOrderCelebrityInDB = async (payload: TOrderCelebrity) => {
  // const fileName = payload.product_name + payload.release_date;
  // const path = file.path;

  // const { secure_url } = await sendImageToCloudinary(fileName, path);

  // const productData = {
  //   ...payload,
  //   product_image: secure_url,
  // };

  const celebrity = await Celebrity.findById(payload.celebrityId);

  if (!celebrity) {
    throw new AppError(httpStatus.NOT_FOUND, 'Celebrity not found');
  }
  const user = await User.findById(payload.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await OrderCelebrity.create(payload);
  return result;
};

const getAllOrderCelebrityFromDB = async (query: Record<string, unknown>) => {
  const searchableField = ['celebrity_name'];

  const productsQuery = new QueryBuilder(OrderCelebrity.find(), query)
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

const deleteOrderCelebrityFromDB = async (id: string) => {
  const product = await OrderCelebrity.findById(id);
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
    { isDeleted: true },
    { runValidators: true },
  );
  return result;
};

const updatedOrderCelebrityInDB = async (
  id: string,
  payload: Partial<TOrderCelebrity>,
) => {
  const product = await OrderCelebrity.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Celebrity not found');
  }

  if (product.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'product not available');
  }

  const result = await OrderCelebrity.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      runValidators: true,
      new: true,
    },
  );
  return result;
};

const getSingleOrderCelebrityFromDB = async (id: string) => {
  const result = await OrderCelebrity.findById(id);
  return result;
};

export const CelebrityServices = {
  createOrderCelebrityInDB,
  deleteOrderCelebrityFromDB,
  updatedOrderCelebrityInDB,
  getAllOrderCelebrityFromDB,
  getSingleOrderCelebrityFromDB,
};
