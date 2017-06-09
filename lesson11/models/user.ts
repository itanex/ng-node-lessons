import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import { jwtKey, jwtSignOptions } from '../authentication/authenticate'

/**
 * Application User containing all MongoDB and User Details
 */
export interface IUser extends mongoose.Document {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    salt: string;

    setPassword(password: string): void;
    validatePassword(password: string): boolean;
    generateJWT(): string;
}

/**
 * User Schema used by Mongoose to store user
 */
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
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

UserSchema.method('validatePassword', function (password: string) {
    let hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha1')
        .toString('hex');

    return (hash === this.passwordHash);
});

UserSchema.method('generateJWT', function () {
    let jwtPayload = {
        id: this._id,
        username: this.username,
        email: this.email
    };

    return jwt.sign(jwtPayload, jwtKey, jwtSignOptions);
});

export let User = mongoose.model<IUser>('User', UserSchema);
