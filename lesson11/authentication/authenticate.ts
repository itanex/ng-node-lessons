import * as expressJwt from 'express-jwt';
import * as jsonwebtoken from 'jsonwebtoken';

export let jwtKey = 'SecretKey'; // should be configurable

/**
 * Options to set on the JWT that is used by 
 * the Authentication Handler
 */
let jwtOptions = <expressJwt.Options>{
    secret: jwtKey, // secretType | SecretCallback;
    // userProperty?: string;
    // skip?: string[];
    // credentialsRequired?: boolean;
    // isRevoked?: IsRevokedCallback;
    // requestProperty?: string;
    // getToken?: GetTokenCallback;
    // [property: string]: any;
};

/**
 * Options to set on the JWT sign options 
 * when generating a JSON Web Token
 */
export let jwtSignOptions = <jsonwebtoken.SignOptions>{
    // algorithm?: string;
    // keyid?: string;
    // /** @member {string} - Lifetime for the token expressed in a string describing a time span [rauchg/ms](https://github.com/rauchg/ms.js). Eg: `60`, `"2 days"`, `"10h"`, `"7d"` */
    expiresIn: '15m' // string | number;
    // notBefore?: string;
    // audience?: string | string[];
    // subject?: string;
    // issuer?: string;
    // jwtid?: string;
    // noTimestamp?: boolean;
    // header?: object;
    // encoding?: string;
};

/**
 * Authentication Handler to validate request containing signed JWT
 */
export let AuthenticationHandler = expressJwt({ secret: jwtKey });
