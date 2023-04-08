import bcrypt from 'bcrypt';

import { userRepository } from 'repositories/user';
import { userService } from 'services/user';

import { IRegisterUserDto, IUserDto } from 'types/interfaces/user';

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
}

// async function comparePasswords(password: string, passwordHash: string): Promise<boolean> {
//     return bcrypt.compare(password, passwordHash);
// }

async function signUp(user: IRegisterUserDto): Promise<IUserDto> {
    const existedUser = await userRepository.getByEmail(user.email);

    if (existedUser) {
        throw new Error('EXIST');
    }

    const passwordHash = await hashPassword(user.password);

    const newUser = await userRepository.create({
        username: user.username,
        email: user.email,
        passwordHash,
    });

    return userService.mapModelToDto(newUser);
}

export const authService = { signUp };
