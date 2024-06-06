import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@alayyubisidikblog/common';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body("email")
            .isEmail()
            .notEmpty()
            .withMessage("Email is required and must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError("Invalid credentials");
        }
        
        const passwordMatch = await Password.compare(existingUser.password, password);
        if (!passwordMatch) {
            throw new BadRequestError("Invalid credentials");
        }
        
        const existingAccessStatus = await User.findOne({ email, access_status: true });
        if (!existingAccessStatus) {
            throw new BadRequestError("you have been blocked");
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.username,
            full_name: existingUser.full_name,
            role: existingUser.role
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        }

        res.status(200).send({ 
            success: true,
            data : existingUser
        });
});

export { router as signinRouter }