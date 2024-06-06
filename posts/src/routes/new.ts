import { BadRequestError, NotFoundError, requireAuth, validateRequest } from '@alayyubisidikblog/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import slugify from 'slugify';
import { Post } from '../models/post';
import { Category } from '../models/category';
import { User } from '../models/user';


const router = express.Router();

router.post('/api/posts',  
    requireAuth,
    [
        body('title')
            .notEmpty().withMessage('Title is required')
            .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters long'),
        body('content')
            .notEmpty().withMessage('Content is required'),
        body('category_id')
            .notEmpty().withMessage('Category ID is required')
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input)).withMessage('Invalid category ID'),
        body('user_id')
            .notEmpty().withMessage('User ID is required')
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input)).withMessage('Invalid user ID'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, content, category_id, user_id} = req.body;

        const slug = slugify(title, { lower: true, strict: true });

        const existingPost = await Post.findOne({ slug: slug });
        if (existingPost) {
            throw new BadRequestError("Post already exists");
        }

        const category = await Category.findById(category_id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        
        const user = await User.findById(user_id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        
        const post = Post.build({
            title, slug, content, user, category
        });
        await post.save();

        res.status(201).send({
            success: true,
            data: post
        });
});

export { router as createPostsRouter }