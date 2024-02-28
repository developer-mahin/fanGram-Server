import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createAdmin = catchAsync(async (req, res) => {
  const result = await userServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Admin created successful',
    data: result,
  });
});

const registerUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'User created successful please login',
    data: result,
  });
});

const updateUserAfterEmailVerify = catchAsync(async (req, res) => {
  const result = await userServices.updateUserInDbAfterEmailVerify(req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Verified Successfully',
    data: result,
  });
});

export const userController = {
  createAdmin,
  registerUser,
  updateUserAfterEmailVerify,
};
