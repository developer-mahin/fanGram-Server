/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from '../../constant';

export type TUser = {
  email: string;
  password: string;
  isDeleted: boolean;
  role: 'manager' | 'seller' | 'superAdmin';
  status: 'in-progress' | 'blocked';
  needsPasswordChange: boolean;
  passwordUpdatedAt?: Date;
};

export interface UserModel extends Model<TUser> {
  isUserExist(id: string): Promise<TUser>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimeStamps: Date,
    jwtIssuedTimeStamps: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
