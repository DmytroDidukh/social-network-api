import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';

function validate(req: Request, res: Response, next: NextFunction) {
    const errorFormatter = ({ msg }: ValidationError) => {
        return msg;
    };

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        // TODO: Add custom error
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export { validate };
