import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';
import AppError from '../../utils/AppError';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserInToDB(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Your are logged in successfully',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await authServices.changePassword(user!, passwordData);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Successfully updated Password',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const id = req.body.id;
  const result = await authServices.forgetPassword(id);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await authServices.resetPassword(req.body, token as string);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Password reset succesful!',
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
  refreshToken,
  changePassword,
  forgetPassword,
  getMyProfile,
  resetPassword,
};
