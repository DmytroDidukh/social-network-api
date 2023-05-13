import { Types } from 'mongoose';
import { USER_ACCESS_TYPES, USER_RELATIONSHIPS } from 'constants/user';

interface IUserShared {
    username: string;
    email: string;
}

interface IUserBase extends IUserShared {
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
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserDto extends IUserBase {
    id: string;
    createdAt: string;
    updatedAt: string;
}

interface ISignUpUserDto extends IUserShared {
    password: string;
    passwordConfirmation: string;
}

// TODO: add "email" and "username"
interface IUpdateUserDto
    extends Pick<
        IUserDto,
        | 'description'
        | 'city'
        | 'hometown'
        | 'relationships'
        | 'birthDate'
        | 'profilePicture'
        | 'coverPicture'
    > {}

export { IUserModel, IUserDto, ISignUpUserDto, IUpdateUserDto };
