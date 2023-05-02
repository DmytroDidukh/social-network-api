import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { authService } from 'services/auth';
import { createController } from 'middleware/controller';
import { IUserDto, IUserModel } from 'types/interfaces/user';
import { userService } from 'services/user';
import { ApiSignInCredentialsError } from 'api/error';

const controller = createController();

function signUp(req: Request): Promise<IUserDto> {
    return authService.signUp(req.body);
}

async function signIn(req: Request, res: Response, next: NextFunction) {
    return await new Promise((resolve, reject) => {
        passport.authenticate('local', (err: ApiSignInCredentialsError, user: IUserModel) => {
            if (err || !user) {
                reject(err);
            }

            req.logIn(user, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(userService.mapModelToDto(user));
            });
        })(req, res, next);
    });
}

export const authController = {
    signUp: controller(signUp),
    signIn: controller(signIn),
};
