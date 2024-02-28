import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../utils/AppError';
import { createJwtToken } from '../../utils/createToken';
import { verifyToken } from '../../utils/verifyToken';
import User from '../user/user.model';
import { TAuthentication } from './auth.interface';
import { Types } from 'mongoose';
import { sendEmail } from '../../utils/sendEmail';

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

  const jwtPayload = {
    userId: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createJwtToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExist(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordUpdatedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordUpdatedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user._id as Types.ObjectId,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
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

const forgetPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await User.isUserExist(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    userId: user._id as Types.ObjectId,
    email: user?.email,
    role: user?.role,
  };

  const resetToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user._id}&token=${resetToken} `;

  const subject = 'Reset your password within ten mins!';

  sendEmail(user.email, subject, resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.isUserExist(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  if (payload.id !== decoded.userId) {
    console.log(payload.id, decoded.userId);
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      _id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordUpdatedAt: new Date(),
    },
  );
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
  refreshToken,
  changePassword,
  forgetPassword,
  getMyProfileFromDB,
  resetPassword,
};
