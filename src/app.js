import './config/dotenv.js';
import express from 'express';
import { __filename, __dirname } from './path.js';
import * as path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import router from './routes/index.routes.js';
import passport from 'passport';
import { engine } from 'express-handlebars';
import { initializePassport } from './config/passport/passport.js';
import { Server } from "socket.io";

//import { addLogger } from './utils/logger/logger.js';


//Iniciar Server
const app = express()

//MIDDLEWARES
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//HANDLEBARS
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));



//MONGOOSE
await mongoose.connect('mongodb+srv://menichinidinopaolo:Romi6282@cluster1.zr0m6.mongodb.net/?retryWrites=true&w=majority')
        console.log('Base de datos conectada')
//connectionMongoose()


//ROUTES
app.use('/', router);


//PUERTO DEL SERVIDOR
const port = process.env.APP_PORT || 8080;
app.set("port", port);
const server = app.listen(app.get("port"), () => console.log(`Escuchando en el puerto:  ${app.get("port")}`));


//Servidor Socket
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: 'GET, POST, PUT, DELETE',
        optionsSuccessStatus: 200,
        preflightContinue: false,
        maxAge: 3600,
    },
});