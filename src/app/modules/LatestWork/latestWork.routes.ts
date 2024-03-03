/* eslint-disable no-undef */
import { NextFunction, Request, Response, Router } from 'express';
import { imageUpload } from '../../middlewares/uploadImage';
import { LatestWorkController } from './latestWork.controller';

const router = Router();

router.post(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  imageUpload.single('videos'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  //   validateRequest(LatestWorkValidation.createLatestWorkValidation),
  LatestWorkController.createLatestWork,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  LatestWorkController.getLatestWork,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  LatestWorkController.deleteLatestWork,
);

export const LatestWorkRoutes = router;
