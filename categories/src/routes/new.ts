import { BadRequestError, currentUser, requireAuth, validateRequest } from '@alayyubisidikblog/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import slugify from 'slugify';
import { Category } from '../models/category';
import { CategoryCreatedPublisher } from '../events/publishers/category-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/categories', 
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

        const slug = slugify(name, { lower: true, strict: true });

        const existingCategory = await Category.findOne({ slug: slug });
        if (existingCategory) {
            throw new BadRequestError("Categories already exist");
        }

        const category = Category.build({name, slug});
        await category.save();
        
        await new CategoryCreatedPublisher(natsWrapper.client).publish({
            id: category.id,
            name: category.name,
            slug: category.slug,
            version: category.version
        });

        res.status(201).send({ 
            success: true,
            data : category
        });
});

export { router as createCategoryRouter }