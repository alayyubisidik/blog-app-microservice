import { NotFoundError, currentUser, requireAuth, validateRequest } from '@alayyubisidikblog/common';
import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { body } from 'express-validator';
const router = express.Router();

router.post('/api/users/change-access-status/:username',
    currentUser,
    requireAuth,
    [
        body('access_status')
            .isBoolean().withMessage('Values must be boolean')
            .notEmpty().withMessage("Access status is required")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { username } = req.params;
        const { access_status } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            throw new NotFoundError("User not found");
        }

        existingUser.set({ access_status });

        await existingUser.save();

        res.status(200).send({ 
            success: true,
            data : existingUser
        });
    }
);

export { router as changeAccessStatusRouter };
