import express from 'express';

import authRouter from './auth/auth.route';
import usersRouter from './users/users.route';

const router = express.Router();

const ROUTES_PATH = {
    AUTH: '/auth',
    USERS: '/users',
};

router.use(ROUTES_PATH.AUTH, authRouter);
router.use(ROUTES_PATH.USERS, usersRouter);

export { ROUTES_PATH, router };
