import express from 'express';
import { userValidator } from 'middleware/validators/user-validator';
import { authController } from 'controllers/auth';
import { validate } from 'middleware/validate';

const router = express.Router();

// SIGN-UP
router.post('/sign-up', userValidator.signUpSchema, validate, authController.signUp);

// SIGN-IN
router.post('/sign-in', userValidator.signInSchema, validate, authController.signIn);

export default router;
