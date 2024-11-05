import PetDTO from "../dto/Pet.dto.js";
//import { petsService } from "../services/index.js";
import PetDAO from '../dao/Pets.dao.js'
import __dirname from "../utils/index.js";

const petDao = new PetDAO

const getAllPets = async (req, res) => {
    try {
        const pets = await petDao.get({});
        res.send({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).send({ status: "error", mensaje: "Error al obtener las mascotas", error: error.message });
    }
};

const createPet = async (req, res) => {
    try {
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            return res.status(400).send({ status: "error", mensaje: "Valores incompletos" });
        }
        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
        const result = await petDao.save(pet);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", mensaje: "Error al crear la mascota", error: error.message });
    }
};

const updatePet = async (req, res) => {
    try {
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        const result = await petDao.update(petId, petUpdateBody);
        res.send({ status: "success", mensaje: "Mascota actualizada" });
    } catch (error) {
        res.status(500).send({ status: "error", mensaje: "Error al actualizar la mascota", error: error.message });
    }
};

const deletePet = async (req, res) => {
    try {
        const petId = req.params.pid;
        const result = await petDao.delete(petId);
        res.send({ status: "success", mensaje: "Mascota eliminada" });
    } catch (error) {
        res.status(500).send({ status: "error", mensaje: "Error al eliminar la mascota", error: error.message });
    }
};

const createPetWithImage = async (req, res) => {
    try {
        const file = req.file;
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            return res.status(400).send({ status: "error", mensaje: "Valores incompletos" });
        }
        console.log(file);
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`,
        });
        console.log(pet);
        const result = await petDao.save(pet);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", mensaje: "Error al crear la mascota con imagen", error: error.message });
    }
};

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
};
