import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'iPets API',
            version: '1.0.0',
            description: 'API documentation for the iPets application',
        },
        servers: [
            {
                url: 'http://localhost:' + process.env.PORT,
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(options);

export { specs };