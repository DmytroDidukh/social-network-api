import { Request } from 'express';
import { authService } from 'services/auth';
import { createController } from 'middleware/controller';
import { IUserDto } from 'types/interfaces/user';

const controller = createController();

async function signUp(req: Request): Promise<IUserDto> {
    return await authService.signUp(req.body);
}

async function signIn(req: Request): Promise<boolean> {
    console.log(req.body);
    return true;
}

export const authController = {
    signUp: controller(signUp),
    signIn: controller(signIn),
};
