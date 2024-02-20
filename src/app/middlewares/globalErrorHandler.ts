/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrors } from '../interface/errors';
import { ZodError } from 'zod';
import handleZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import AppError from '../utils/AppError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'something went wrong';

  let errors: TErrors = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const getError = handleZodError(err);
    statusCode = getError?.statusCode;
    message = getError?.message;
    errors = getError?.errors;
  } else if (err?.name === 'ValidationError') {
    const getError = handleValidationError(err);
    statusCode = getError?.statusCode;
    message = getError?.message;
    errors = getError?.errors;
  } else if (err?.name === 'CastError') {
    const getError = handleCastError(err);
    statusCode = getError?.statusCode;
    message = getError?.message;
    errors = getError?.errors;
  } else if (err?.code === '11000') {
    const getError = handleDuplicateError(err);
    statusCode = getError?.statusCode;
    message = getError?.message;
    errors = getError?.errors;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errors = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
