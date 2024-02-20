import { Router } from 'express';
import validateRequest from '../../middlewares/valdateRequest';
import { productController } from './product.controller';
import { productValidation } from './product.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(productValidation.productValidationSchema),
  productController.createProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  productController.deleteProduct,
);

router.delete(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  productController.bulkDeleteProduct,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  validateRequest(productValidation.updateProductValidationSchema),
  productController.updateProduct,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  productController.getSingleProduct,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  productController.getAllProducts,
);

export const productRoutes = router;
