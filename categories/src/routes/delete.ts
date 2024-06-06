import express, { Request, Response } from 'express';
import { Category } from '../models/category';
import { NotFoundError, currentUser, requireAuth } from '@alayyubisidikblog/common';
import { CategoryDeletedPublisher } from '../events/publishers/category-deleted-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/categories/:slug', 
    currentUser, 
    requireAuth,
    async (req: Request, res: Response) => {

        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        
        await new CategoryDeletedPublisher(natsWrapper.client).publish({
            id: category.id,
            version: category.version + 1
        });

        await Category.deleteOne({ slug: req.params.slug });

        res.status(200).send({
            success: true,
            message: 'Category successfully deleted',
            data: category
        });
});

export { router as deleteCategoryRouter }