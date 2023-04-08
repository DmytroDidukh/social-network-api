import { UserModel } from 'models/user';
import { IUser, IUserModel } from 'types/interfaces/user';

const getByEmail = async (email: string): Promise<IUserModel | null> => {
    if (!email) {
        // TODO: think about implementation of errors API
        throw new TypeError('you must pass the email');
    }

    return UserModel.findOne({
        email,
    }).lean();
};

const create = async (user: IUser): Promise<IUserModel> => {
    return new UserModel(user).save();
};

export const userRepository = { getByEmail, create };
