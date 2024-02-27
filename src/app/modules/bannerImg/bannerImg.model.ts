import { Schema, model } from 'mongoose';
import { TBannerImage } from './bannerImg.interface';

const bannerImageSchema = new Schema<TBannerImage>(
  {
    path: { type: String, required: [true, 'Image required'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

bannerImageSchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDeleted: { $ne: true } }],
  });
  next();
});

const BannerImage = model<TBannerImage>('BannerImages', bannerImageSchema);
export default BannerImage;
