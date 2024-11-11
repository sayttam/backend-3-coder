import UserDAO from "../dao/Users.dao.js"
import { customError } from "../errors/customError.js";
import logger from '../utils/logger.js';

const userDao = new UserDAO

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userDao.get({});
        if (!users) {
            logger.warn("No se pudieron obtener los usuario");
            throw customError.notFoundError();
        }
        logger.info("Usuarios obtenidos correctamente")
        res.send({ status: "success", payload: users });
    } catch (error) {
        logger.error(`Error al obtener usuarios: ${error.message}`);
        error.path = "[GET] api/users"
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        const user = await userDao.getBy({_id: userId});
        if (!user) {
            logger.warn(`Usuario no encontrado: ${userId}`);
            throw customError.notFoundError();
        }
        logger.info(`Usuario obtenido: ${userId}`);
        res.send({ status: "success", payload: user });
    } catch (error) {
        logger.error(`Error al obtener usuario: ${error.message}`);
        error.path = "[GET] api/users/:uid"
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await userDao.getBy({_id: userId});
        if (!user) {
            logger.warn(`Usuario no encontrado para actualizar: ${userId}`);
            throw customError.notFoundError();
        }
        logger.info(`Usuario actualizado: ${userId}`);
        await userDao.update(userId, updateBody);
        res.send({ status: "success", mensaje: "Usuario actualizado" });
    } catch (error) {
        logger.error(`Error al actualizar usuario: ${error.message}`);
        error.path = "[PUT] api/users/:uid"
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        const user = await userDao.getBy({_id: userId});
        if (!user) {
            logger.warn(`Usuario no encontrado para eliminar: ${userId}`);
            throw customError.notFoundError();
        }
        await userDao.delete({_id: userId});
        logger.info(`Usuario eliminado: ${userId}`);
        res.send({ status: "success", mensaje: "Usuario eliminado" });
    } catch (error) {
        logger.error(`Error al eliminar usuario: ${error.message}`);
        error.path = "[DELETE] api/users/:uid"
        next(error);
    }
};

export default {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};
