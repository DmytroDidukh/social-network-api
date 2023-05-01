import { Types } from 'mongoose';
import { USER_ACCESS_TYPES, USER_RELATIONSHIPS } from 'constants/user';

interface IUserBase {
    username: string;
    email: string;
    description?: string;
    city?: string;
    hometown?: string;
    relationships?: USER_RELATIONSHIPS | null;
    birthDate?: string;
    profilePicture?: string;
    coverPicture?: string;
    followers?: string[];
    followings?: string[];
    accessType?: USER_ACCESS_TYPES;
}

interface IUserModel extends IUserBase {
    _id: Types.ObjectId;
    salt: string;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserDto extends IUserBase {
    id: string;
    createdAt: string;
    updatedAt: string;
}

interface ISignUpUserDto extends IUserBase {
    password: string;
    passwordConfirmation: string;
}

interface ISingInUserDto {
    emailOrUsername: string;
    password: string;
}

export { IUserModel, IUserDto, ISignUpUserDto, ISingInUserDto };
