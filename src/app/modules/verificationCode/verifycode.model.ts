import { Schema, model } from 'mongoose';

export type TVerify = {
  email: string;
  code: number;
};

const verifyCouponSchema = new Schema<TVerify>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      unique: true,
    },
    code: {
      type: Number,
      required: [true, 'Code is required'],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const VerifyCoupon = model<TVerify>('VerifyCoupon', verifyCouponSchema);
export default VerifyCoupon;
