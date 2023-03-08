import express from 'express';

import usersRouter from './users/users.route';

const router = express.Router();

const ROUTES_PATH = {
    USERS: '/users',
};

router.use(ROUTES_PATH.USERS, usersRouter);

export { ROUTES_PATH, router };
