/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import AppError from './AppError';
import httpStatus from 'http-status';

type TJwtPayload = {
  userId: Types.ObjectId;
  email: string;
  role: string;
};

export const createJwtToken = (
  payload: TJwtPayload,
  secretToken: string,
  expiresIn: string,
) => {
  try {
    return jwt.sign(payload, secretToken, { expiresIn });
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
