import express from 'express';

import { userValidator } from 'middleware/validators/user-validator';

import { authController } from 'controllers/auth';
import { validate } from 'middleware/validate';

const router = express.Router();

// REGISTER
router.post('/sign-up', userValidator.registrationSchema, validate, authController.signUp);

export default router;
