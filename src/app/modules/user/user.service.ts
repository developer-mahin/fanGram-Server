/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { TUser } from './user.interface';
import User from './user.model';
import { sendEmail } from '../../utils/sendEmail';
import VerifyCoupon, { TVerify } from '../verificationCode/verifycode.model';
import mongoose from 'mongoose';

const createAdminIntoDB = async (payload: TUser) => {
  const userExist = await User.findOne({ email: payload.email });

  if (userExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already exist with this email address',
    );
  }

  payload.role = 'admin';

  try {
    const createUser = await User.create(payload);
    return createUser;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const createUserIntoDB = async (payload: TUser) => {
  const userExist = await User.findOne({ email: payload.email });

  if (userExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already exist with this email address',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const subject = 'Verification Code for FanGram';

    const randomDigit = Math.floor(1000 + Math.random() * 9000);

    const html = `
  <div className=${'mx-auto text-center'}>
  <h1 className=${'text-2xl font-bold mx-auto'}>Reset your password</h1>
  <p className=${'text-lg font-semibold mx-auto'}>Here is the verification code to confirm your email</p>
  <p className=${'text-lg mx-auto'}>${randomDigit}</p>
  </div>
  `;

    try {
      await sendEmail(payload.email, subject, html);
    } catch (error) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Email not sent');
    }

    const user = await User.create([payload], { session });

    await VerifyCoupon.create([{ email: user[0].email, code: randomDigit }], {
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    return user;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const updateUserInDbAfterEmailVerify = async (payload: TVerify) => {
  const { email, code } = payload;
  const verify = await VerifyCoupon.findOne({ email: email });
  if (!verify) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email Not Matched');
  }
  if (code === verify.code) {
    const user = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: { verified: true },
      },
      { new: true },
    );
    await VerifyCoupon.deleteOne({ email: email });
    return user;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Code Not Matched');
  }
};

export const userServices = {
  createAdminIntoDB,
  createUserIntoDB,
  updateUserInDbAfterEmailVerify,
};
