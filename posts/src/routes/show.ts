import express, { Request, Response } from 'express';
import { Post } from '../models/post';
import { NotFoundError } from '@alayyubisidikblog/common';

const router = express.Router();

router.get('/api/posts/:slug', async (req: Request, res: Response) => {
    const { slug } = req.params;

    const post = await Post.findOne({ slug: slug }).populate('category').populate('user');
    if (!post) {
        throw new NotFoundError("Post not found");
    }

    res.status(200).send({
        success: true,
        data: post
    });
})

export { router as showPostsRouter } 