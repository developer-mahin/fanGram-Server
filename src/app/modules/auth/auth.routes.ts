import { Router } from 'express';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { authControllers } from './auth.controller';
import { userController } from '../user/user.controller';
import { UserValidation } from '../user/user.validation';

const router = Router();

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin),
  validateRequest(UserValidation.userValidationSchema),
  userController.createAdmin,
);

router.post(
  '/register-user',
  validateRequest(UserValidation.userValidationSchema),
  userController.registerUser,
);

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

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  authControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  authControllers.resetPassword,
);

router.post('/verify-email', userController.updateUserAfterEmailVerify);

router.get(
  '/profile',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  authControllers.getMyProfile,
);

export const authRoutes = router;
