import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { BannerImageServices } from './bannerImg.service';

const createBannerImage = catchAsync(async (req, res) => {
  const result = await BannerImageServices.createBannerImageInDB(
    // req.file,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Image created successful',
    data: result,
  });
});

const deleteBannerImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BannerImageServices.deleteBannerImageFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Banner Image successfully deleted',
  });
});

const getBannerImage = catchAsync(async (req, res) => {
  const result = await BannerImageServices.getAllBannerImageFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All Images retrieve successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const BannerImageController = {
  createBannerImage,
  deleteBannerImage,
  getBannerImage,
};
