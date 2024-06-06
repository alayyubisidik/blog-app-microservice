import express, { Request, Response } from 'express';
import { Post } from '../models/post';

const router = express.Router();

router.get('/api/posts/related-posts/:postId/:userId/:categoryId', async (req: Request, res: Response) => {
    const posts = await Post.find({
        _id: { $ne: req.params.postId }, 
        user: req.params.userId,
        category: req.params.categoryId
    }).populate('category').populate('user');

    res.status(200).send({
        success: true,
        data: posts
    });
});

export { router as relatedPostsRouter };
