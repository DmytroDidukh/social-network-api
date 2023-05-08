import { IUserDto, IUserModel } from 'types/interfaces/user';
import { userRepository } from 'repositories/user';
import { ApiNotFoundError } from 'api/error';
import { USER_ACCESS_TYPES } from 'constants/user';

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

async function updateAccessType(id: string, accessType: USER_ACCESS_TYPES): Promise<IUserDto> {
    const user = await userRepository.getById(id);

    if (!user) {
        throw new ApiNotFoundError({ resourceId: id, resourceName: 'user' });
    }

    const updatedUser = await userRepository.updateOneField(id, 'accessType', accessType);

    return this.mapModelToDto(updatedUser);
}

function checkBannedAccessType(accessType: USER_ACCESS_TYPES): boolean {
    return accessType === USER_ACCESS_TYPES.BANNED;
}

export const userService = {
    mapModelToDto,
    updateAccessType,
    checkBanStatus: checkBannedAccessType,
};
