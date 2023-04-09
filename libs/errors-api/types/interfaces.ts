interface IErrorOptions {
    code?: number;
    httpStatus?: number;
    type?: string;
    message?: string;
    innerError?: Error;
}

interface INotFoundErrorOptions extends IErrorOptions {
    resourceName: string;
    resourceId: string;
}

export { IErrorOptions, INotFoundErrorOptions };
