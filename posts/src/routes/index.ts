import express, { Request, Response } from 'express';
import { Post } from '../models/post';
import { NotFoundError } from '@alayyubisidikblog/common';
import { Category } from '../models/category';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/posts', async (req: Request, res: Response) => {
    const { search } = req.query;

    const filters: any = {};

    if (search) {
        const categoryIds = await Category.find({ name: { $regex: search, $options: 'i' } }).select('_id');
        const userIds = await User.find({ full_name: { $regex: search, $options: 'i' } }).select('_id');
        
        filters.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
            { category: { $in: categoryIds.map((cat: any) => cat._id) } },
            { user: { $in: userIds.map((cat: any) => cat._id) } },
        ];
    }
    const posts = await Post.find(filters).populate('category').populate('user');

    if (!posts ) {
        throw new NotFoundError("No posts found");
    }

    res.status(200).send({
        success: true,
        data: posts
    });
})

export { router as indexPostsRouter } 