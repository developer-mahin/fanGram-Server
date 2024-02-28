/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from '../../constant';

export type TUser = {
  _id?: Types.ObjectId;
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  password: string;
  isDeleted: boolean;
  role: 'admin' | 'user' | 'superAdmin';
  status: 'in-progress' | 'blocked';
  verified: boolean;
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
