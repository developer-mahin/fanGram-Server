import { Schema, model } from 'mongoose';
import { TOrderCelebrity } from './orderCelebrity.interface';

const orderCelebritySchema = new Schema<TOrderCelebrity>(
  {
    celebrity_id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Celebrity id is required'],
      unique: true,
      ref: 'User',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    booking_for: { type: String, required: [true, 'Name required'] },
    occasion: { type: String, required: [true, 'Occasion required'] },
    bill: { type: Number, required: [true, 'Booking price required'] },
    billing_no: { type: String, required: [true, 'Contact required'] },
    billing_email: { type: String, required: [true, 'Email required'] },
    script: { type: String, required: [true, 'Script required'] },
    payment_completed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

orderCelebritySchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDelete: { $ne: true } }],
  });
  next();
});

orderCelebritySchema.pre('findOne', async function (next) {
  this.findOne({ isDelete: { $ne: true } });
  next();
});

const OrderCelebrity = model<TOrderCelebrity>('Order', orderCelebritySchema);
export default OrderCelebrity;
