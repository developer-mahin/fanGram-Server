import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { LatestWorkServices } from './latestWork.service';

const createLatestWork = catchAsync(async (req, res) => {
  const result = await LatestWorkServices.createLatestWorkInDB(
    req.body,
    req.file,
  );

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Videos created successful',
    data: result,
  });
});

const deleteLatestWork = catchAsync(async (req, res) => {
  const { id } = req.params;
  await LatestWorkServices.deleteLatestWorkFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Latest work successfully deleted',
  });
});

const getLatestWork = catchAsync(async (req, res) => {
  const result = await LatestWorkServices.getAllLatestWorkFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All Images retrieve successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const LatestWorkController = {
  createLatestWork,
  deleteLatestWork,
  getLatestWork,
};
