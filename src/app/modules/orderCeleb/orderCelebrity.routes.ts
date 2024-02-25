import { Router } from 'express';
import { OrderCelebrityController } from './orderCelebrity.controller';
// import validateRequest from '../../middlewares/valdateRequest';
// import { auth } from '../../middlewares/auth';
// import { USER_ROLE } from '../../constant';

const router = Router();

router.post(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  // validateRequest(productValidation.productValidationSchema),
  OrderCelebrityController.createOrder,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  OrderCelebrityController.getAllOrders,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  OrderCelebrityController.deleteOrder,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  // validateRequest(productValidation.updateProductValidationSchema),
  OrderCelebrityController.updateOrder,
);

router.get(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  OrderCelebrityController.getSingleOrder,
);

export const orderCelebrityRoutes = router;
