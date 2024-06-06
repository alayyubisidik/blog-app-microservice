import { BadRequestError, NotFoundError, currentUser, requireAuth, validateRequest } from '@alayyubisidikblog/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import slugify from 'slugify';
import { Category } from '../models/category';
import { CategoryUpdatedPublisher } from '../events/publishers/category-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/categories/:slug', 
    currentUser,
    requireAuth,
    [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 3, max: 50 }).withMessage('Name cannot be longer than 255 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { name } = req.body;
        const { slug: currentSlug } = req.params;

        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        
        const slug = slugify(name, { lower: true, strict: true });

        if (currentSlug !== slug) {
            const existingCategory = await Category.findOne({ slug: slug })
            if (existingCategory) {
                throw new BadRequestError("Category already exists");
            }
        }
        
        category.set({ name, slug });
        await category.save();

        await new CategoryUpdatedPublisher(natsWrapper.client).publish({
            id: category.id,
            name: category.name,
            slug: category.slug,
            version: category.version
        });

        res.status(200).send({
            success: true,
            data: category
        });
});

export { router as updateCategoryRouter }