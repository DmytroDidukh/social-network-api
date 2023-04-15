import { ApiBaseError } from './base-error';
import { ERROR_CODES, HTTP_STATUSES } from 'constants/error';
import { IErrorOptions } from 'types/interfaces/error';

class ApiInvalidAuthenticationError extends ApiBaseError {
    constructor(options: IErrorOptions = {}) {
        const {
            httpStatus = HTTP_STATUSES.UNAUTHORIZED,
            code = ERROR_CODES.INVALID_AUTH,
            type = 'Invalid Auth',
            message = 'The method requires authentication but it was not presented or is invalid.',
            innerError,
        } = options;

        super({
            httpStatus,
            code,
            type,
            message,
            innerError,
        });
    }
}

export { ApiInvalidAuthenticationError };
