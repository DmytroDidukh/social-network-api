import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { authService } from 'services/auth';
import { createController } from 'middleware/controller';
import { IUserDto, IUserModel } from 'types/interfaces/user';
import { userService } from 'services/user';
import { ApiSignInCredentialsError } from 'api/error';

const controller = createController();

function signUp(req: Request): Promise<IUserDto> {
    return authService.signUp(req);
}

async function signIn(req: Request, res: Response, next: NextFunction) {
    // TODO: Move to service
    return await new Promise((resolve, reject) => {
        passport.authenticate('local', (err: ApiSignInCredentialsError, user: IUserModel) => {
            if (err || !user) {
                reject(err);
            }

            req.login(user, (err) => {
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
