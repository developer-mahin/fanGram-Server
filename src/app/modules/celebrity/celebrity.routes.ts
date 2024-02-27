import { NextFunction, Request, Response, Router } from 'express';
import { CelebrityController } from './celebrity.controller';
import { imageUpload } from '../../middlewares/uploadImage';
// import validateRequest from '../../middlewares/valdateRequest';
// import { auth } from '../../middlewares/auth';
// import { USER_ROLE } from '../../constant';

const router = Router();

router.post(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  // validateRequest(productValidation.productValidationSchema),
  imageUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  CelebrityController.createCelebrity,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  CelebrityController.getAllCelebrities,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  CelebrityController.deleteCelebrity,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  // validateRequest(productValidation.updateProductValidationSchema),
  CelebrityController.updateCelebrity,
);

router.get(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  CelebrityController.getSingleCelebrity,
);

export const celebrityRoutes = router;
