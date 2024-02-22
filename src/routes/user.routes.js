import { Router } from "express";
import { getUsers, updateRole } from "../controllers/user.controllers.js";
import { passportError } from "../config/middlewares/passportError.js";
import { roleValidation } from "../config/middlewares/roleValidation.js";

export const routerUsers = Router();

//("/api/users")
routerUsers.get('/', passportError("jwt"), roleValidation(["admin"]), getUsers);
routerUsers.put('/premium/:uid', passportError("jwt"), updateRole);