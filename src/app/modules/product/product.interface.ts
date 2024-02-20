import { Types } from 'mongoose';

export type TProduct = {
  product_name: string;
  price: number;
  quantity: number;
  manager: Types.ObjectId;
  release_date: string;
  colors: string;
  network: string;
  material: string;
  brand: string;
  display_resolution: string;
  model: string;
  operating_system: string;
  storage_capacity: string;
  ram: string;
  screen_size: string;
  camera_quality: string;
  battery_type: string;
  battery_life: string;
  isDelete: boolean;
  status: 'in-stock' | 'out-of-stock';
  product_image: string;
};

export type TUpdateRequest = {
  ids: string[];
};
