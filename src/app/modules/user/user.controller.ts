import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';
import AppError from '../../utils/AppError';

const createManager = catchAsync(async (req, res) => {
  const { password, manager: data } = req.body;
  if (!password || !data) {
    throw new AppError(404, 'Add valid info');
  }

  const result = await userServices.createManagerIntoDB(password, data);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'User created successful please login',
    data: result,
  });
});

const createSeller = catchAsync(async (req, res) => {
  const { password, seller: data } = req.body;
  if (!password || !data) {
    throw new AppError(404, 'Add valid info');
  }

  const result = await userServices.createSellerIntoDB(password, data);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'User created successful please login',
    data: result,
  });
});

export const userController = {
  createSeller,
  createManager,
};
