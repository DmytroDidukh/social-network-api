import { Request, Response, NextFunction } from 'express';
import { userService } from 'services/user';
import { ApiAccessDeniedError, ApiNotFoundError } from 'api/error';
import { authService } from 'services/auth';
import { IUserModel } from 'types/interfaces';

async function bannedUserMiddleware(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUserModel;

    if (!user) {
        throw new ApiNotFoundError({ resourceName: 'user', resourceId: user._id.toString() });
    }

    const isBanned = userService.checkBanStatus(user.accessType);

    if (isBanned) {
        await authService.signOut(req);

        throw new ApiAccessDeniedError({ message: 'Current user is banned' });
    } else {
        next();
    }
}

export { bannedUserMiddleware };
