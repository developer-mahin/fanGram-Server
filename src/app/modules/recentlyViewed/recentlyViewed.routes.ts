/* eslint-disable no-undef */
import { Router } from 'express';
import { recentlyViewedController } from './recentlyViewed.controller';
import { USER_ROLE } from '../../constant';
import { auth } from '../../middlewares/auth';

const router = Router();

router.get(
  '/:id',
  auth(USER_ROLE.user),
  recentlyViewedController.getRecentlyViewed,
);

export const recentlyVisitedRoutes = router;
