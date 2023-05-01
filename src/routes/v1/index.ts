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

router.get('/loginerror', (req, res) => {
    console.log('ERROR LOGIN');
    res.status(418).send({
        message: "I'm a teapot",
        error: 'You must be logged in to access this page',
    });
});

router.get('/error', (req, res) => {
    console.log('ERROR LOGIN');
    console.log(req.user);
    res.status(418).send({
        message: "I'm a teapot",
        error: 'You must be logged in to access this page',
    });
});

export { ROUTES_PATH, router };
