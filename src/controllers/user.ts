import { Request } from 'express';

import { createController } from 'middleware/controller';
import { IUserDto, IUserModel } from 'types/interfaces/user';
import { userService } from 'services/user';

const controller = createController();

function userProfile(req: Request): IUserDto {
    const user = req.user as IUserModel;

    return userService.mapModelToDto(user);
}

export const userController = {
    me: controller(userProfile),
};
