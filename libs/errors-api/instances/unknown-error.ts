import { ApiBaseError } from './base-error';
import { HTTP_STATUSES, ERROR_CODES } from '../constants';
import { IErrorOptions } from '../types/interfaces';

class ApiUnknownError extends ApiBaseError {
    constructor(options: IErrorOptions = {}) {
        const {
            httpStatus = HTTP_STATUSES.INTERNAL_SERVER_ERROR,
            code = ERROR_CODES.UNKNOWN,
            type = 'Unknown',
            message = 'Temporary issue due to an unknown internal error. Wait and retry the operation',
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

export { ApiUnknownError };
