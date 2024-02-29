import { NextFunction, Request, Response, Router } from 'express';
import { OrderCelebrityController } from './orderCelebrity.controller';
import { imageUpload } from '../../middlewares/uploadImage';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
// import validateRequest from '../../middlewares/valdateRequest';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  // validateRequest(productValidation.productValidationSchema),
  imageUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  OrderCelebrityController.createOrder,
);

router.get(
  '/',
  auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderCelebrityController.getAllOrders,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderCelebrityController.deleteOrder,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.admin),
  // validateRequest(productValidation.updateProductValidationSchema),
  OrderCelebrityController.updateOrder,
);

router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderCelebrityController.getSingleOrder,
);

export const orderCelebrityRoutes = router;
