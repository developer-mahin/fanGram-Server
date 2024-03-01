import { Schema, model } from 'mongoose';
import { TLatestWork } from './latestWork.interface';

const latestWorkSchema = new Schema<TLatestWork>(
  {
    path: { type: String, required: [true, 'Video required'] },
    des: { type: String, required: [true, 'Des required'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

latestWorkSchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDeleted: { $ne: true } }],
  });
  next();
});

const LatestWork = model<TLatestWork>('LatestWork', latestWorkSchema);
export default LatestWork;
