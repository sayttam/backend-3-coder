import UserDAO from "../dao/Users.dao.js"
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import logger from "../utils/logger.js";
import { customError } from "../errors/customError.js";

const userDao = new UserDAO;

const register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            logger.warn('Valores incompletos al registrar un usuario');
            throw customError.badRequestError("Valores incompletos");
        }
        const exists = await userDao.getBy({email: email});
        if (exists) {
            logger.warn(`El usuario con email ${email} ya existe`);
            throw customError.badRequestError(`El usuario con email ${email} ya existe`);
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
         error.path = "[POST] api/sessions/register"
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.warn('Valores incompletos al iniciar sesión');
            throw customError.badRequestError("Valores incompletos");
        }
        const user = await userDao.getBy({email: email});
        if (!user) {
            logger.warn(`El usuario con email ${email} no existe`);
            throw customError.notFoundError(`El usuario con email ${email} no existe`);
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.warn(`Contraseña incorrecta para el usuario ${email}`);
            throw customError.unauthorizedError("Contraseña incorrecta");
        }
        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
        logger.info(`Usuario ${email} ha iniciado sesión`);
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", mensaje: "Sesión iniciada" });
    } catch (error) {
         error.path = "[POST] api/sessions/login"
        next(error)
    }
};

const current = async (req, res, next) => {
    try {
        const cookie = req.cookies['coderCookie'];
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (!user) {
            logger.info('No hay un usuario logueado');
            throw customError.notFoundError('No hay un usuario logueado')
        }
        if (user) {
            logger.info(`Se obtuvo la información del usuario actual con email: ${user.email}`);
            return res.send({ status: "success", payload: user });
        }
    } catch (error) {
         error.path = "[GET] api/sessions/current"
        next(error);
    }
};

const unprotectedLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.warn('Valores incompletos al iniciar sesión no protegida');
            throw customError.badRequestError("Valores incompletos");
        }
        const user = await userDao.getBy({email: email});
        if (!user) {
            logger.warn(`El usuario con email ${email} no existe para sesión no protegida`);
            throw customError.notFoundError(`El usuario con email ${email} no existe`);
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.warn(`Contraseña incorrecta para el usuario ${email} en sesión no protegida`);
            throw customError.unauthorizedError("Contraseña incorrecta");
        }
        logger.info(`Usuario ${email} ha iniciado sesión no protegida`);
        const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", mensaje: "Sesión no protegida iniciada" });
    } catch (error) {
         error.path = "[POST] api/sessions/unprotectedLogin"
        next(error);
    }
};

const unprotectedCurrent = async (req, res, next) => {
    try {
        const cookie = req.cookies['unprotectedCookie'];
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (!user) {
            logger.info('No hay un usuario logueado');
            throw customError.notFoundError('No hay un usuario logueado')
        }
        if (user) {
            logger.info(`Se obtuvo la información del usuario actual no protegido con email: ${user.email}`);
            return res.send({ status: "success", payload: user });
        }
    } catch (error) {
                error.path = "[GET] api/sessions/unprotectedCurrent"
        next(error);
    }
};

export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent
};
