import { body } from 'express-validator';
import { USER_VALIDATION_ERROR_MESSAGES } from 'constants/error/messages';

const registrationSchema = [
    body('email').isEmail().withMessage(USER_VALIDATION_ERROR_MESSAGES.EMAIL),
    body('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/)
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.PASSWORD),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }

        return true;
    }),
    body('username')
        .notEmpty()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USERNAME_EMPTY)
        .bail()
        .isLength({ min: 2, max: 50 })
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USERNAME_INVALID),
];

export const userValidator = {
    registrationSchema,
};
