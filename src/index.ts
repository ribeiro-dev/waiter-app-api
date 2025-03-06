import path from 'node:path';
import http from 'node:http';

import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017')
   .then(() => {
      const PORT = 3001;

      app.use((req, res, next) => {
         res.setHeader('Access-Control-Allow-Origin', '*');
         res.setHeader('Access-Control-Allow-Methods', '*');
         res.setHeader('Access-Control-Allow-Headers', '*');

         next();
      });
      app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))) // set the static files folder
      app.use(express.json()); // Middleware to manipulate json in body requests
      app.use(router); // Defining the routes from the router

      server.listen(PORT, () => {
         console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });

      console.log('Conectado ao mongo')
   })
   .catch(() => console.log('Erro ao conectar no mongodb'));




// 02:46:00
