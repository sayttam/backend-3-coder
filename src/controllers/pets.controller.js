import PetDTO from "../dto/Pet.dto.js";
import PetDAO from '../dao/Pets.dao.js';
import __dirname from "../utils/index.js";
import logger from "../utils/logger.js";
import { customError } from "../errors/customError.js";

const petDao = new PetDAO();

const getAllPets = async (req, res, next) => {
    try {
        const pets = await petDao.get({});
        res.send({ status: "success", payload: pets });
    } catch (error) {
        error.path = "[GET] api/pets"
        next(error);
    }
};

const createPet = async (req, res, next) => {
    try {
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            logger.error("Valores incompletos al crear una mascota");
            throw customError.badRequestError("Valores incompletos");
        }
        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
        const result = await petDao.save(pet);
        logger.info(`Mascota creada: ${result}`);
        res.send({ status: "success", payload: result });
    } catch (error) {
        error.path = "[POST] api/pets"
        next(error);
    }
};

const updatePet = async (req, res, next) => {
    try {
        const { name, specie, birthDate } = req.body;
        const petId = req.params.pid;
        const result = await petDao.update(petId, { name, specie, birthDate });
        if (!result) {
            logger.warn("No se pudo actualizar la mascota");
            throw customError.notFoundError("No se pudo actualizar la mascota");
        }
        res.send({ status: "success", mensaje: "Mascota actualizada" });
    } catch (error) {
        error.path = "[PUT] api/pets"
        next(error);
    }
};

const deletePet = async (req, res, next) => {
    try {
        const petId = req.params.pid;
        const result = await petDao.delete(petId);
        if (!result) {
            logger.warn("No se pudo eliminar la mascota");
            throw customError.notFoundError("No se pudo eliminar la mascota");
        }
        res.send({ status: "success", mensaje: "Mascota eliminada" });
    } catch (error) {
        error.path = "[DELETE] api/pets"
        next(error);
    }
};

const createPetWithImage = async (req, res, next) => {
    try {
        const file = req.file;
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            logger.error("Valores incompletos al crear una mascota con imagen");
            throw customError.badRequestError("Valores incompletos");
        }
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`,
        });
        const result = await petDao.save(pet);
        res.send({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
};
