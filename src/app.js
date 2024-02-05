import express from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import logger from 'morgan';
import { __filename, __dirname } from './path.js';
import * as path from 'path';

import { routerProduct } from './routes/products.routes.js';
import { routerCarts } from './routes/carts.routes.js';
import router from './routes/index.routes.js';
import { routerUpload } from './routes/upload.routes.js';

import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { routerChat } from './routes/chat.routes.js';
import { routerSession } from './routes/sessions.routes.js';


const app  = express()
const PORT = 8080 



//connectDB 

await mongoose.connect('mongodb+srv://menichinidinopaolo:Romi6282@cluster1.zr0m6.mongodb.net/?retryWrites=true&w=majority')
        console.log('Base de datos conectada')    


//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

app.use(session({
  store: MongoStore.create({
      mongoUrl: "mongodb+srv://menichinidinopaolo:Romi6282@cluster1.zr0m6.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 300
  }),
  secret: 'prueba123',
  resave: true,
  saveUninitialized: true
}));


//Routes
app.use('/', express.static(__dirname + '/public'));
app.use('/', router);
app.use('/upload', routerUpload);
app.use('/api/products', routerProduct);
app.use('/api/carts', routerCarts);
app.use('/api/chat', routerChat);
app.use('/', routerSession)


const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true, 
   
  },

});