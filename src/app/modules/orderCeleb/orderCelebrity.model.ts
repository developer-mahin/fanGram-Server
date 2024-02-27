import { Schema, model } from 'mongoose';
import { TOrderCelebrity } from './orderCelebrity.interface';

const orderCelebritySchema = new Schema<TOrderCelebrity>(
  {
    celebrityId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Celebrity id is required'],
      unique: true,
      ref: 'User',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    bookingFor: { type: String, required: [true, 'Name required'] },
    occasion: { type: String, required: [true, 'Occasion required'] },
    bill: { type: Number, required: [true, 'Booking price required'] },
    billingNo: { type: String, required: [true, 'Contact required'] },
    billingEmail: { type: String, required: [true, 'Email required'] },
    script: { type: String, required: [true, 'Script required'] },
    paymentCompleted: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

orderCelebritySchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDeleted: { $ne: true } }],
  });
  next();
});

orderCelebritySchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

const OrderCelebrity = model<TOrderCelebrity>('Order', orderCelebritySchema);
export default OrderCelebrity;
