import express, { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const router: Router = express.Router();

export function healthRoutes(): Router {
  router.get('/notification-health', (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).send('Notification service is healthy and OK.');
  });
  return router;
  // only the health routes wont be redirected thru the api gateway to the route
  // since it doesnt make sense to add jwt tokens for the same
}
