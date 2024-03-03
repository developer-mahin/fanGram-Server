import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { TestimonialServices } from './testimonial.service';

const createTestimonial = catchAsync(async (req, res) => {
  const result = await TestimonialServices.createTestimonialInDB(
    req.body,
    req.file,
  );

  console.log(req.file);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Testimonial created successful',
    data: result,
  });
});

const deleteTestimonial = catchAsync(async (req, res) => {
  const { id } = req.params;
  await TestimonialServices.deleteTestimonialFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Testimonial successfully deleted',
  });
});

const getAllTestimonials = catchAsync(async (req, res) => {
  const result = await TestimonialServices.getAllTestimonialFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All Testimonials retrieve successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const TestimonialController = {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
};
