import { Schema, model } from 'mongoose';
import {
  TAddonCost,
  TCelebrity,
  TFaq,
  TOffer,
  TVideoUrl,
} from './celebrity.interface';

const addonCostSchema = new Schema<TAddonCost>({
  remove_logo: { type: Number },
  hd_video: { type: Number },
  effect: { type: Number },
  dmDiscount: { type: Number },
});

const offersSchema = new Schema<TOffer>({
  discount: { type: Number },
  couponCode: { type: String },
});

const faqSchema = new Schema<TFaq>({
  question: { type: String },
  answer: { type: String },
});
const videoUrlSchema = new Schema<TVideoUrl>({
  name: { type: String },
  path: { type: String },
});

const celebritySchema = new Schema<TCelebrity>(
  {
    celebrityName: {
      type: String,
      required: [true, 'Celebrity name required'],
    },
    bookingPrice: { type: Number, required: [true, 'Booking price required'] },
    meetingPrice: { type: Number, required: [true, 'Meeting price required'] },
    addonCost: addonCostSchema,
    offers: offersSchema,
    featured: { type: Boolean, default: false },
    faq: [faqSchema],
    responseIn: {
      type: String,
      required: [true, 'Response Time is required'],
    },
    imgUrl: { type: String, required: [true, 'Image URL required'] },
    videoUrl: [videoUrlSchema],
    earlyResponse: { type: Boolean, default: false },
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
    $or: [{ isDeleted: { $ne: true } }],
  });
  next();
});

celebritySchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

const Celebrity = model<TCelebrity>('Celebrity', celebritySchema);
export default Celebrity;
