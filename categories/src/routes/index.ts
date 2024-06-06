import express, { Request, Response } from 'express';
import { Category } from '../models/category';

const router = express.Router();

router.get('/api/categories', 
    async (req: Request, res: Response) => {

        const categories = await Category.find({});

        res.status(200).send({ 
            success: true,
            data : categories
        });
});

export { router as indexCategoryRouter }