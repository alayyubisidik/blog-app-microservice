import express, { Request, Response } from 'express';
import { Post } from '../models/post';

const router = express.Router();

router.get('/api/posts/user/:userId', async (req: Request, res: Response) => {
    const posts = await Post.find({ user : req.params.userId }).populate('category').populate('user');

    res.status(200).send({
        success: true,
        data: posts
    });
})

export { router as getByUserPostsRouter } 