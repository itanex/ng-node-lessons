import * as express from 'express';
import * as path from 'path';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Other routes go above the get /*

app.get('/*', function(req, res, next) {
    res.render('index');
});

export = app;
