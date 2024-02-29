import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { celebrityRoutes } from '../modules/celebrity/celebrity.routes';
import { orderCelebrityRoutes } from '../modules/orderCeleb/orderCelebrity.routes';
import { couponRoutes } from '../modules/coupon/coupon.routes';
import { bannerImageRoutes } from '../modules/bannerImg/bannerImg.routes';
import { recentlyVisitedRoutes } from '../modules/recentlyViewed/recentlyViewed.routes';

const router = Router();

const userRouter = [
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/celebrity',
    routes: celebrityRoutes,
  },
  {
    path: '/orders',
    routes: orderCelebrityRoutes,
  },
  {
    path: '/coupons',
    routes: couponRoutes,
  },
  {
    path: '/banner-img',
    routes: bannerImageRoutes,
  },

  {
    path: '/recently-visited',
    routes: recentlyVisitedRoutes,
  },
];

userRouter.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
