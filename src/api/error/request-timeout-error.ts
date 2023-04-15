import { ApiBaseError } from './base-error';
import { HTTP_STATUSES, ERROR_CODES } from 'constants/error';
import { IErrorOptions } from 'types/interfaces/error';

class ApiRequestTimeoutError extends ApiBaseError {
    constructor(options: IErrorOptions = {}) {
        const {
            httpStatus = HTTP_STATUSES.REQUEST_TIMEOUT,
            code = ERROR_CODES.REQUEST_TIMEOUT,
            type = 'Request Timeout',
            // eslint-disable-next-line max-len
            message = 'The request was running for too long or exceeded the time-out period specified in the header of the call.',
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

export { ApiRequestTimeoutError };
