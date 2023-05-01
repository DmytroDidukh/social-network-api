import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { authService } from 'services/auth';
import { createController } from 'middleware/controller';
import { IUserDto } from 'types/interfaces/user';
import { responseService } from 'services/response';

const controller = createController();

function signUp(req: Request): Promise<IUserDto> {
    return authService.signUp(req.body);
}

function signIn(error, req, res) {
    // handle error
    console.log('ERROR: ', error);
    return responseService.sendError(res, error);
}
function signIn2(req: Request, res: Response, next: NextFunction) {
    // return passport.authenticate('local', function (err, user, info) {
    //     if (err) {
    //         return err;
    //     }
    //     if (user) {
    //         //const token = user.generateJwt();
    //         return user;
    //     } else {
    //         return info;
    //     }
    // })(req, res, next);
    // const user = passport.authenticate(
    //     'local',
    //     {
    //         successRedirect: '/v1/users/me',
    //         // failureRedirect: '/v1/error',
    //     },
    //     (err, user, info) => {
    //         console.log('CALLBACK');
    //         console.log(user);
    //         console.log(err);
    //
    //         return user;
    //     },
    // )(req, res, next);
    //
    // return user;

    // console.log('USER@: ', user);
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Authentication successful' });
        });
    })(req, res, next);
}

export const authController = {
    signUp: controller(signUp),
    signIn: controller(signIn),
    signIn2: signIn2,
};
