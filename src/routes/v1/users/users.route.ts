import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import { userController } from 'controllers/user';
import { userValidator } from 'middleware/validators/user-validator';
import {
    checkPermissionToUpdateAccessType,
    bannedUserMiddleware,
    validate,
} from 'middleware/index';
import { registerRoute } from 'utils/route';
import { HTTP_METHODS } from 'constants/common';

const router = express.Router();

// MY PROFILE
registerRoute(
    router,
    HTTP_METHODS.GET,
    '/me',
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    bannedUserMiddleware,
    userController.me,
);

// UPDATE ACCESS TYPE
// TODO: Handle yourself access type updates
registerRoute(
    router,
    HTTP_METHODS.PUT,
    '/access-type/:id',
    ...userValidator.updateAccessTypeSchema,
    validate,
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    checkPermissionToUpdateAccessType,
    userController.updateAccessType,
);

export default router;
