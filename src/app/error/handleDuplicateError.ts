/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import { TErrors, TGenericErrorResponse } from '../interface/errors';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const message = match && match[1];

  const errors: TErrors = [
    {
      path: '',
      message: `${message} is already exists`,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Duplicate Error',
    errors,
  };
};

export default handleDuplicateError;
