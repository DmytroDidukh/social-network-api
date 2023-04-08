import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errorFormatter = ({ msg }: ValidationError) => {
        return msg;
    };

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export { validate };
