import express, { Express } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from 'config/config';
import { rootRouter } from 'routes/index';
import { setupDatabase } from 'db/index';

const app: Express = express();
const mongoClientPromise = setupDatabase();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 2592000000, // 30 days
        },
        store: MongoStore.create({
            clientPromise: mongoClientPromise,
            dbName: 'social-network',
            stringify: false,
            autoRemove: 'interval',
            autoRemoveInterval: 1,
        }),
    }),
);

// ROUTES
app.use(rootRouter);

app.listen(config.PORT, () => {
    console.log(`SERVER IS STARTED ON ${config.PORT}`);
});
