import { BadRequestError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@alayyubisidikblog/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import slugify from 'slugify';
import { Post } from '../models/post';
import { Category } from '../models/category';


const router = express.Router();

router.put('/api/posts/:slug',  
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
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, content, category_id} = req.body;
        const { slug: currentSlug } = req.params;

        const slug = slugify(title, { lower: true, strict: true });
        const post = await Post.findOne({ slug: currentSlug }).populate('user');
        if (!post) {
            throw new NotFoundError("Post not found");
        }

        const category = await Category.findById(category_id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        if (currentSlug !== slug) {
            const existingPostBySlug = await Post.findOne({ slug: slug });
            if (existingPostBySlug) {
                throw new BadRequestError("Title in use");
            }
        }

        if (req.currentUser?.id !== post.user.id) {
            throw new NotAuthorizedError();
        }
        
        post.set({ title, slug, content, category });
        await post.save();

        res.status(200).send({
            success: true,
            data: post
        });
});

export { router as updatePostsRouter }