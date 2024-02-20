import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import AppError from '../../utils/AppError';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserInToDB(req.body);

  const { accessToken, needsPasswordChange } = result;

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Your are login successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await authServices.changePassword(user!, passwordData);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'successfully updated Password',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
  }
  const result = await authServices.getMyProfileFromDB(token);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'successfully updated Password',
    data: result,
  });
});

export const authControllers = {
  loginUser,
  changePassword,
  getMyProfile,
};
