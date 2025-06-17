import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv'

dotenv.config()
const SERVER_URL = process.env.SERVER_URL
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'User Authentication API Documentation'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      {
        url: `${SERVER_URL}`
      }
    ]
  },
  apis: ['./routes/*.js'] // <--- keep your inline route docs here
};

export const swaggerSpecs = swaggerJsdoc(options);
