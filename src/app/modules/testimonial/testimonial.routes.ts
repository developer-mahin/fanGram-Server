import { NextFunction, Request, Response, Router } from 'express';
import { imageUpload } from '../../middlewares/uploadImage';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { TestimonialController } from './testimonial.controller';

const router = Router();

router.post(
  '/',
  // auth(USER_ROLE.user),
  // validateRequest(productValidation.productValidationSchema),
  imageUpload.single('videos'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  TestimonialController.createTestimonial,
);

router.get(
  '/',
  // auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.admin),
  TestimonialController.getAllTestimonials,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.admin),
  TestimonialController.deleteTestimonial,
);

export const TestimonialRoutes = router;
