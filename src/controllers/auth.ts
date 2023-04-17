import { Request } from 'express';

import { authService } from 'services/auth';
import { createController } from 'middleware/controller';
import { IUserDto } from 'types/interfaces/user';

const controller = createController();

function signUp(req: Request): Promise<IUserDto> {
    return authService.signUp(req.body);
}

function signIn(req: Request): Promise<IUserDto> {
    console.log(req.session.user);
    return authService.signIn(req.body);
}

export const authController = {
    signUp: controller(signUp),
    signIn: controller(signIn),
};
