import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { CelebrityServices } from './celebrity.service';

const createCelebrity = catchAsync(async (req, res) => {
  console.log(req.files);
  const result = await CelebrityServices.createCelebrityInDB(
    req.files,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Celebrity created successful',
    data: result,
  });
});

const deleteCelebrity = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CelebrityServices.deleteCelebrityFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Celebrity successfully deleted',
  });
});

const updateCelebrity = catchAsync(async (req, res) => {
  const result = await CelebrityServices.updatedCelebrityInDB(
    req?.file,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Celebrity successfully Updated',
    data: result,
  });
});

const getAllCelebrities = catchAsync(async (req, res) => {
  const result = await CelebrityServices.getAllCelebrityFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All Celebrity retrieve successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCelebrity = catchAsync(async (req, res) => {
  const result = await CelebrityServices.getSingleCelebrityFromDB(
    req.params.id,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Celebrity retrieve successfully',
    data: result,
  });
});

export const CelebrityController = {
  createCelebrity,
  deleteCelebrity,
  updateCelebrity,
  getAllCelebrities,
  getSingleCelebrity,
};
