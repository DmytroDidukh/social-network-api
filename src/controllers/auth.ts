import { Request } from 'express';

import { authService } from 'services/auth';
import { createController } from 'middleware/controller';
import { IUserDto } from 'types/interfaces/user';

const controller = createController();

async function signUp(req: Request): Promise<IUserDto> {
    return await authService.signUp(req.body);
}

async function signIn(req: Request): Promise<IUserDto> {
    console.log(req.session.user);
    return await authService.signIn(req.body);
}

export const authController = {
    signUp: controller(signUp),
    signIn: controller(signIn),
};
