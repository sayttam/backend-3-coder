//import { usersService } from "../services/index.js";
import { log } from "winston";
import UserDAO from "../dao/Users.dao.js"
import logger from '../utils/logger.js';

const userDao = new UserDAO

const getAllUsers = async (req, res) => {
    try {
        const users = await userDao.get({});
        logger.info("Usuarios obtenidos correctamente")
        res.send({ status: "success", payload: users });
    } catch (error) {
        logger.error(`Error al obtener los usuarios: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al obtener los usuarios", error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userDao.getBy({_id: userId});
        if (!user) {
            logger.warn(`Usuario no encontrado: ${userId}`);
            return res.status(404).send({ status: "error", mensaje: "Usuario no encontrado" });
        }
        logger.info(`Usuario obtenido: ${userId}`);
        res.send({ status: "success", payload: user });
    } catch (error) {
        logger.error(`Error al obtener el usuario: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al obtener el usuario", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await userDao.getBy({_id: userId});
        if (!user) {
            logger.warn(`Usuario no encontrado para actualizar: ${userId}`);
            return res.status(404).send({ status: "error", mensaje: "Usuario no encontrado" });
        }
        logger.info(`Usuario actualizado: ${userId}`);
        await userDao.update(userId, updateBody);
        res.send({ status: "success", mensaje: "Usuario actualizado" });
    } catch (error) {
        logger.error(`Error al actualizar el usuario: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al actualizar el usuario", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userDao.getBy({_id: userId});
        if (!user) {
            logger.warn(`Usuario no encontrado para eliminar: ${userId}`);
            return res.status(404).send({ status: "error", mensaje: "Usuario no encontrado" });
        }
        await userDao.delete({_id: userId});
        logger.info(`Usuario eliminado: ${userId}`);
        res.send({ status: "success", mensaje: "Usuario eliminado" });
    } catch (error) {
        logger.error(`Error al eliminar el usuario: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al eliminar el usuario", error: error.message });
    }
};

export default {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};
