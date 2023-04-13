import { ApiBaseError } from './base-error';
import { HTTP_STATUSES, ERROR_CODES } from '../constants';
import { INotFoundErrorOptions } from '../types/interfaces';

class ApiConflictError extends ApiBaseError {
    constructor(options: INotFoundErrorOptions) {
        const {
            httpStatus = HTTP_STATUSES.CONFLICT,
            code = ERROR_CODES.CONFLICT,
            type = 'Conflict',
            resourceName,
            resourceId,
            innerError,
        } = options;

        super({
            httpStatus,
            code,
            type,
            message: `The ${resourceName} with parameter "${resourceId}" already exist.`,
            innerError,
        });
    }
}

export { ApiConflictError };
