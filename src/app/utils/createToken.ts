import jwt from 'jsonwebtoken';

type TJwtPayload = {
  userId: string;
  role: string;
};

export const createJwtToken = (
  payload: TJwtPayload,
  secretToken: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secretToken, { expiresIn });
};
