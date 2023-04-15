import { UserModel } from 'models/user';
import { ISignUpUserDto, IUser, IUserModel } from 'types/interfaces/user';

async function getByEmail(email: string): Promise<IUserModel | null> {
    if (!email) {
        // TODO: think about implementation of errors API
        throw new TypeError('you must pass the email');
    }

    return UserModel.findOne({
        email,
    }).lean();
}

async function getByAny(user: Partial<ISignUpUserDto>): Promise<IUserModel | null> {
    if (!user) {
        // TODO: think about implementation of errors API
        throw new TypeError('you must pass the user');
    }

    return UserModel.findOne({
        $or: [{ email: user.email }, { username: user.username }],
    }).lean();
}

async function create(user: IUser): Promise<IUserModel> {
    return new UserModel(user).save();
}

export const userRepository = { getByEmail, getByAny, create };
