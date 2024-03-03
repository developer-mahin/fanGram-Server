import { NextFunction, Request, Response, Router } from 'express';
import { CelebrityController } from './celebrity.controller';
import { imageUpload } from '../../middlewares/uploadImage';
import { recentlyVisitMiddleware } from '../../middlewares/recentlyViewed';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
// import validateRequest from '../../middlewares/valdateRequest';
// import { auth } from '../../middlewares/auth';
// import { USER_ROLE } from '../../constant';

const router = Router();

router.post(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  // validateRequest(productValidation.productValidationSchema),
  imageUpload.fields([
    { name: 'images', maxCount: 1 },
    { name: 'videos', maxCount: 6 },
  ]),
  // imageUpload.single('images'),
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

router.patch(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  // validateRequest(productValidation.updateProductValidationSchema),
  imageUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  CelebrityController.updateCelebrity,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.user),
  CelebrityController.deleteCelebrity,
);

router.get(
  '/:id',
  // auth(USER_ROLE.user),
  // recentlyVisitMiddleware(),
  CelebrityController.getSingleCelebrity,
);

export const celebrityRoutes = router;
