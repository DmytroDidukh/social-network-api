import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { ApiInvalidParamsError } from 'api/error';

function validate(req: Request, res: Response, next: NextFunction) {
    const errorFormatter = ({ msg }: ValidationError) => {
        return msg;
    };

    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }

    throw new ApiInvalidParamsError({ errors: errors.array() });
}

export { validate };
