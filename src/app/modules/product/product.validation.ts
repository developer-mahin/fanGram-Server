import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    product_name: z.string().min(1, { message: 'Product name is required' }),
    price: z.number().min(0, { message: 'Price must be a positive number' }),
    quantity: z
      .number()
      .min(0, { message: 'Quantity must be a positive number' }),
    release_date: z.string().min(1, { message: 'Release date is required' }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    model: z.string().min(1, { message: 'Model is required' }),
    operating_system: z
      .string()
      .min(1, { message: 'Operating system is required' }),
    storage_capacity: z
      .string()
      .min(1, { message: 'Storage capacity is required' }),
    screen_size: z.string().min(1, { message: 'Screen size is required' }),
    battery_type: z.string().min(1, { message: 'Battery type is required' }),
    colors: z.string().min(1, { message: 'Colors is required' }),
    display_resolution: z
      .string()
      .min(1, { message: 'Display resolution is required' }),
    material: z.string().min(1, { message: 'Material is required' }),
    network: z.string().min(1, { message: 'Network is required' }),
    ram: z.string().min(1, { message: 'RAM is required' }),
    camera_quality: z
      .string()
      .min(1, { message: 'Camera quality is required' }),
    battery_life: z.string().min(1, { message: 'Battery life is required' }),
    isDelete: z.boolean().default(false),
    status: z.string().default('in-stock'),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    product_name: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    price: z
      .number({ invalid_type_error: 'This field must be number' })
      .optional(),
    quantity: z
      .number({ invalid_type_error: 'This filed must be number' })
      .optional(),
    release_date: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    brand: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    model: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    operating_system: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    storage_capacity: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    screen_size: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    battery_type: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    colors: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    display_resolution: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    material: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    network: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    ram: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    camera_quality: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
    battery_life: z
      .string({ invalid_type_error: 'This field must be string' })
      .optional(),
  }),
});

export const productValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
