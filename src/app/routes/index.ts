import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { celebrityRoutes } from '../modules/celebrity/celebrity.routes';
import { orderCelebrityRoutes } from '../modules/orderCeleb/orderCelebrity.routes';

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
];

userRouter.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
