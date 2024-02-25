/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { TUser } from './user.interface';
import User from './user.model';

const createAdminIntoDB = async (payload: TUser) => {
  const userExist = await User.findOne({ email: payload.email });

  if (userExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already exist with this email address',
    );
  }

  payload.role = 'admin';

  try {
    const createUser = await User.create(payload);
    return createUser;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const createUserIntoDB = async (payload: TUser) => {
  const userExist = await User.findOne({ email: payload.email });

  if (userExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already exist with this email address',
    );
  }

  try {
    const createUser = await User.create(payload);
    return createUser;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const userServices = {
  createAdminIntoDB,
  createUserIntoDB,
};
