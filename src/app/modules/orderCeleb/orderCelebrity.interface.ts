import { Types } from 'mongoose';

export type TOrderCelebrity = {
  celebrityId: Types.ObjectId;
  userId?: Types.ObjectId;
  bookingFor: string;
  occasion: string;
  bill: number;
  billingNo: string;
  billingEmail: string;
  script: string;
  paymentVerificationImg?: string;
  status: 'none' | 'approved' | 'processing' | 'delivered';
  isDeleted: boolean;
};
