import express, { Response, Request } from 'express';
import authRouter from './auth/auth.route';
import usersRouter from './users/users.route';
import { responseService } from 'services/response';
import { ApiInvalidAuthenticationError } from 'api/error';

const router = express.Router();

const ROUTES_PATH = {
    AUTH: '/auth',
    USERS: '/users',
};

router.use(ROUTES_PATH.AUTH, authRouter);
router.use(ROUTES_PATH.USERS, usersRouter);

// TODO: Move it to error routes
router.get('/auth-error', (req: Request, res: Response) => {
    responseService.sendError(res, new ApiInvalidAuthenticationError());
});

export { ROUTES_PATH, router };
