import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError, FieldValidationError } from 'express-validator';
import { ApiInvalidParamsError } from 'api/error';

function isFieldValidationError(error: ValidationError): error is FieldValidationError {
    return (error as FieldValidationError).location !== undefined;
}

function validate(req: Request, res: Response, next: NextFunction) {
    const errorFormatter = (error: ValidationError) => {
        if (isFieldValidationError(error)) {
            return `${error.msg} (${error.location})`;
        }

        return error.msg;
    };

    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }

    throw new ApiInvalidParamsError({ errors: errors.array() });
}

export { validate };
