/**
 * File to establish any DB related work.
 * Currently, this only connects to the DB
 */
import * as mongoose from 'mongoose';
import Bluebird = require("bluebird");

// Install bluebird as the promise library for mongoose
// NOTE: mongoose promise api is deprecated and will post warnings 
// In your NodeJS console
(<any>mongoose).Promise = Bluebird;

mongoose.connect('mongodb://admin:admin@ds028540.mlab.com:28540/ng-node-lessons');
