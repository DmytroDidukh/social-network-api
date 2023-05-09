import { IUpdateUserDto, IUserDto, IUserModel } from 'types/interfaces/user';
import { userRepository } from 'repositories/user';
import { ApiAccessDeniedError, ApiNotFoundError } from 'api/error';
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

async function update(
    currentUserId: string,
    targetUserId: string,
    data: IUpdateUserDto,
): Promise<IUserDto> {
    const user = await userRepository.getById(targetUserId);

    if (!user) {
        throw new ApiNotFoundError({ resourceId: targetUserId, resourceName: 'user' });
    }

    const userId = this.getIdFromModel(user);
    if (currentUserId !== userId) {
        throw new ApiAccessDeniedError({ message: 'User can update only own data' });
    }

    const updatedUser = await userRepository.update(targetUserId, data);

    return this.mapModelToDto(updatedUser);
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

function getIdFromModel(user: IUserModel): string {
    if (!user) {
        throw TypeError('You must pass a user');
    }

    return user._id.toString();
}

export const userService = {
    mapModelToDto,
    update,
    updateAccessType,
    checkBanStatus: checkBannedAccessType,
    getIdFromModel,
};
