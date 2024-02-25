import { Types } from 'mongoose';

export type TOrderCelebrity = {
  celebrity_id: Types.ObjectId;
  user_id: Types.ObjectId;
  booking_for: string;
  occasion: string;
  bill: number;
  billing_no: string;
  billing_email: string;
  script: string;
  payment_completed: boolean;
  isDeleted: boolean;
};
