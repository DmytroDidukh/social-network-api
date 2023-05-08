import { Request } from 'express';
import { createController } from 'middleware/controller';
import { userService } from 'services/user';
import { IUserDto, IUserModel } from 'types/interfaces/user';

const controller = createController();

function myProfile(req: Request): IUserDto {
    const user = req.user as IUserModel;

    return userService.mapModelToDto(user);
}

function updateAccessType(req: Request): Promise<IUserDto> {
    const userId = req.params.id as string;
    const { accessType } = req.body;

    return userService.updateAccessType(userId, accessType);
}

export const userController = {
    me: controller(myProfile),
    updateAccessType: controller(updateAccessType),
};
