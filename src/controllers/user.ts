import { Request } from 'express';
import { createController } from 'middleware/controller';
import { userService } from 'services/user';
import { IUpdateUserDto, IUserDto, IUserModel } from 'types/interfaces/user';

const controller = createController();

function myProfile(req: Request): IUserDto {
    const user = req.user as IUserModel;

    return userService.mapModelToDto(user);
}

function update(req: Request): Promise<IUserDto> {
    const currentUserId = userService.getIdFromModel(req.user as IUserModel);
    const targetUserId = req.params.id as string;
    const data = req.body as IUpdateUserDto;

    return userService.update(currentUserId, targetUserId, data);
}

function updateAccessType(req: Request): Promise<IUserDto> {
    const userId = req.params.id as string;
    const { accessType } = req.body;

    return userService.updateAccessType(userId, accessType);
}

export const userController = {
    me: controller(myProfile),
    update: controller(update),
    updateAccessType: controller(updateAccessType),
};
