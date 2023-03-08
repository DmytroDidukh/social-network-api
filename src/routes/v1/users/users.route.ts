import express, { Response } from 'express';

const router = express.Router();

router.get('/me', (_, res: Response) => {
    console.log();
    res.send('HELLO');
});

export default router;
