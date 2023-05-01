import { IUserModel, IUserDto } from 'types/interfaces/user';

function mapModelToDto(user: IUserModel): IUserDto {
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
        accessType: user.accessType,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}

export const userService = { mapModelToDto };
