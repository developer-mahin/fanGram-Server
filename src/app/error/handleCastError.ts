import mongoose from 'mongoose';
import { TErrors, TGenericErrorResponse } from '../interface/errors';
import httpStatus from 'http-status';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errors: TErrors = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'invalid id',
    errors,
  };
};

export default handleCastError;
