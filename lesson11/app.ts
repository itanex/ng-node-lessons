import * as express from 'express';
import * as session from 'express-session';
import expressValidator = require('express-validator');
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';

import { AuthenticationHandler } from './authentication/authenticate'

const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'SecretKey'});

// Passport Configuration
require('./authentication/authentication.passport');

// Import API Routes
import Autos from './api/auto.api';

// Create the App
const app = express();

// Establish DB connection
require('./data/mongo.db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Establish Session details
app.use(session(<session.SessionOptions>{
    secret: 'EternalNight',
    saveUninitialized: true,
    resave: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

// Set up app with passport 
app.use(passport.initialize());
app.use(passport.session());

// Establish Routes for API in the app
app.use('/api/autos', Autos);

// Secured Endpoint
app.get('/profile', AuthenticationHandler, (req, res, next) => {
    res.status(200).send("Your profile SUCKS!");
});

// Other routes go above the get /*
app.get('/*', function (req, res, next) {
    res.render('index');
});

export = app;
