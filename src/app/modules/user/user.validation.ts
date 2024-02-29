import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }),
    email: z
      .string({ required_error: 'Email is Required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is Required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
