import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import { userController } from 'controllers/user';

const router = express.Router();

router.get('/me', connectEnsureLogin.ensureLoggedIn('/v1/auth-error'), userController.me);

export default router;
