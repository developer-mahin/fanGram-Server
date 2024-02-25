import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string({ required_error: 'Date is Required' }),
    email: z
      .string({ required_error: 'Email is Required' })
      .email({ message: 'Invalid email address' }),
    contactNo: z.string({ required_error: 'Contact No is Required' }),
    password: z
      .string({ required_error: 'Password is Required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    isDeleted: z.boolean().default(false),
    role: z.enum(['admin', 'user', 'superAdmin']).default('user'),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    passwordUpdatedAt: z.date().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
