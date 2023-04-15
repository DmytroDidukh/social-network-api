import { Types } from 'mongoose';
import { USER_RELATIONSHIPS } from 'constants/user';

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
    isAdmin?: boolean;
}

interface IUserModel extends IUserBase {
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserDocument extends IUserModel {
    _id: Types.ObjectId;
}

interface IUserDto extends IUserBase {
    id: string;
    createdAt: string;
    updatedAt: string;
}

interface ISignUpUserDto
    extends Omit<
        IUserBase,
        'profilePicture' | 'coverPicture' | 'followers' | 'followings' | 'isAdmin'
    > {
    password: string;
    passwordConfirmation: string;
}

interface ISingInUserDto {
    emailOrUsername: string;
    password: string;
}

export { IUserModel, IUserDocument, IUserDto, ISignUpUserDto, ISingInUserDto };
