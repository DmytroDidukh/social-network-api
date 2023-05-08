import { body, param, ValidationChain } from 'express-validator';
import { USER_VALIDATION_ERROR_MESSAGES } from 'constants/error/messages';
import { createNotAllowedBodySchema } from 'middleware/validators/body-not-allowed';
import { USER_ACCESS_TYPES } from 'constants/user';

const updateAccessTypeSchema: ValidationChain[] = [
    param('id').isMongoId().withMessage(USER_VALIDATION_ERROR_MESSAGES.USER_ID_INVALID),
    body('accessType')
        .notEmpty()
        .isIn(Object.values(USER_ACCESS_TYPES))
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.ACCESS_TYPE_INVALID),
    ...createNotAllowedBodySchema(['accessType']),
];

export const userValidator = {
    updateAccessTypeSchema,
};
