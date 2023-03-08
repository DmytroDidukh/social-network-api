import express, { Request, Response } from 'express';

const router = express.Router();

// REGISTER
router.post('/register', (req: Request, res: Response) => {
    res.send('HELLO');
});
export default router;
