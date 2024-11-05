//import { adoptionsService, petsService, usersService } from "../services/index.js";
import AdoptionDAO from '../dao/Adoption.dao.js'
import UserDAO from '../dao/Users.dao.js'
import PetDAO from '../dao/Pets.dao.js'

const adoptionDao = new AdoptionDAO
const userDao = new UserDAO
const petsDao = new PetDAO

const getAllAdoptions = async (req, res) => {
    try {
        const result = await adoptionDao.get({});
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error al obtener adopciones" });
    }
};

const getAdoption = async (req, res) => {
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionDao.getBy({ _id: adoptionId });
        if (!adoption) return res.status(404).send({ status: "error", error: "Adopcion no encontrada" });
        res.send({ status: "success", payload: adoption });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error al obtener adopcion" });
    }
};

const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params;
        const user = await userDao.getBy({_id: uid});
        if (!user) return res.status(404).send({ status: "error", error: "Usuario no encontrado" });

        const pet = await petsDao.getBy({_id: pid});
        if (!pet) return res.status(404).send({ status: "error", error: "Mascota no encontrada" });

        if (pet.adopted) return res.status(400).send({ status: "error", error: "La mascota ya ha sido adoptada" });

        user.pets.push(pet._id);
        await userDao.update(user._id, { pets: user.pets });
        await petsDao.update(pet._id, { adopted: true, owner: user._id });
        await adoptionDao.save({ owner: user._id, pet: pet._id });

        res.send({ status: "success", message: "Mascota adoptada!" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al crear la adopcion" });
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
};
