import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    product_name: {
      type: String,
      required: [true, 'Product name is required'],
      unique: true,
    },
    product_image: {
      type: String,
      required: [true, 'product_image is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    release_date: {
      type: String,
      required: [true, 'Release date is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
    },
    operating_system: {
      type: String,
      required: [true, 'Operating system is required'],
    },
    storage_capacity: {
      type: String,
      required: [true, 'Storage capacity is required'],
    },
    screen_size: {
      type: String,
      required: [true, 'Screen size is required'],
    },
    battery_type: {
      type: String,
      required: [true, 'battery_type is required'],
    },
    colors: {
      type: String,
      required: [true, 'colors is required'],
    },
    display_resolution: {
      type: String,
      required: [true, 'display_resolution is required'],
    },
    material: {
      type: String,
      required: [true, 'material is required'],
    },
    network: {
      type: String,
      required: [true, 'network is required'],
    },
    manager: {
      type: Schema.Types.ObjectId,
      required: [true, 'manager field is required'],
      ref: 'Manager',
    },
    ram: {
      type: String,
      required: [true, 'ram is required'],
    },
    camera_quality: {
      type: String,
      required: [true, 'Camera quality is required'],
    },
    battery_life: {
      type: String,
      required: [true, 'Battery life is required'],
    },
    status: {
      type: String,
      enum: ['in-stock', 'out-of-stock'],
      default: 'in-stock',
    },
    isDelete: {
      type: Boolean,
      required: [true, 'isDelete is required'],
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDelete: { $ne: true } }, { status: { $eq: "'in-stock'" } }],
  });
  next();
});

productSchema.pre('findOne', async function (next) {
  this.findOne({ isDelete: { $ne: true } });
  next();
});

const Product = model('Product', productSchema);
export default Product;
