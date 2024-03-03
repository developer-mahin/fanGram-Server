/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TTestimonial } from './testimonial.interface';
import Testimonial from './testimonial.modal';

const createTestimonialInDB = async (payload: TTestimonial, file: any) => {
  const videoUrl = file.filename;
  const result = await Testimonial.create({ ...payload, videoUrl });
  return result;
};

const getAllTestimonialFromDB = async (query: Record<string, unknown>) => {
  const celebsQuery = new QueryBuilder(Testimonial.find(), query)
    .fields()
    .filter()
    .sort();

  const result = await celebsQuery.modelQuery;
  const meta = await celebsQuery.countTotal();

  return {
    meta,
    result,
  };
};

const deleteTestimonialFromDB = async (id: string) => {
  const testimonial = await Testimonial.findById(id);

  console.log(testimonial);

  if (!testimonial) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Testimonial not available');
  }

  if (testimonial.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image not available');
  }
  const result = await Testimonial.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { runValidators: true },
  );
  return result;
};

export const TestimonialServices = {
  createTestimonialInDB,
  getAllTestimonialFromDB,
  deleteTestimonialFromDB,
};
