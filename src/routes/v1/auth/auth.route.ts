import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import { authValidator } from 'middleware/validators/auth-validator';
import { authController } from 'controllers/auth';
import { validate, bannedUserMiddleware } from 'middleware/index';
import { registerRoute } from 'utils/route';
import { HTTP_METHODS } from 'constants/common';

const router = express.Router();

// SIGN-UP
registerRoute(
    router,
    HTTP_METHODS.POST,
    '/sign-up',
    ...authValidator.signUpSchema,
    validate,
    authController.signUp,
);

// SIGN-IN
registerRoute(
    router,
    HTTP_METHODS.POST,
    '/sign-in',
    ...authValidator.signInSchema,
    validate,
    bannedUserMiddleware,
    authController.signIn,
);

// SIGN-OUT
registerRoute(
    router,
    HTTP_METHODS.POST,
    '/sign-out',
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    bannedUserMiddleware,
    authController.signOut,
);

// TODO: reset password route

export default router;
