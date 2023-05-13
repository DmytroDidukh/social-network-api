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

const updateDataSchema: ValidationChain[] = [
    param(USER_FIELDS_NAMES.ID)
        .isMongoId()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USER_ID_INVALID),
    body(USER_FIELDS_NAMES.USERNAME)
        .optional()
        .isString()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.USERNAME_TYPE),
    body(USER_FIELDS_NAMES.DESCRIPTION)
        .optional()
        .isString()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.DESCRIPTION_TYPE),
    body(USER_FIELDS_NAMES.CITY)
        .optional()
        .isString()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.CITY_TYPE),
    body(USER_FIELDS_NAMES.HOMETOWN)
        .optional()
        .isString()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.HOMETOWN_TYPE),
    body(USER_FIELDS_NAMES.RELATIONSHIPS)
        .optional()
        .isIn([...Object.values(USER_RELATIONSHIPS), null])
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.RELATIONSHIPS_INVALID),
    body(USER_FIELDS_NAMES.BIRTH_DATE)
        .optional()
        .isISO8601()
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.BIRTH_DATE_FORMAT),
    body(USER_FIELDS_NAMES.PROFILE_PICTURE)
        .optional()
        .custom((value) => {
            return value === '' || validateURL(value);
        })
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.PROFILE_PICTURE_FORMAT),
    body(USER_FIELDS_NAMES.COVER_PICTURE)
        .optional()
        .custom((value) => {
            return value === '' || validateURL(value);
        })
        .withMessage(USER_VALIDATION_ERROR_MESSAGES.COVER_PICTURE_FORMAT),
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
