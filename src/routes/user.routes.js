import { Router } from "express";
import { getUsers, updateRole } from "../controllers/user.controllers.js";


export const routerUsers = Router();

//("/api/users")
routerUsers.get('/', getUsers);
routerUsers.put('/premium/:uid', updateRole);