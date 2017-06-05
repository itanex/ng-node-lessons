import * as express from 'express';
import expressValidator = require('express-validator');
import * as path from 'path';
import * as bodyParser from 'body-parser';

// Import API Routes
import Autos from './api/auto.api';

// Create the App
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

// Establish Routes for API in the app
app.use('/api/autos', Autos);

// Other routes go above the get /*
app.get('/*', function (req, res, next) {
    res.render('index');
});

export = app;
