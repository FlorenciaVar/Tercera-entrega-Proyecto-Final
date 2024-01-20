import { Router } from "express";
import { postMessage, getMessages } from "../controllers/chat.controllers.js";

export const routerChat = Router();

//("api/chat")
routerChat.post('/', postMessage);
routerChat.get('/', getMessages);