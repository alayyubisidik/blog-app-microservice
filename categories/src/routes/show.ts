import { NotFoundError } from '@alayyubisidikblog/common';
import express, { Request, Response } from 'express';
import { Category } from '../models/category';

const router = express.Router();

router.get('/api/categories/:slug', 
    async (req: Request, res: Response) => {

        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        res.status(200).send({ 
            success: true,
            data : category
        });
});

export { router as showCategoryRouter }