import * as express from 'express';

/**
 * Utility method used to validate ID that is pulled from the URL Parameter list of the Request
 * 
 * @param req the incoming request object
 * @param res the outgoing response object
 * @param next the next function in the middleware pipeline
 */
export function ValidateId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.checkParams({
        id: {
            optional: false,
            isInt: {
                errorMessage: 'Must be a number'
            }
        }
    });

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    return next();
}