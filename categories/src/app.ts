import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@alayyubisidikblog/common';
import { createCategoryRouter } from './routes/new';
import { updateCategoryRouter } from './routes/update';
import { showCategoryRouter } from './routes/show';
import { indexCategoryRouter } from './routes';
import { deleteCategoryRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(json()); 
app.use(
    cookieSession({
        signed: false, 
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(showCategoryRouter);
app.use(createCategoryRouter);
app.use(updateCategoryRouter);
app.use(indexCategoryRouter);
app.use(deleteCategoryRouter);

app.all('*', async () => {  
    throw new NotFoundError("Route not found");
}); 

app.use(errorHandler);

export { app };
