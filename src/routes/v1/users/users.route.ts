import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import { userController } from 'controllers/user';
import { userValidator } from 'middleware/validators/user-validator';
import {
    checkPermissionToUpdateUserAccessType,
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

// UPDATE USER
registerRoute(
    router,
    HTTP_METHODS.PUT,
    '/:id',
    ...userValidator.updateDataSchema,
    validate,
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    bannedUserMiddleware,
    userController.updateMe,
);

// DELETE USER
registerRoute(
    router,
    HTTP_METHODS.DELETE,
    '/:id',
    ...userValidator.deleteSchema,
    validate,
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    bannedUserMiddleware,
    userController.deleteMe,
);

// UPDATE ACCESS TYPE
registerRoute(
    router,
    HTTP_METHODS.PUT,
    '/access-type/:id',
    ...userValidator.updateAccessTypeSchema,
    validate,
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    checkPermissionToUpdateUserAccessType,
    userController.updateAccessType,
);

export default router;
