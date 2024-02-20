import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductInDB(req.file, req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'product created successful',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await productServices.deleteProductFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'successfully delete the product',
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.updatedProductInDB(id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'successfully delete the product',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All products  retrieve successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await productServices.getSingleProductFromDB(req.params.id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'a product retrieve successfully',
    data: result,
  });
});

const bulkDeleteProduct = catchAsync(async (req, res) => {
  const result = await productServices.bulkDeleteProductFromDB(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'a product retrieve successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  bulkDeleteProduct,
};
