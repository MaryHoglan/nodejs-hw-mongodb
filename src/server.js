import path from 'node:path';

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import contactsRouter from './routes/contacts.js';

import { auth } from './middlewares/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';



export function setupServer() {
    const app = express();

// Middlewares
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );
  
  app.use('/api-docs', swaggerDocs());
  app.use('/photo', express.static(path.resolve("src/uploads/photos")));
  
  
// Routes
  app.use('/auth', authRouter);
  app.use('/contacts', auth, contactsRouter);
  
  app.get('/', (req, res) => {
        res.json({ message: 'API is running' });
    });

// Error handlers
  app.use(notFoundHandler); 
  app.use(errorHandler);    
 
// Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;

    
}
