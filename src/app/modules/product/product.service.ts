/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { TProduct, TUpdateRequest } from './product.interface';
import Product from './product.model';
// import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import QueryBuilder from '../../utils/QueryBuilder';
import User from '../user/user.model';

const createProductInDB = async (file: any, payload: TProduct) => {
  const user = await User.findOne({ _id: payload.manager });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Id/User not found');
  }

  if (user.status === 'blocked' || user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is not valid');
  }

  const product = await Product.findOne({ product_name: payload.product_name });

  if (product) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already have product with this name',
    );
  }

  // const fileName = payload.product_name + payload.release_date;
  // const path = file.path;

  // const { secure_url } = await sendImageToCloudinary(fileName, path);

  // const productData = {
  //   ...payload,
  //   product_image: secure_url,
  // };

  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const searchableField = [
    'product_name',
    'release_date',
    'brand',
    'model',
    'operating_system',
  ];

  const productsQuery = new QueryBuilder(Product.find({}), query)
    .search(searchableField)
    .priceRange()
    .filter()
    .sort();

  const result = await productsQuery.queryModel;
  const meta = await productsQuery.countTotal();

  return {
    meta,
    result,
  };
};

const deleteProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'product not available with this id',
    );
  }

  if (product.isDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'product not available');
  }
  const result = await Product.findByIdAndUpdate(
    id,
    { isDelete: true },
    { runValidators: true },
  );
  return result;
};

const updatedProductInDB = async (id: string, payload: Partial<TProduct>) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'product not available with this id',
    );
  }

  if (product.isDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'product not available');
  }

  const result = await Product.findByIdAndUpdate(
    id,
    { $set: payload },
    { runValidators: true },
  );
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('manager');
  return result;
};

const bulkDeleteProductFromDB = async (productIds: TUpdateRequest) => {
  const result = await Product.updateMany(
    { _id: { $in: productIds } },
    { $set: { isDelete: true } },
  );
  return result;
};

export const productServices = {
  createProductInDB,
  deleteProductFromDB,
  updatedProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  bulkDeleteProductFromDB,
};
