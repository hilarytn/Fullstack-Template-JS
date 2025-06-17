/*
 * Entry Point: server.js
 */

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoutes from './routes/authRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();


const allowedOrigin = 'https://refactored-doodle-64w9jw5wrwq244wr-3000.app.github.dev';

// Enable CORS
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'User Authentication API Documentation',
    },
    components: {
      schemas: {
        RegisterUser: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              example: 'Hilary Titus'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'hilary@example.com'
            },
            password: {
              type: 'string',
              example: 'password123'
            }
          }
        },
        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'hilary@example.com'
            },
            password: {
              type: 'string',
              example: 'password123'
            }
          }
        },
        ForgotPassword: {
          type: 'object',
          required: ['email'],
          properties: {
            email: {
              type: 'string',
              example: 'hilary@example.com'
            }
          }
        },
        ResetPassword: {
          type: 'object',
          required: ['password'],
          properties: {
            password: {
              type: 'string',
              example: 'newStrongPassword'
            }
          }
        }
      }
    },
    servers: [{ url: 'https://refactored-doodle-64w9jw5wrwq244wr-5000.app.github.dev/' }]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Security headers
app.use(helmet());

// ✅ Trust the first proxy (needed for Codespaces, Vercel, etc.)
app.set('trust proxy', 1);

// Body parser
app.use(express.json());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Routes
app.use('/api/v1/users', userRoutes);

app.use('/api/v1/auth', authRoutes);


// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
