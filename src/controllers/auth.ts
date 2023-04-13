import { Request, Response } from 'express';

import { authService } from 'services/auth';
import { createController } from 'middleware/controller';

const controller = createController();

async function signUp(req: Request, res: Response): Promise<void> {
    const newUser = await authService.signUp(req.body);

    res.send(newUser);
}

export const authController = {
    signUp: controller(signUp),
};
