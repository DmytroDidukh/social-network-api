import { Request, Response, NextFunction } from 'express';
import { USER_ACCESS_TYPES } from 'constants/user';
import { ApiAccessDeniedError, ApiNotFoundError } from 'api/error';
import { userRepository } from 'repositories/user';
import { IUserModel } from 'types/interfaces';

async function checkPermissionToUpdateAccessType(req: Request, res: Response, next: NextFunction) {
    const currentUser = req.user as IUserModel;
    const targetUserId: string = req.params.id;

    const targetUser = await userRepository.getById(targetUserId);

    if (!targetUser) {
        throw new ApiNotFoundError({ resourceId: targetUserId, resourceName: 'user' });
    }

    const targetUserAccessType = targetUser.accessType;
    if (
        (currentUser.accessType === USER_ACCESS_TYPES.SUPER_ADMIN ||
            currentUser.accessType === USER_ACCESS_TYPES.ADMIN) &&
        targetUserAccessType !== USER_ACCESS_TYPES.SUPER_ADMIN
    ) {
        next();
    } else if (
        currentUser.accessType === USER_ACCESS_TYPES.SUPER_ADMIN &&
        targetUserAccessType === USER_ACCESS_TYPES.ADMIN
    ) {
        next();
    } else {
        throw new ApiAccessDeniedError({
            message: 'You do not have permission to update the user access type',
        });
    }
}

export { checkPermissionToUpdateAccessType };
