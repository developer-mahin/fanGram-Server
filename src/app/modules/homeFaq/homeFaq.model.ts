import { Schema, model } from 'mongoose';
import { TFaq } from '../celebrity/celebrity.interface';

const homeFaqSchema = new Schema<TFaq>(
  {
    question: { type: String, required: [true, 'Question required'] },
    answer: { type: String, required: [true, 'Answer required'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

homeFaqSchema.pre('find', async function (next) {
  this.find({
    $or: [{ isDeleted: { $ne: true } }],
  });
  next();
});

const HomeFaq = model<TFaq>('HomeFaqs', homeFaqSchema);
export default HomeFaq;
