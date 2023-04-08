import express, { Request, Response } from 'express';

import { userValidator } from 'middleware/validators/user-validator';
import { validate } from 'middleware/validate';
import { authService } from 'services/auth';

const router = express.Router();

// REGISTER
router.post(
    '/sign-up',
    userValidator.registrationSchema,
    validate,
    async (req: Request, res: Response): Promise<void> => {
        const newUser = await authService.signUp(req.body);

        res.send(newUser);
    },
);

export default router;
