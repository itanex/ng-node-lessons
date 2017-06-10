# Install instructions

After cloning be sure to run the following commands.
```BASH
 $ npm i
 $ bower i
```

# User Authentication

Authentication is a simple concept, each user has set of unique credentials and those credentials are verified then the user is given access or not. However, implementing authentication is not simple there are plenty of security concerns that need to be covered. First and foremost, a Production environment MUST never transmit or accept user credentials over an unsecured connection, this means that HTTPS must be used. To use HTTPS you need a valid certificate and enable NodeJS to handle the protocol accordingly.

> **For the purpose of this lesson**
>
> HTTP will not be used. The lesson will focus on the practices that need to take place in code.

## NodeJS Modules

```BASH
# Required Libraries
npm install --save passport passport-local jsonwebtoken express-jwt express-session cookie-parser

# Type Definitions for Typescript
npm install --save-dev @types/passport @types/passport-local @types/express-jwt @types/express-session @types/jsonwebtoken
```

## PassportJS Authentication

[PassportJS](http://passportjs.org/) is the accepted standard authentication library for NodeJS applications. It is divided into two pieces, the base library called **passport** and extensions called **strategies**. 

**Passport**

The base library provides just that, the baseline objects and systems for building out authentication into the application.

**Strategies**

The strategy libraries provide the specifics for each login type. For instance, if the application needs Facebook or Twitter authentication, the application needs the strategy library for those authentication systems.

> **For the purpose of this lesson**
>
> This lesson uses the **local** strategy which allows for a localized DB and traditional login system. 

## Authentication Credential Handling

**Registering Credentials**

When storing user credentials they need to be stored for future referencing. Normal expectations for registering a user will include: `username`, `password`, `email`, and for authentication needs, a unique `salt` phrase. Other fields are completely up to the requirements and/or services that are provided for recovery and additional authentication support.

> **For the purpose of this lesson**
>
> This lesson will store them in a MongoDB collection.

> **NEVER**  **NEVER**  **NEVER**  **NEVER**
>
> Storing passwords in plain text MUST NEVER be done. This allows a person that has compromised your database to collect username/password combinations for various nefarious purposes.

```Typescript
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: false,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    passwordHash: String,
    salt: String
});

UserSchema.method('setPassword', function (password: string) {
    this.salt = crypto
        .randomBytes(16)
        .toString('hex');

    this.passwordHash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha1')
        .toString('hex');
});
```
As illustrated, when the user is stored into the database, there are methods to update the `salt` and the `passwordHash` which are going to be unique to this user. **Salt** is a parameter of encryption which is used to prevent decrypting a hash just by running known algorithms. A **hash** is the result of an encryption.

**Authentication Credentials**

When accessing credentials the system will utilize the user record to verify against the provided input from the user. It is important to never let the user in, if there are ANY discrepancies in the provided credentials. It is better to prevent access, even to a valid user, instead of accidental providing access to an invalid user.

```Typescript
UserSchema.method('validatePassword', function (password: string) {
    let hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha1')
        .toString('hex');

    return (hash === this.passwordHash);
});
```

The `validatePassword` method, demonstrates that the provided password must match the stored `passwordHash` value after being processed through the exact same protocols.

## Setting Up PassportJS

Setting up PassportJS is rather simple, just import the library and attach it to the application with `app.use(...)`. However, before it can be properly used in any route calls, it is required to define the configuration of PassportJS.

```Typescript
let LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use('local', new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'Username/Password is incorrect.' });
        }

        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Username/Password is incorrect.' });
        }

        return done(null, user);
    });
}));
```

Import passport and attached each strategy with its handling of success and failure points. With a **LocalStrategy** it is required that the validation of the user and the user's password be handled.

> **Security Note**
>
> What you tell the user, tells the user about the system. For example, if you say, 'unknown user', then the user can test to see what usernames are being used in the system and try passwords for usernames they know are connected. But, there are always exceptions to the rules, just be aware of the security risks you take.

This code shows that the MongoDB User object can be leveraged to find the user by username, once if finds a record it is interrogated for errors, an actual user and then finally verify the password of the user. When everything checks out a successful result is returned.

```Typescript
import * as passport from 'passport';

// ...

// Passport Configuration
require('./authentication/authentication.passport');

// ...

// Set up app with passport 
app.use(passport.initialize());
app.use(passport.session());
```

Once everything is configured it needs to be brought together into the application. It is important to know that the configuration be brought online BEFORE passport is set up on the application.

## Remembering if a user is logged in

It is very important to recall the current user's level of access. This is achieved in many ways, this lesson will leverage a traditional local server session. Express has a session library extension and it is easy to install and get up and running.

```Typescript
import * as session from 'express-session';
// ...

// Establish Session details
app.use(session(<session.SessionOptions>{
    secret: 'EternalNight',
    saveUninitialized: true,
    resave: true
}));
```

This sets up the application to use a session that is encrypted with specific secret valid (salt) and will keep each session updated as the user continues to use the application.

## Authentication from Server to Client - The JWT

It is extremely important to make sure that once authentication of a user is completed that the user have a quick and easy way of continuing to use the system. In this lesson, this is achieved by creating a `JsonWebToken` which will is abbreviated `JWT`.

```Typescript
export let jwtKey = 'SecretKey'; // should be configurable

let jwtOptions = <expressJwt.Options>{
    secret: jwtKey,
};

export let jwtSignOptions = <jsonwebtoken.SignOptions>{
    expiresIn: '15m' // string | number;
};

export let AuthenticationHandler = expressJwt({ secret: jwtKey });
```

Since it is important to reuse the same processes for the JST throughout its lifetime, creating a file that exports the JWT configurations is very handy.

```Typescript
UserSchema.method('generateJWT', function () {
    let jwtPayload = {
        id: this._id,
        username: this.username,
        email: this.email
    };

    return jwt.sign(jwtPayload, jwtKey, jwtSignOptions);
});
```

These method, that is used when sending the successful result of user authentication back to the browser, illustrates how it the JWT configurations are leveraged.

## Authentication from Server to Client - The Account Service

In comparison to previous lessons the Account Service will now actually have the proper functionality to handle a user account. The user data will not be stored in the application's memory, instead it will be saved in `Session Storage`. Session storage, is a service in all browsers that saved information similar to how a cookie works, except that once the browser is cleared it is actually destroyed securely. 

**Is the user logged in?**

The account service checks the session storage for this value. If it finds it, great, otherwise, the user cannot be assumed to be authenticated.

```Typescript
public get isAuthenticated(): boolean {
    return this.getItem<boolean>('authenticated') || false;
}
```

**Who is the user?**

Now that registration gives us a way to 'talk' to the user, once the user is authenticated. In this lesson, the username and email are stored to answer this question.

```Typescript
public get user(): Models.User {
    return this.getItem<Models.User>('user') || null;
}
``` 

**Register the User.**

The authentication service sends the user provided to this method and tells the calling process if the provided user was created or not.

```Typescript
public register(user: Models.RegisterUser): ng.IPromise<boolean> {
    return this.$http.post('/api/users/register', user)
        .then((result) => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
```

**Authenticate the User.**

The login method takes the user and sends it to the server. The server does the work of determining if the credentials provided are valid or not. When they are, and when the resulting status code 200, the service stores the user, token and the authentication state into the session storage.  

```Typescript
public login(user: Models.LoginUser): ng.IPromise<boolean> {
    return this.$http.post<any>('/api/users/login', user)
        .then((result) => {
            if (result.status === 200) {
                let authUser = new Models.User();
                authUser.username = result.data.username;
                authUser.email = result.data.email;

                this.setItem('user', authUser);
                this.setItem('authtoken', result.data.token);
                this.setItem('authenticated', true);

                return true;
            }
            
            return false;
        })
        .catch(() => {
            return false;
        });
}
```

**Logging the User out.**

While registration and authentication are obviously complex, unauthenticating a user is rather simple. The method simply destroys memory both on the client side and on the server.

```Typescript
public logout(): void {
    this.initializeSession();
    this.$http.post('/api/users/logout', null);
}
```

## Implementing a call to a secured endpoint

Now that authentication is all hooked up and running our endpoints may be decorated with the `AuthenticationHandler` middleware. This means that any call coming from the client needs to properly carry the JWT back to the server. On the server all that is needed is to place the AuthenticationHandler middleware as the first handler in each endpoints RequestHandler param list.

```Typescript
app.get('/profile', AuthenticationHandler, (req, res, next) => {
    res.status(200).send("This is a profile API");
});
```

Once the endpoint is secured, the client needs to send the JWT back. This code pulls the token from the session storage and attaches it to the request using the `Bearer token` authorization protocol. It is important to note that the header SHOULD be cased as in this example as should the word 'Bearer'. Additionally the value assigned this header needs to contain the 'Bearer' word, the following space, and ONLY the value of the JWT. Any additional values will cause verification of the JWT on the server to fail.

```Typescript
public testEndpoint(): ng.IPromise<boolean> {
    return this.$http.get('/api/profile', {
            headers: {
                "Authorization": `Bearer ${this.AccountService.AuthenticationToken}`
            }
        })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
```
