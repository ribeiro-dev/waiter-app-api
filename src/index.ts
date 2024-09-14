import path from 'node:path';

import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

mongoose.connect('mongodb://localhost:27017')
   .then(() => {
      const app = express();
      const PORT = 3001;

      app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))) // set the static files folder
      app.use(express.json()); // Middleware to manipulate json in body requests
      app.use(router); // Defining the routes from the router

      app.listen(PORT, () => {
         console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });

      console.log('Conectado ao mongo')
   })
   .catch(() => console.log('Erro ao conectar no mongodb'));




// 02:46:00
