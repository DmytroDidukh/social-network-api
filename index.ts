import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import helmet from 'helmet';
// import morgan from 'morgan';
import config from './config';

dotenv.config();

const app: Express = express();
mongoose.connect(config.MONGO_URI);

app.listen(config.PORT, () => {
    console.log(`SERVER IS STARTED ON ${config.PORT}`);
});
