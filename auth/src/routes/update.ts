import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError, NotAuthorizedError, currentUser, requireAuth, validateRequest } from "@alayyubisidikblog/common";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import jwt from 'jsonwebtoken';
import { UserUpdatedPublisher } from "../events/publishers/user-updated-publisher";

const router = express.Router();

router.put(
    "/api/users/update/:username",
    currentUser, 
    requireAuth,
    [
        body("username")
            .notEmpty().withMessage('Username cannot be empty')
            .isLength({ min: 3, max: 50 })
            .withMessage("Username must be between 3 and 50 characters"),
        body("email")
            .notEmpty().withMessage('Email cannot be empty')
            .isEmail()
            .withMessage("Email must be valid"),
        body("full_name")
            .notEmpty().withMessage('Full Name cannot be empty')
            .isLength({ min: 3, max: 100 })
            .withMessage("Full Name must be between 3 and 100 characters")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { username, email, full_name } = req.body;
        const { username: currentUsername } = req.params;

        
        const user = await User.findOne({ username: currentUsername });
        if (!user) {
            throw new BadRequestError('User not found');
        }

        if(req.currentUser?.email !== user.email) {
            throw new NotAuthorizedError();
        }

        if(username !== currentUsername) {
            const existingUserByUsername = await User.findOne({ username });
            if (existingUserByUsername) {
                throw new BadRequestError('Username in use');
            }
        }

        if(email !== user.email) {
            const existingUserByEmail = await User.findOne({ email });
            if (existingUserByEmail) {
                throw new BadRequestError('Email in use');
            }
        }

        user.set({ username, email, full_name });
        await user.save();

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username,
            full_name: user.full_name,
            role: user.role
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        }

        await new UserUpdatedPublisher(natsWrapper.client).publish({
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            version: user.version
        });

        res.status(200).send({
            status: true,
            data: user
        });
    }
);

export { router as updateUserRouter };
