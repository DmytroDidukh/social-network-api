import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { ApiInvalidBodyError } from 'api/error';

function validate(req: Request, res: Response, next: NextFunction) {
    const errorFormatter = ({ msg }: ValidationError) => {
        return msg;
    };

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        const error = new ApiInvalidBodyError({ errors: errors.array() });

        res.status(error.httpStatus);
        res.send({ code: error.code, type: error.type, message: error.message });
        return;
    }

    next();
}

export { validate };
