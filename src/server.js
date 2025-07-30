import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routes/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import authRouter from './routes/auth.js';
import { auth } from './middlewares/auth.js';


export function setupServer() {
    const app = express();

    app.use(cors());
    app.use(pino());
    app.use(express.json());

    app.use('/auth', authRouter);
    app.use('/contacts', auth, contactsRouter);
 
   
 
    app.get('/', (req, res) => {
        res.json({ message: 'API is running' });
    });


    app.use(notFoundHandler); 
    app.use(errorHandler);    
 
 
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;

    
}
