import { UserModel } from 'models/user';
import { ISignUpUserDto, IUserModel } from 'types/interfaces/user';

async function getByEmail(email: string): Promise<IUserModel | null> {
    return UserModel.findOne({
        email,
    }).lean();
}

async function getByAny(user: Partial<ISignUpUserDto>): Promise<IUserModel | null> {
    return UserModel.findOne({
        $or: [{ email: user.email }, { username: user.username }],
    }).lean();
}

async function create(
    user: Omit<IUserModel, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<IUserModel> {
    return new UserModel(user).save();
}

export const userRepository = {
    getByEmail,
    getByAny,
    create,
};
