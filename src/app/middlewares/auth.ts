import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/CatchAsync';
import AppError from '../utils/AppError';
import httpStatus from 'http-status';
import { verifyToken } from '../utils/verifyToken';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import User from '../modules/user/user.model';

export const auth = (...requestedRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    if (requestedRole && !requestedRole.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'User not found');
    }

    if (user.isDeleted || user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not a valid user');
    }

    if (
      user.passwordUpdatedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordUpdatedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
