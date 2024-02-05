import userModel from "../dao/models/userModel.js";
import { findUsers, findUserById, updateUser } from "../service/userService.js";
import { createHash } from "../utils/bcrypt.js";

const userManager = await userModel();
export const managerUsers = new userModel();

export const adminUser = {
    first_name: "Dino",
    last_name: "Menichini",
    email: "adminCoder@coder.com",
    age: 28,
    password: createHash("adminCod3r123"),
    role: "Admin"

}

export const getUsers = async (req, res, next) => {

    req.logger.http(`Petición llegó al controlador (getUsers).`);

    try {
        const users = await findUsers()
        res.status(200).json({ users })

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}

export const updateRole = async (req, res, next) => {
    const user = req.user;
    const userId = req.params.uid;
    req.logger.http('Petición llegó al controlador(updateRole)');

    try {
        const userDB = await findUserById(userId);

        if (userDB.role === "admin") {
            return res.status(403).json({
                message: "No se puede cambiar el rol del usuario"
            })
        }

        const newRole = user.role === 'user' ? 'premium' : 'user';

        if (user.role === "admin" || user._id.equals(userDB._id)) {
            await updateUser(userId, { role: newRole })
            return res.status(200).json({
                message: "El rol del usuario ha sido actualizado"
            })
        }

        return res.status(403).json({
            message: "No tiene los permisos para cambiar el rol del usuario"
        })

    } catch (error) {
        req.logger.error(error.message);
        next(error);
    }
}