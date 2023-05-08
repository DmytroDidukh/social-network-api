import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import { authValidator } from 'middleware/validators/auth-validator';
import { authController } from 'controllers/auth';
import { validate } from 'middleware/validate';

const router = express.Router();

// SIGN-UP
router.post('/sign-up', authValidator.signUpSchema, validate, authController.signUp);

// SIGN-IN
router.post('/sign-in', authValidator.signInSchema, validate, authController.signIn);

// SIGN-OUT
router.post(
    '/sign-out',
    connectEnsureLogin.ensureLoggedIn('/v1/auth-error'),
    authController.signOut,
);

// TODO: reset password

export default router;
