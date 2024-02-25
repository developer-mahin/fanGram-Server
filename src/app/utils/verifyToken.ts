import httpStatus from 'http-status';
import AppError from './AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = (token: string, accessToken: string) => {
  try {
    return jwt.verify(token, accessToken) as JwtPayload;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }
};
