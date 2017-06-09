import * as mongoose from 'mongoose';
import * as passport from 'passport';

import { User } from '../models/user';

let LocalStrategy = require('passport-local').Strategy;

/**
 * 
 */
passport.serializeUser(function (user, done) {
    done(null, user);
});

/**
 * 
 */
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

/**
 * 
 */
passport.use('local', new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'Unknown User' });
        }

        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Username/Password is incorrect.' });
        }

        return done(null, user);
    });
}));
