import { Schema, model } from 'mongoose';
import { TCoupon } from './coupon.interface';

const couponSchema = new Schema<TCoupon>(
  {
    couponCode: { type: String, required: [true, 'Coupon Code required'] },
    discount: { type: Number, required: [true, 'Discount required'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

couponSchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDeleted: { $ne: true } }],
  });
  next();
});

const Coupon = model<TCoupon>('Coupons', couponSchema);
export default Coupon;
