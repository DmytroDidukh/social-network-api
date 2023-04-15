import { Request } from 'express';
import { authService } from 'services/auth';
import { createController } from 'middleware/controller';
import { IUserDto } from 'types/interfaces/user';

const controller = createController();

async function signUp(req: Request): Promise<IUserDto> {
    return await authService.signUp(req.body);
}

export const authController = {
    signUp: controller(signUp),
};
