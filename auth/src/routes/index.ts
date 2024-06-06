import { currentUser, requireAuth } from '@alayyubisidikblog/common';
import express from 'express';
import { User } from '../models/user';
const router = express.Router();

router.get('/api/users', async (req, res) => {
    const users = await User.find({ role: 'author' });

    res.status(200).send({
        success: true,
        data: users
    });
});

export { router as indexUserRouter };
