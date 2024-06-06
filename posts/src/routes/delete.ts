import express, { Request, Response } from 'express';
import { Post } from '../models/post';
import { NotAuthorizedError, NotFoundError, currentUser, requireAuth } from '@alayyubisidikblog/common';

const router = express.Router();

router.delete('/api/posts/:slug', 
    currentUser, 
    requireAuth,
    async (req: Request, res: Response) => {

        const post = await Post.findOne({ slug: req.params.slug }).populate('user');
        if (!post) {
            throw new NotFoundError("Post not found");
        }

        await Post.deleteOne({ slug: req.params.slug });

        if (req.currentUser?.id !== post.user.id && req.currentUser?.role !== 'admin') {
            throw new NotAuthorizedError();
        } 

        res.status(200).send({
            success: true,
            message: 'Post successfully deleted',
            data: post
        });
});

export { router as deletePostsRouter }