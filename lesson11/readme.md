# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# User Authentication

Sometimes it is needed that the user DB be completely separate and isolated for security reasons. For practical purposes, this lesson will use the previously established DB.

## NodeJS Modules

```BASH
# Required Libraries
npm install --save passport passport-local jsonwebtoken express-jwt express-session cookie-parser

# Type Definitions for Typescript
npm install --save-dev @types/passport @types/passport-local @types/express-jwt @types/express-session @types/jsonwebtoken
```

## Setting Up Authentication

[PassportJS](http://passportjs.org/) is the accepted standard authentication library for NodeJS applications. It is divided into two pieces, the base library called **passport** and extensions called **strategies**. 

**Passport**
The base library provides just that, the baseline objects and systems for building out authentication into the application.   
**Strategies**
The strategy libraries provide the specifics for each login type. For instance, if the application needs Facebook or Twitter authentication, the application needs the strategy library for those authentication systems. This lesson uses the **local** strategy which allows for a localized DB and traditional login system. 


```Typescript
import * as session from 'express-session';
import * as passport from 'passport';

import { AuthenticationHandler } from './authentication/authenticate'

const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'SecretKey'});

// Passport Configuration
require('./authentication/authentication.passport');

// ...

// Establish Session details
app.use(session(<session.SessionOptions>{
    secret: 'EternalNight',
    saveUninitialized: true,
    resave: true
}));

// ...

// Set up app with passport 
app.use(passport.initialize());
app.use(passport.session());

// ...

// Secured Endpoint Example
app.get('/profile', AuthenticationHandler, (req, res, next) => {
    res.status(200).send("Your profile SUCKS!");
});
```