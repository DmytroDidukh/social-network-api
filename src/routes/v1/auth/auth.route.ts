import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import { userValidator } from 'middleware/validators/user-validator';
import { authController } from 'controllers/auth';
import { validate } from 'middleware/validate';

const router = express.Router();

// SIGN-UP
router.post('/sign-up', userValidator.signUpSchema, validate, authController.signUp);

// SIGN-IN
router.post('/sign-in', userValidator.signInSchema, validate, authController.signIn);

// SIGN-OUT
router.post(
    '/sign-out',
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    authController.signOut,
);

export default router;
