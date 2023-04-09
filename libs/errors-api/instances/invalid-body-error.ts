import { ApiBaseError } from './base-error';
import { HTTP_STATUSES, ERROR_CODES } from '../constants';
import { IErrorOptions } from '../types/interfaces';

class ApiInvalidBodyError extends ApiBaseError {
    constructor(options: IErrorOptions = {}) {
        const {
            httpStatus = HTTP_STATUSES.BAD_REQUEST,
            code = ERROR_CODES.INVALID_BODY,
            type = 'Invalid Body Parameters',
            // eslint-disable-next-line max-len
            message = 'The entries provided as body parameters were not valid for the request. Fix parameters and try again',
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

export { ApiInvalidBodyError };
