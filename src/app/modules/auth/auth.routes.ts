import { Router } from 'express';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/valdateRequest';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { authControllers } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  authControllers.changePassword,
);

router.get(
  '/profile',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  authControllers.getMyProfile,
);

export const authRoutes = router;
