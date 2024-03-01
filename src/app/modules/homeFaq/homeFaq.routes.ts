/* eslint-disable no-undef */
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { HomeFaqValidation } from './homeFaq.validation';
import { HomeFaqController } from './homeFaq.controller';

const router = Router();

router.post(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(HomeFaqValidation.createHomeFaqValidation),
  HomeFaqController.createHomeFaq,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  HomeFaqController.getHomeFaqs,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  HomeFaqController.deleteHomeFaq,
);

export const homeFaqRoutes = router;
