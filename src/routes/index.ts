import express from 'express';

import { router as v1Router } from './v1';

const rootRouter = express.Router();

rootRouter.use('/v1', v1Router);

export { rootRouter };
