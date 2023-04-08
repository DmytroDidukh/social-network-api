import { IUserModel, IUserDto } from 'types/interfaces/user';

const mapModelToDto = (user: IUserModel): IUserDto => {
    if (!user) {
        throw new TypeError('you must pass a user!');
    }

    return {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        followers: user.followers,
        followings: user.followings,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        isAdmin: user.isAdmin,
    };
};

export const userService = { mapModelToDto };
