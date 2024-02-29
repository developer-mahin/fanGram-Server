import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import RecentlyVisited from './recentlyViewed.model';
import { TRecentlyViewed } from './recentlyViewed.interface';
import AppError from '../../utils/AppError';

const getRecentlyViewed = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;

  const recentlyViewedData: TRecentlyViewed | null =
    await RecentlyVisited.findOne({
      userId,
    }).populate('recentlyViewed.celebrityId');
  if (!recentlyViewedData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recently viewed data not found');
  }

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Recently viewed data retrieved successfully',
    data: recentlyViewedData.recentlyViewed,
  });
});

export const recentlyViewedController = {
  getRecentlyViewed,
};
