import { UserModel } from 'models/user';
import { ISignUpUserDto, IUserModel } from 'types/interfaces/user';

async function getByEmail(email: string): Promise<IUserModel | null> {
    return UserModel.findOne({
        email,
    }).lean();
}

async function getById(id: string): Promise<IUserModel | null> {
    return UserModel.findById({
        _id: id,
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

async function updateOneField<T extends keyof Omit<IUserModel, '_id'>>(
    id: string,
    fieldName: T,
    fieldValue: IUserModel[T],
): Promise<IUserModel> {
    await UserModel.updateOne({ _id: id }, { [fieldName]: fieldValue });

    return this.getById(id);
}

export const userRepository = {
    getByEmail,
    getById,
    getByAny,
    create,
    updateOneField,
};
