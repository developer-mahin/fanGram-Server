import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { celebrityRoutes } from '../modules/celebrity/celebrity.routes';
import { orderCelebrityRoutes } from '../modules/orderCeleb/orderCelebrity.routes';
import { couponRoutes } from '../modules/coupon/coupon.routes';
import { bannerImageRoutes } from '../modules/bannerImg/bannerImg.routes';
import { recentlyVisitedRoutes } from '../modules/recentlyViewed/recentlyViewed.routes';
import { LatestWorkRoutes } from '../modules/LatestWork/latestWork.routes';
import { homeFaqRoutes } from '../modules/homeFaq/homeFaq.routes';

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
    path: '/latestWork',
    routes: LatestWorkRoutes,
  },

  {
    path: '/recently-visited',
    routes: recentlyVisitedRoutes,
  },
  {
    path: '/home-faq',
    routes: homeFaqRoutes,
  },
];

userRouter.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
