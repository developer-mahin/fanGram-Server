import { z } from 'zod';

const createBannerImageValidation = z.object({
  body: z.array(
    z.object({
      path: z.string({ required_error: 'Image is required' }),
      isDelete: z.boolean().default(false),
    }),
  ),
});

export const BannerImageValidation = {
  createBannerImageValidation,
};
