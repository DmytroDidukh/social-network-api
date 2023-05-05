import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import {
    ApiConflictError,
    ApiInvalidAuthenticationError,
    ApiSignInCredentialsError,
} from 'api/error';
import { userRepository } from 'repositories/user';
import { userService } from 'services/user';
import { ISignUpUserDto, IUserDto, IUserModel } from 'types/interfaces/user';
import { passwordService } from 'services/password';

async function signUp(req: Request): Promise<IUserDto> {
    const user: ISignUpUserDto = req.body;
    const existedUser = await userRepository.getByAny({
        email: user.email,
        username: user.username,
    });

    if (existedUser) {
        throw new ApiConflictError({
            resourceName: 'user',
            resourceId: user.email === existedUser.email ? user.email : user.username,
        });
    }

    const salt = await passwordService.getSalt();
    const passwordHash = await passwordService.hashPassword(user.password, salt);
    const newUser = await userRepository.create({
        username: user.username,
        email: user.email,
        hash: passwordHash,
        salt,
    });

    return await new Promise((resolve, reject) => {
        req.login(newUser, (err) => {
            if (err) {
                reject(new ApiInvalidAuthenticationError());
            }

            resolve(userService.mapModelToDto(newUser));
        });
    });
}

async function signIn(req: Request, res: Response, next: NextFunction): Promise<IUserDto> {
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

export const authService = { signUp, signIn };
