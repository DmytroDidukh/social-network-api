import { ApiConflictError, ApiSignInCredentialsError } from 'api/error';
import { userRepository } from 'repositories/user';
import { userService } from 'services/user';
import { ISignUpUserDto, ISingInUserDto, IUserDto } from 'types/interfaces/user';
import { passwordService } from 'services/password';

async function signUp(user: ISignUpUserDto): Promise<IUserDto> {
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

    const newUser = await userRepository.create({ ...user, hash: passwordHash, salt });

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
