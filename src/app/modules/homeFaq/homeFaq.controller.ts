import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { HomeFaqServices } from './homeFaq.service';

const createHomeFaq = catchAsync(async (req, res) => {
  const result = await HomeFaqServices.createHomeFaqInDB(
    // req.file,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Faq created successful',
    data: result,
  });
});

const deleteHomeFaq = catchAsync(async (req, res) => {
  const { id } = req.params;
  await HomeFaqServices.deleteHomeFaqFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faq successfully deleted',
  });
});

const getHomeFaqs = catchAsync(async (req, res) => {
  const result = await HomeFaqServices.getHomeFaqFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faqs retrieve successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const HomeFaqController = {
  createHomeFaq,
  deleteHomeFaq,
  getHomeFaqs,
};
