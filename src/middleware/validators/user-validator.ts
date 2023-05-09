import { body, param, ValidationChain } from 'express-validator';
import { USER_VALIDATION_ERROR_MESSAGES } from 'constants/error/messages';
import { createNotAllowedBodySchema } from 'middleware/validators/body-not-allowed';
import { USER_ACCESS_TYPES, USER_FIELDS_NAMES, USER_RELATIONSHIPS } from 'constants/user';
import { validateURL } from 'utils/url';

const updateAccessTypeSchema: ValidationChain[] = [
    param(USER_FIELDS_NAMES.ID)
        .isMongoId()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USER_ID_INVALID),
    body(USER_FIELDS_NAMES.ACCESS_TYPE)
        .notEmpty()
        .isIn(Object.values(USER_ACCESS_TYPES))
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.ACCESS_TYPE_INVALID),
    ...createNotAllowedBodySchema([USER_FIELDS_NAMES.ACCESS_TYPE]),
];

// TODO: Move body filed into const
const updateDataSchema: ValidationChain[] = [
    param(USER_FIELDS_NAMES.ID)
        .isMongoId()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USER_ID_INVALID),
    body(USER_FIELDS_NAMES.USERNAME).optional().isString().withMessage('Username must be a string'),
    body(USER_FIELDS_NAMES.DESCRIPTION)
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body(USER_FIELDS_NAMES.CITY).optional().isString().withMessage('City must be a string'),
    body(USER_FIELDS_NAMES.HOMETOWN).optional().isString().withMessage('Hometown must be a string'),
    body(USER_FIELDS_NAMES.RELATIONSHIPS)
        .optional()
        .isIn([...Object.values(USER_RELATIONSHIPS), null])
        .withMessage('Invalid relationships provided'),
    body(USER_FIELDS_NAMES.BIRTH_DATE)
        .optional()
        .isISO8601()
        .withMessage('Birth date must be a valid ISO 8601 date'),
    body(USER_FIELDS_NAMES.PROFILE_PICTURE)
        .optional()
        .custom((value) => {
            return value === '' || validateURL(value);
        })
        .withMessage('Profile picture must be a URL'),
    body(USER_FIELDS_NAMES.COVER_PICTURE)
        .optional()
        .custom((value) => {
            return value === '' || validateURL(value);
        })
        .withMessage('Cover picture must be a URL'),
    ...createNotAllowedBodySchema([
        USER_FIELDS_NAMES.USERNAME,
        USER_FIELDS_NAMES.DESCRIPTION,
        USER_FIELDS_NAMES.CITY,
        USER_FIELDS_NAMES.HOMETOWN,
        USER_FIELDS_NAMES.RELATIONSHIPS,
        USER_FIELDS_NAMES.BIRTH_DATE,
        USER_FIELDS_NAMES.PROFILE_PICTURE,
        USER_FIELDS_NAMES.COVER_PICTURE,
    ]),
];

export const userValidator = {
    updateAccessTypeSchema,
    updateDataSchema,
};
