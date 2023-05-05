import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import flash from 'express-flash';
import MongoStore from 'connect-mongo';
import { Strategy as LocalStrategy } from 'passport-local';
import config from 'config/config';
import { cookieService } from 'services/cookie';
import { verifyUser } from './verify-user';
import { deserializeUser } from './deserialize-user';
import { serializeUser } from './serialize-user';

function setupPassportAndSessions(
    app: express.Application,
    mongoClientPromise: Promise<mongoose.mongo.MongoClient>,
): void {
    app.use(flash());
    app.use(
        session({
            secret: config.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            name: cookieService.getName(),
            cookie: cookieService.getConfig(),
            store: MongoStore.create({
                clientPromise: mongoClientPromise,
                dbName: 'social-network',
                collectionName: 'sessions',
                stringify: false,
                autoRemove: 'interval',
                autoRemoveInterval: 1,
            }),
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({ usernameField: 'emailOrUsername' }, verifyUser));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    console.log('PASSPORT AND SESSIONS SET');
}

export { setupPassportAndSessions };
