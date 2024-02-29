/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import catchAsync from '../utils/CatchAsync';
import RecentlyVisited from '../modules/recentlyViewed/recentlyViewed.model';
import AppError from '../utils/AppError';

export const recentlyVisitMiddleware = () => {
  return catchAsync(async (req, res, next) => {
    const celebrityId = req?.params?.id; // Extract product ID from route

    const objectId = new ObjectId(celebrityId); //mongoose.Types.ObjectId(celebrityId);

    try {
      const recentViewData = await RecentlyVisited.findOne({
        userId: req?.user?.userId,
      }); // User logged in?

      if (!recentViewData) {
        await RecentlyVisited.create({
          userId: req?.user?.userId,
          recentlyViewed: [
            {
              celebrityId: objectId,
              viewedAt: new Date(),
            },
          ],
        });
      }
      if (recentViewData) {
        const existingView = recentViewData?.recentlyViewed?.find(
          (p) => p?.celebrityId?.toString() === celebrityId,
        );

        if (!existingView) {
          // New product visit
          recentViewData.recentlyViewed.unshift({
            celebrityId: objectId,
            viewedAt: new Date(),
          });
          await recentViewData.save();
        } else {
          // Update existing visit timestamp
          existingView.viewedAt = new Date();
          await recentViewData.save();
        }
      }
    } catch (error: any) {
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }

    next(); // Allow request to proceed
  });
};
