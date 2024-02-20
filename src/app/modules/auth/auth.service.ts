import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../utils/AppError';
import { createJwtToken } from '../../utils/createToken';
import { verifyToken } from '../../utils/verifyToken';
import User from '../user/user.model';
import { TAuthentication } from './auth.interface';

const loginUserInToDB = async (payload: TAuthentication) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const checkUserStatus = user?.status;
  if (checkUserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  const checkMatchedPassword = await bcrypt.compare(password, user.password);
  if (!checkMatchedPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'password not matched');
  }

  const userDate = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createJwtToken(
    userDate,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { newPassword: string; oldPassword: string },
) => {
  const { oldPassword, newPassword } = payload;
  const user = await User.isUserExist(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const checkUserStatus = user?.status;
  if (checkUserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  const checkMatchedPassword = await bcrypt.compare(oldPassword, user.password);
  if (!checkMatchedPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'password not matched');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate(
    {
      _id: userData.userId,
      role: userData.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordUpdatedAt: new Date(),
    },
  );

  return null;
};

const getMyProfileFromDB = async (token: string) => {
  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const result = await User.findById(decoded.userId);

  return result;
};

export const authServices = {
  loginUserInToDB,
  changePassword,
  getMyProfileFromDB,
};
