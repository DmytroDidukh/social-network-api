import express, { Express } from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import helmet from 'helmet';
// import morgan from 'morgan';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`SERVER IS STARTED ON ${port}`);
});
