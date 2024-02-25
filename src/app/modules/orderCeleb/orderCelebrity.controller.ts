import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { CelebrityServices } from './orderCelebrity.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await CelebrityServices.createOrderCelebrityInDB(
    // req.file,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Order created successful',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CelebrityServices.deleteOrderCelebrityFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Order successfully deleted',
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CelebrityServices.updatedOrderCelebrityInDB(
    id,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Order successfully Updated',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await CelebrityServices.getAllOrderCelebrityFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All Orders retrieve successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const result = await CelebrityServices.getSingleOrderCelebrityFromDB(
    req.params.id,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Celebrity retrieve successfully',
    data: result,
  });
});

export const OrderCelebrityController = {
  createOrder,
  deleteOrder,
  updateOrder,
  getAllOrders,
  getSingleOrder,
};
