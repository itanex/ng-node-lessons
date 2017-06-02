import * as express from 'express';
import expressValidator = require('express-validator');
import * as path from 'path';
import * as bodyParser from 'body-parser';

import Autos from './api/auto.api';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/autos', Autos);

// Other routes go above the get /*
app.get('/*', function (req, res, next) {
    res.render('index');
});

export = app;
