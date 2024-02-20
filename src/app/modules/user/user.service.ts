/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../utils/AppError';
import { TManager } from '../Manager/manager.interface';
import Manager from '../Manager/manager.model';
import Seller from '../Seller/seller.model';
import { TUser } from './user.interface';
import User from './user.model';

const createManagerIntoDB = async (password: string, payload: TManager) => {
  const newUser: Partial<TUser> = {};

  const userExist = await User.findOne({ email: payload.email });

  if (userExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already exist with this email address',
    );
  }

  newUser.password = password || config.default_password;
  newUser.email = payload.email;
  newUser.role = 'manager';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const createUser = await User.create([newUser], { session });

    if (!createUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "user does'nt created something went wrong!",
      );
    }
    // set user id in manager collection as a reference
    payload.user = createUser[0]._id;
    const createManager = await Manager.create([payload], { session });
    if (!createManager) {
      throw new AppError(400, "Manager didn't created !");
    }
    await session.commitTransaction();
    await session.endSession();
    return createManager;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404, error.message);
  }
};

const createSellerIntoDB = async (password: string, payload: TManager) => {
  const newUser: Partial<TUser> = {};

  const userExist = await User.findOne({ email: payload.email });

  if (userExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already exist with this email address',
    );
  }

  newUser.password = password || config.default_password;
  newUser.email = payload.email;
  newUser.role = 'seller';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const createUser = await User.create([newUser], { session });

    if (!createUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "user does'nt created something went wrong!",
      );
    }
    // set user id in manager collection as a reference
    payload.user = createUser[0]._id;

    const createSeller = await Seller.create([payload], { session });
    if (!createSeller) {
      throw new AppError(400, "Manager didn't created !");
    }
    await session.commitTransaction();
    await session.endSession();
    return createSeller;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404, error.message);
  }
};

export const userServices = {
  createManagerIntoDB,
  createSellerIntoDB,
};
