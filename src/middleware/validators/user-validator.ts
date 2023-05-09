import { body, param, ValidationChain } from 'express-validator';
import { USER_VALIDATION_ERROR_MESSAGES } from 'constants/error/messages';
import { createNotAllowedBodySchema } from 'middleware/validators/body-not-allowed';
import { USER_ACCESS_TYPES, USER_RELATIONSHIPS } from 'constants/user';

const updateAccessTypeSchema: ValidationChain[] = [
    param('id').isMongoId().withMessage(USER_VALIDATION_ERROR_MESSAGES.USER_ID_INVALID),
    body('accessType')
        .notEmpty()
        .isIn(Object.values(USER_ACCESS_TYPES))
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.ACCESS_TYPE_INVALID),
    ...createNotAllowedBodySchema(['accessType']),
];

// TODO: Move body filed into const
const updateDataSchema: ValidationChain[] = [
    param('id').isMongoId().withMessage(USER_VALIDATION_ERROR_MESSAGES.USER_ID_INVALID),
    body('username').optional().isString().withMessage('Username must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('city').optional().isString().withMessage('City must be a string'),
    body('hometown').optional().isString().withMessage('Hometown must be a string'),
    body('relationships')
        .optional()
        .isIn([...Object.values(USER_RELATIONSHIPS), null])
        .withMessage('Invalid relationships provided'),
    body('birthDate')
        .optional()
        .isISO8601()
        .withMessage('Birth date must be a valid ISO 8601 date'),
    body('profilePicture').optional().isURL().withMessage('Profile picture must be a URL'),
    body('coverPicture').optional().isURL().withMessage('Cover picture must be a URL'),
    ...createNotAllowedBodySchema([
        'username',
        'description',
        'city',
        'hometown',
        'relationships',
        'birthDate',
        'profilePicture',
        'coverPicture',
    ]),
];

export const userValidator = {
    updateAccessTypeSchema,
    updateDataSchema,
};
