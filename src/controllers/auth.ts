import { NextFunction, Request, Response } from 'express';
import { authService } from 'services/auth';
import { createController } from 'middleware/controller';
import { IUserDto } from 'types/interfaces/user';

const controller = createController();

function signUp(req: Request): Promise<IUserDto> {
    return authService.signUp(req);
}

async function signIn(req: Request, res: Response, next: NextFunction): Promise<IUserDto> {
    return authService.signIn(req, res, next);
}

export const authController = {
    signUp: controller(signUp),
    signIn: controller(signIn),
};
