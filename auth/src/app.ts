import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';

import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@alayyubisidikblog/common';
import { updateUserRouter } from './routes/update';
import { indexUserRouter } from './routes';
import { changeAccessStatusRouter } from './routes/change-access-status';

const app = express();
app.set('trust proxy', true);
app.use(json()); 
app.use(
    cookieSession({
        signed: false, 
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(indexUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(currentUserRouter);
app.use(updateUserRouter);
app.use(changeAccessStatusRouter);

app.all('*', async (req, res) => {  
    throw new NotFoundError("Route not found");
}); 

app.use(errorHandler);

export { app };
