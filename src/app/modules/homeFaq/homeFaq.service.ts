/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TFaq } from '../celebrity/celebrity.interface';
import HomeFaq from './homeFaq.model';

const createHomeFaqInDB = async (payload: TFaq) => {
  const result = await HomeFaq.create(payload);
  return result;
};

const getHomeFaqFromDB = async (query: Record<string, unknown>) => {
  const faqsQuery = new QueryBuilder(HomeFaq.find(), query)
    .fields()
    .filter()
    .sort();

  const result = await faqsQuery.modelQuery;
  const meta = await faqsQuery.countTotal();

  return {
    meta,
    result,
  };
};

const deleteHomeFaqFromDB = async (id: string) => {
  const faq = await HomeFaq.findById(id);
  if (!faq) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image available with this id');
  }

  if (faq.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Celebrity not available');
  }
  const result = await HomeFaq.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { runValidators: true },
  );
  return result;
};

export const HomeFaqServices = {
  createHomeFaqInDB,
  getHomeFaqFromDB,
  deleteHomeFaqFromDB,
};
