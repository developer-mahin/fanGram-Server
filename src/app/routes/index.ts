import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';

const router = Router();

const userRouter = [

  {
    path: '/auth',
    routes: authRoutes,
  },
];

userRouter.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
