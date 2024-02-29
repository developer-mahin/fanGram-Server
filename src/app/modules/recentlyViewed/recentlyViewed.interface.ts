import { Types } from 'mongoose';

export type TRecentlyVisitedData = {
  celebrityId?: Types.ObjectId;
  viewedAt?: Date;
};

export type TRecentlyViewed = {
  userId: Types.ObjectId;
  recentlyViewed: TRecentlyVisitedData[];
};
