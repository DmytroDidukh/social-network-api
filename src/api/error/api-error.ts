import { ApiBaseError } from './base-error';
import { HTTP_STATUSES, ERROR_CODES } from 'constants/error';
import { IErrorOptions } from 'types/interfaces/error';

class ApiError extends ApiBaseError {
    constructor(options: IErrorOptions = {}) {
        const {
            httpStatus = HTTP_STATUSES.INTERNAL_SERVER_ERROR,
            code = ERROR_CODES.UNKNOWN,
            type = 'Unknown Error',
            message = 'Unknown Error',
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

export { ApiError };
