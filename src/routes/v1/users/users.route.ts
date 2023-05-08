import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import { userController } from 'controllers/user';
import { userValidator } from 'middleware/validators/user-validator';
import { validate } from 'middleware/validate';
import { checkPermissionToUpdateAccessType } from 'middleware/check-permission-to-update-access-type';
import { registerRoute } from 'utils/route';
import { HTTP_METHODS } from 'constants/common';

const router = express.Router();

// MY PROFILE
registerRoute(
    router,
    HTTP_METHODS.GET,
    '/me',
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    userController.me,
);

// UPDATE ACCESS TYPE
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
