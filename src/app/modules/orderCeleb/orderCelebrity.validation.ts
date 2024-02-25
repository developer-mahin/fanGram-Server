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

export const OrderCelebrityValidation = {
  productValidationSchema,
};
