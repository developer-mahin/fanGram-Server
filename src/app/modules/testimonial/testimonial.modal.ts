import { Schema, model } from 'mongoose';
import { TTestimonial } from './testimonial.interface';

const testimonialSchema = new Schema<TTestimonial>(
  {
    videoUrl: {
      type: String,
      required: [true, 'video url is required'],
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    occasion: {
      type: String,
      required: [true, 'occasion is required'],
    },
    review: {
      type: String,
      required: [true, 'review is required'],
    },
    isDeleted: {
      type: Boolean,
      required: [true, 'review is required'],
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

testimonialSchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDeleted: { $ne: true } }],
  });
  next();
});

testimonialSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

const Testimonial = model<TTestimonial>('Testimonial', testimonialSchema);
export default Testimonial;
