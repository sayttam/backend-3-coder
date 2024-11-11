import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import { errorHandle } from './errors/errorHandler.js';
import logger from './utils/logger.js';
import swaggerUiExpress from 'swagger-ui-express'
import { specs } from './config/swagger.config.js'
import indexRouter from './routes/index.router.js'
import { dbconnection } from './config/db.config.js';

dotenv.config();

const app = express();
dbconnection();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/api', indexRouter);

app.use(errorHandle);

app.listen(process.env.PORT, ()=> logger.info(`Listening on ${process.env.PORT}`));