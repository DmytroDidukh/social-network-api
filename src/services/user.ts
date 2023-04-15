import { IUserDocument, IUserDto } from 'types/interfaces/user';

function mapModelToDto(user: IUserDocument): IUserDto {
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
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}

export const userService = { mapModelToDto };
