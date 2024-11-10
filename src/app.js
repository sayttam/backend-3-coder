import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import dotenv from 'dotenv'
import { errorHandle } from './errors/errorHandler.js';
import logger from './utils/logger.js';
import swaggerUiExpress from 'swagger-ui-express'
import { specs } from './config/swagger.config.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect('mongodb://mongo:27017/ipets');

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use(errorHandle);

app.listen(PORT, ()=> logger.info(`Listening on ${PORT}`));

export default {
    app
}