import { Types } from 'mongoose';

interface IUserBase {
    username: string;
    email: string;
    profilePicture?: string;
    coverPicture?: string;
    followers?: string[];
    followings?: string[];
    isAdmin?: boolean;
}

interface IUser extends IUserBase {
    passwordHash: string;
}

interface IUserModel extends IUser {
    _id: Types.ObjectId;
}

interface IUserDto extends IUserBase {
    id: string;
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

export { IUser, IUserModel, IUserDto, ISignUpUserDto, ISingInUserDto };
