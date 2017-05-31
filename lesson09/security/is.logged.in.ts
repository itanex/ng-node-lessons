import * as express from 'express';

export default function isLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log('User is authenticated', req.user);
        return next();
    }

    console.log('User is NOT authenticated', req.user);

    // if they aren't redirect them to the home page
    res.status(401).end();
}