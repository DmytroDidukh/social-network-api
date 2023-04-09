import { ApiBaseError } from './base-error';
import { HTTP_STATUSES, ERROR_CODES } from '../constants';
import { INotFoundErrorOptions } from '../types/interfaces';

class ApiNotFoundError extends ApiBaseError {
    constructor(options: INotFoundErrorOptions) {
        const {
            httpStatus = HTTP_STATUSES.NOT_FOUND,
            code = ERROR_CODES.NOT_FOUND,
            type = 'Not Found',
            resourceName,
            resourceId,
            innerError,
        } = options;

        super({
            httpStatus,
            code,
            type,
            message: `The ${resourceName} associated with the request could not be found: ${resourceId}.`,
            innerError,
        });
    }
}

export { ApiNotFoundError };
