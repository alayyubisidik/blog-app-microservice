import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

import { User } from "../models/user";
import { BadRequestError, RequestValidationError, validateRequest } from "@alayyubisidikblog/common";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { currentUserRouter } from "./current-user";

const router = express.Router();

router.post(
    "/api/users/signup",
    [
        body("username")
            .notEmpty().withMessage('Username is required')
            .isLength({ min: 3, max: 50 })
            .withMessage("Username be between 3 and 50 characters"),
        body("email")
            .notEmpty().withMessage('Email is required')
            .isEmail()
            .withMessage("Email must be valid"),
        body("password")
            .notEmpty().withMessage('Password is required')
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage("Password must be between 6 and 100 characters"),
        body("full_name")
            .notEmpty().withMessage('Full Name is required')
            .isLength({ min: 3, max: 100 })
            .withMessage("Full Name must be between 3 and 100 characters")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { username, email, password, full_name } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
 
        if (existingUser) {
            throw new BadRequestError("Email or username alerady registered");
        }

        
        let role = 'author';  // default role
        if (username === 'admin') {
            role = 'admin';
        }

        const user = User.build({
            email: email,
            password: password,
            username: username,
            full_name: full_name,
            role: role
        });
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

        await new UserCreatedPublisher(natsWrapper.client).publish({
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            version: user.version
        });

        res.status(201).send({ 
            success: true,
            data : user
        });
    }
);

export { router as signupRouter };
