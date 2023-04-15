import { IUserDocument, IUserDto } from 'types/interfaces/user';

function mapModelToDto(user: IUserDocument): IUserDto {
    return {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        description: user.description,
        city: user.city,
        hometown: user.hometown,
        birthDate: user.birthDate,
        relationships: user.relationships,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        followers: user.followers,
        followings: user.followings,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}

export const userService = { mapModelToDto };
