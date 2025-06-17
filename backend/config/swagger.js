import swaggerJsdoc from 'swagger-jsdoc';

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
        url: 'https://refactored-doodle-64w9jw5wrwq244wr-5000.app.github.dev/'
      }
    ]
  },
  apis: ['./routes/*.js'] // <--- keep your inline route docs here
};

export const swaggerSpecs = swaggerJsdoc(options);
