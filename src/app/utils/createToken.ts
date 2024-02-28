import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

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
  return jwt.sign(payload, secretToken, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
