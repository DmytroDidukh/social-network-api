import { body, ValidationChain } from 'express-validator';
import { USER_VALIDATION_ERROR_MESSAGES } from 'constants/error/messages';
import { createNotAllowedBodySchema } from 'middleware/validators/body-not-allowed';

const signUpSchema: ValidationChain[] = [
    body('email').isEmail().withMessage(USER_VALIDATION_ERROR_MESSAGES.EMAIL),
    body('username')
        .notEmpty()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USERNAME_EMPTY)
        .bail()
        .isLength({ min: 2, max: 50 })
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USERNAME_INVALID),
    body('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/)
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.PASSWORD),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }

        return true;
    }),
    ...createNotAllowedBodySchema(['email', 'username', 'password', 'passwordConfirmation']),
];

const signInSchema: ValidationChain[] = [
    body('emailOrUsername')
        .notEmpty()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USERNAME_OR_EMAIL_EMPTY),
    body('password').notEmpty().withMessage(USER_VALIDATION_ERROR_MESSAGES.PASSWORD_EMPTY),
    ...createNotAllowedBodySchema(['emailOrUsername', 'password']),
];

export const authValidator = {
    signUpSchema,
    signInSchema,
};
