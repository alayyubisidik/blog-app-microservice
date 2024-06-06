import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

import cookieSession from 'cookie-session';
import { NotFoundError, currentUser, errorHandler } from '@alayyubisidikblog/common';
import { createPostsRouter } from './routes/new';
import { updatePostsRouter } from './routes/update';
import { showPostsRouter } from './routes/show';
import { indexPostsRouter } from './routes';
import { deletePostsRouter } from './routes/delete';
import { getByUserPostsRouter } from './routes/get-by-user';
import { relatedPostsRouter } from './routes/related-posts';

const app = express();
app.set('trust proxy', true);
app.use(json()); 
app.use(
    cookieSession({
        signed: false, 
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUser);

app.use(createPostsRouter);
app.use(updatePostsRouter);
app.use(showPostsRouter);
app.use(indexPostsRouter);
app.use(deletePostsRouter);
app.use(getByUserPostsRouter);
app.use(relatedPostsRouter);

app.all('*', async () => {  
    throw new NotFoundError("Route not found");
}); 

app.use(errorHandler);

export { app };
