import bcrypt from 'bcrypt';
import { ApiConflictError, ApiSignInCredentialsError } from 'api/error';
import { userRepository } from 'repositories/user';
import { userService } from 'services/user';
import { ISignUpUserDto, ISingInUserDto, IUserDto } from 'types/interfaces/user';

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
}

async function comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
}

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

    const passwordHash = await hashPassword(user.password);

    const newUser = await userRepository.create({
        username: user.username,
        email: user.email,
        passwordHash,
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

    const isPasswordMatch = await comparePasswords(user.password, existedUser.passwordHash);
    if (!isPasswordMatch) {
        throw new ApiSignInCredentialsError();
    }

    return userService.mapModelToDto(existedUser);
}

export const authService = { signUp, signIn };
