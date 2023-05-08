import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import { userController } from 'controllers/user';
import { userValidator } from 'middleware/validators/user-validator';
import { validate } from 'middleware/validate';

const router = express.Router();

router.get('/me', connectEnsureLogin.ensureLoggedIn('/v1/auth-error'), userController.me);

router.put(
    '/access-type/:id',
    userValidator.updateAccessTypeSchema,
    validate,
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    userController.updateAccessType,
);

export default router;
