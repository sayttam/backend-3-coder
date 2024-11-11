import AdoptionDAO from '../dao/Adoption.dao.js';
import UserDAO from '../dao/Users.dao.js';
import PetDAO from '../dao/Pets.dao.js';
import { customError } from '../errors/customError.js';
import logger from '../utils/logger.js';

const adoptionDao = new AdoptionDAO();
const userDao = new UserDAO();
const petDao = new PetDAO();

const getAllAdoptions = async (req, res, next) => {
    try {
        const result = await adoptionDao.get({});
        res.send({ status: "success", payload: result });
    } catch (error) {
        logger.error(`Error al obtener adopciones: ${error.message}`);
        error.path = '[GET] api/adoptions'
        next(error);
    }
};

const getAdoption = async (req, res, next) => {
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionDao.getBy({ _id: adoptionId });
        if (!adoption) {
            logger.warn(`Adopción no encontrada: ${adoptionId}`);
            throw customError.notFoundError("Adopción no encontrada");
        }

        res.send({ status: "success", payload: adoption });
    } catch (error) {
        logger.error(`Error al obtener adopcion: ${error.message}`);
        error.path = '[GET] api/adoptions/:aid'
        next(error);
    }
};

const createAdoption = async (req, res, next) => {
    try {
        const { uid, pid } = req.params;
        const user = await userDao.getBy({ _id: uid });
        if (!user) {
            logger.warn(`Usuario no encontrado: ${uid}`);
            throw customError.notFoundError("Usuario no encontrado");
        }

        const pet = await petDao.getBy({ _id: pid });
        if (!pet) {
            logger.warn(`Mascota no encontrada: ${pid}`);
            throw customError.notFoundError("Mascota no encontrada");
        }

        if (pet.adopted) {
            logger.warn("La mascota ya ha sido adoptada");
            throw customError.badRequestError("La mascota ya ha sido adoptada");
        }

        user.pets.push(pet._id);
        await userDao.update(user._id, { pets: user.pets });
        await petDao.update(pet._id, { adopted: true, owner: user._id });
        await adoptionDao.save({ owner: user._id, pet: pet._id });

        res.status(201).send({ status: "success", message: "Mascota adoptada!" });
    } catch (error) {
        logger.error(`Error al crear adopcion: ${error.message}`);
        error.path = '[POST] api/adoptions'
        next(error);
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
};
