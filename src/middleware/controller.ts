import { Request, Response } from 'express';
import { HTTP_STATUSES } from 'constants/error';

function controllerMiddleware(routeHandler) {
    return async function controllerMiddleware(req: Request, res: Response) {
        try {
            const data = await routeHandler(req, res);

            if (data === undefined) {
                res.sendStatus(HTTP_STATUSES.NO_CONTENT);
                return;
            }

            res.send({ data });
        } catch (error) {
            res.status(error.httpStatus || HTTP_STATUSES.UNIMPLEMENTED);
            res.send({
                code: error.code,
                type: error.type,
                message: error.message,
            });
        }
    };
}

function createController() {
    return controllerMiddleware;
}

export { createController };
