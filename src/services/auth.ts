import { Request } from 'express';
import { ApiConflictError, ApiError, ApiSignInCredentialsError } from 'api/error';
import { userRepository } from 'repositories/user';
import { userService } from 'services/user';
import { ISignUpUserDto, ISingInUserDto, IUserDto } from 'types/interfaces/user';
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

    // TODO: Fix cookies (not set)
    req.login(newUser, (err) => {
        if (err) {
            throw new ApiError();
        }
    });

    return userService.mapModelToDto(newUser);
}

async function signIn(user: ISingInUserDto): Promise<IUserDto> {
    const existedUser = await userRepository.getByAny({
        email: user.emailOrUsername,
        username: user.emailOrUsername,
    });

    if (!existedUser) {
        throw new ApiSignInCredentialsError();
    }

    const isPasswordMatch = await passwordService.comparePasswords(user.password, existedUser.hash);
    if (!isPasswordMatch) {
        throw new ApiSignInCredentialsError();
    }

    return userService.mapModelToDto(existedUser);
}

export const authService = { signUp, signIn };
