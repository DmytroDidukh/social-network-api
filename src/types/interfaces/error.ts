import { ERROR_CODES, HTTP_STATUSES } from 'constants/error';

interface IErrorOptions {
    code?: ERROR_CODES;
    httpStatus?: HTTP_STATUSES;
    type?: string;
    message?: string;
    innerError?: Error;
}

interface INotFoundErrorOptions extends IErrorOptions {
    resourceName: string;
    resourceId: string;
}

interface IInvalidBodyErrorOptions extends IErrorOptions {
    errors: string[];
}

export { IErrorOptions, INotFoundErrorOptions, IInvalidBodyErrorOptions };
