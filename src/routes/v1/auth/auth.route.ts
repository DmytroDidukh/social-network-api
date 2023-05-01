import express from 'express';
import { userValidator } from 'middleware/validators/user-validator';
import { authController } from 'controllers/auth';
import { validate } from 'middleware/validate';
// import passport from 'passport';
// import { responseService } from 'services/response';

const router = express.Router();

// SIGN-UP
router.post('/sign-up', userValidator.signUpSchema, validate, authController.signUp);

// SIGN-IN
router.post(
    '/sign-in',
    userValidator.signInSchema,
    validate,
    // passport.authenticate('local', {
    //     successRedirect: '/v1/users/me',
    //     // failureRedirect: '/v1/error',
    // }),
    // function (error, req, res, next) {
    //     // handle error
    //     console.log('ERROR: ', error);
    //     return responseService.sendError(res, error);
    // },
    authController.signIn2,
    // function (req, res) {
    //     console.log(req.user);
    //     res.redirect('/v1/users/me');
    // },
);

export default router;
