//import { usersService } from "../services/index.js";
import UserDAO from "../dao/Users.dao.js"
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import logger from "../utils/logger.js";

const userDao = new UserDAO;

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            logger.warn('Valores incompletos al registrar un usuario');
            return res.status(400).send({ status: "error", mensaje: "Valores incompletos" });
        }
        const exists = await userDao.getBy({email: email});
        if (exists) {
            logger.warn(`El usuario con email ${email} ya existe`);
            return res.status(400).send({ status: "error", mensaje: "El usuario ya existe" });
        }
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };
        let result = await userDao.save(user);
        logger.info(`Usuario registrado con ID: ${result._id}`);
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        logger.error(`Error al registrar el usuario: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al registrar el usuario", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.warn('Valores incompletos al iniciar sesión');
            return res.status(400).send({ status: "error", mensaje: "Valores incompletos" });
        }
        const user = await userDao.getBy({email: email});
        if (!user) {
            logger.warn(`El usuario con email ${email} no existe`);
            return res.status(404).send({ status: "error", mensaje: "El usuario no existe" });
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.warn(`Contraseña incorrecta para el usuario ${email}`);
            return res.status(400).send({ status: "error", mensaje: "Contraseña incorrecta" });
        }
        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
        logger.info(`Usuario ${email} ha iniciado sesión`);
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", mensaje: "Sesión iniciada" });
    } catch (error) {
        logger.error(`Error al iniciar sesión: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al iniciar sesión", error: error.message });
    }
};

const current = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie'];
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            logger.info(`Se obtuvo la información del usuario actual con email: ${user.email}`);
            return res.send({ status: "success", payload: user });
        }
    } catch (error) {
        logger.error(`Error al obtener el usuario actual: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al obtener el usuario actual", error: error.message });
    }
};

const unprotectedLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.warn('Valores incompletos al iniciar sesión no protegida');
            return res.status(400).send({ status: "error", mensaje: "Valores incompletos" });
        }
        const user = await userDao.getBy({email: email});
        if (!user) {
            logger.warn(`El usuario con email ${email} no existe para sesión no protegida`);
            return res.status(404).send({ status: "error", mensaje: "El usuario no existe" });
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.warn(`Contraseña incorrecta para el usuario ${email} en sesión no protegida`);
            return res.status(400).send({ status: "error", mensaje: "Contraseña incorrecta" });
        }
        logger.info(`Usuario ${email} ha iniciado sesión no protegida`);
        const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", mensaje: "Sesión no protegida iniciada" });
    } catch (error) {
        logger.error(`Error al iniciar sesión no protegida: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al iniciar sesión no protegida", error: error.message });
    }
};

const unprotectedCurrent = async (req, res) => {
    try {
        const cookie = req.cookies['unprotectedCookie'];
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            logger.info(`Se obtuvo la información del usuario actual no protegido con email: ${user.email}`);
            return res.send({ status: "success", payload: user });
        }
    } catch (error) {
        logger.error(`Error al obtener el usuario actual no protegido: ${error.message}`);
        res.status(500).send({ status: "error", mensaje: "Error al obtener el usuario actual no protegido", error: error.message });
    }
};

export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent
};
