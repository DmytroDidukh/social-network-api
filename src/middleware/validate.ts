import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { ApiInvalidBodyError } from 'api/error';
import { responseService } from 'services/response';

function validate(req: Request, res: Response, next: NextFunction) {
    const errorFormatter = ({ msg }: ValidationError) => {
        return msg;
    };

    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }

    const error = new ApiInvalidBodyError({ errors: errors.array() });
    responseService.sendError(res, error);
}

export { validate };
