import * as express from 'express';
import * as passport from 'passport';

import expressValidator = require('express-validator');

import { User, IUser } from '../models/user';
let router = express.Router();

router.post('/register', validateRegister, function (req, res, next) {
    let user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save(function (err, user) {
        if (err) {
            return next(err);
        }
        res.send("Registration Complete. Please login.");
    });
});

function validateRegister(req: express.Request, res, next) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('username', 'Username must be alphanumeric').isAlphanumeric();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    return next();
}

router.post('/login', validateLogin, function (req, res, next) {

    passport.authenticate('local', (err, user: IUser, info) => {
        console.log(`User is authenticated`, user);

        if (err) {
            return next(err);
        }

        if (user) {
            return res.status(200)
                .json({
                    username: user.username,
                    email: user.email,
                    token: user.generateJWT()
                });
        }

        return res.status(400).send(info);
    })(req, res, next);
});

function validateLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    return next();
}

router.post('/logout', function (req, res, next) {
    req.logout();

    res.status(204).end();
});

export default router;
