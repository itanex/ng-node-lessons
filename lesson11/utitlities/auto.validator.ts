import * as express from 'express';

import { AutoValidationSchema } from '../models/auto';

/**
 * Utility method used to validate the Request body content as an Auto Model
 * 
 * @param req the incoming request object
 * @param res the outgoing response object
 * @param next the next function in the middleware pipeline
 */
export function ValidateAuto(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.checkBody(AutoValidationSchema);
    
    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors).end();
    }

    return next();
}