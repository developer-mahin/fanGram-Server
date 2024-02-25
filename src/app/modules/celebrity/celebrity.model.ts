import { Schema, model } from 'mongoose';
import { TCelebrity } from './celebrity.interface';

const celebritySchema = new Schema<TCelebrity>(
  {
    celebrity_name: {
      type: String,
      required: [true, 'Celebrity name required'],
    },
    booking_price: { type: Number, required: [true, 'Booking price required'] },
    meeting_price: { type: Number, required: [true, 'Meeting price required'] },
    early_response: {
      type: Boolean,
      default: false,
    },
    imgUrl: { type: String, required: [true, 'Image URL required'] },
    videoUrl: { type: String },
    verified: { type: Boolean, default: false },
    hashtag: { type: [String], required: [true, 'Hashtags required'] },
    rating: { type: Number, required: [true, 'Rating required'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

celebritySchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDelete: { $ne: true } }],
  });
  next();
});

celebritySchema.pre('findOne', async function (next) {
  this.findOne({ isDelete: { $ne: true } });
  next();
});

const Celebrity = model<TCelebrity>('Celebrity', celebritySchema);
export default Celebrity;
