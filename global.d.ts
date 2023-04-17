import session from 'express-session';

export = session;

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        MONGO_URI: string;
        PORT: string;
    }
}

declare module 'express-session' {
    interface SessionData {
        user: string;
    }
}
