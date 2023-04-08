import express from 'express';

import { router as v1Router } from './v1';

const rootRouter = express.Router();

// TODO: change routes to 'auth/v1' instead of 'v1/auth'
rootRouter.use('/v1', v1Router);

export { rootRouter };
