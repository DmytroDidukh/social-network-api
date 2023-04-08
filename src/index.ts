import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from 'config/config';
import { rootRouter } from 'routes/index';
import { setupDatabase } from 'db/index';

const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use(rootRouter);

async function runApplication() {
    try {
        await setupDatabase();

        app.listen(config.PORT, () => {
            console.log(`SERVER IS STARTED ON ${config.PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

runApplication();
