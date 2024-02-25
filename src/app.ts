import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    // origin: 'https://profound-madeleine-be35a3.netlify.app',
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// routing
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the server',
  });
});

// not found middleware
app.use(notFound);
// Global Error Handler
app.use(globalErrorHandler);

export default app;
