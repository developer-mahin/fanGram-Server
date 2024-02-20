import { ZodError, ZodIssue } from 'zod';
import { TErrors, TGenericErrorResponse } from '../interface/errors';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errors: TErrors = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errors,
  };
};

export default handleZodError;
