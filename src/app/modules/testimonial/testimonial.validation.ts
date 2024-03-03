import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    videoUrl: z.string().min(1, { message: 'videoUrl is required' }),
    review: z.string().min(1, { message: 'review is required' }),
    name: z.string().min(1, { message: 'name is required' }),
    occasion: z.string().min(1, { message: 'occasion is required' }),
  }),
});

export const OrderCelebrityValidation = {
  productValidationSchema,
};
