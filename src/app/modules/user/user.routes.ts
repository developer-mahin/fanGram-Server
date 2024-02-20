import { Router } from 'express';
import { USER_ROLE } from '../../constant';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/valdateRequest';
import { managerValidationSchema } from '../Manager/manager.validation';
import { sellerValidationSchema } from '../Seller/seller.validation';
import { userController } from './user.controller';

const router = Router();

router.post(
  '/create-manager',
  auth(USER_ROLE.superAdmin),
  validateRequest(managerValidationSchema.createManagerSchema),
  userController.createManager,
);

router.post(
  '/create-seller',
  auth(USER_ROLE.superAdmin),
  validateRequest(sellerValidationSchema.createSellerSchema),
  userController.createSeller,
);

export const userRoutes = router;
