import { Schema, model } from 'mongoose';
import {
  TRecentlyViewed,
  TRecentlyVisitedData,
} from './recentlyViewed.interface';

const recentlyVisitedSchema = new Schema<TRecentlyVisitedData>({
  celebrityId: {
    type: Schema.Types.ObjectId,
    ref: 'Celebrity',
  },
  viewedAt: { type: Date },
});

const userSchema = new Schema<TRecentlyViewed>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recentlyViewed: [recentlyVisitedSchema],
});

const RecentlyVisited = model<TRecentlyViewed>('RecentlyVisited', userSchema);
export default RecentlyVisited;
