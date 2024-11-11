import bcrypt from 'bcryptjs';
import { faker, ne } from '@faker-js/faker';
import UserDAO from '../dao/Users.dao.js';
import PetDAO from '../dao/Pets.dao.js';
import { customError } from '../errors/customError.js';
import logger from '../utils/logger.js';

const userDao = new UserDAO();
const petDao = new PetDAO();

const generateMockUsers = (numUsers) => {
    if (typeof numUsers !== 'number' || numUsers <= 0) {
        throw customError.badRequestError("El número de usuarios debe ser un número positivo");
    }
    return Array.from({ length: numUsers }, () => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('coder123', 10),
        role: faker.helpers.arrayElement(['admin', 'user']),
        pets: [],
    }));
};

const generateMockPets = (numPets) => {
    if (typeof numPets !== 'number' || numPets <= 0) {
        throw customError.badRequestError("El número de mascotas debe ser un número positivo");
    }
    return Array.from({ length: numPets }, () => ({
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
    }));
};

const generateFaker = (req, res, next) => {
    try {
        const mockFaker = Array.from({ length: 10 }, () => ({
            name: faker.company.name(),
            business: faker.company.catchPhrase(),
            start_date: faker.date.past(),
            favorite_color: faker.color.human(),
        }));
        res.send({ status: 'success', payload: mockFaker });
    } catch (error) {
        logger.error(`Error al generar mock falso: ${error.message}`);
        next(error);
    }
};

const mockingPets = (req, res, next) => {
    try {
        const mockPets = generateMockPets(10);
        res.send({ status: 'success', payload: mockPets });
    } catch (error) {
        logger.error(`Error al generar mock de mascotas: ${error.message}`);
        next(error);
    }
};

const mockingUsers = (req, res, next) => {
    try {
        const mockUsers = generateMockUsers(50);
        res.send({ status: 'success', payload: mockUsers });
    } catch (error) {
        logger.error(`Error al generar mock de usuarios: ${error.message}`);
        next(error);
    }
};

const generateData = async (req, res, next) => {
    const { cu, cm } = req.params;
    const cantUsuarios = parseInt(cu);
    const cantMascotas = parseInt(cm);
    if (typeof cantUsuarios !== 'number' || cantUsuarios <= 0 || typeof cantMascotas !== 'number' || cantMascotas <= 0) {
        logger.warn("Faltan parámetros numéricos válidos para users y pets");
        throw customError.badRequestError("Faltan parámetros numéricos válidos para users y pets");
    }

    try {
        const mockUsers = generateMockUsers(cantUsuarios);
        const mockPets = generateMockPets(cantMascotas);

        await userDao.insertMany(mockUsers);
        await petDao.insertMany(mockPets);
        res.send({ status: 'success', message: `${cantUsuarios} usuarios y ${cantMascotas} mascotas insertados en la base de datos` });
    } catch (error) {
        logger.error(`Error al generar datos de usuarios y mascotas: ${error.message}`);
        next(error);
    }
};

export default {
    mockingPets,
    mockingUsers,
    generateData,
    generateFaker,
};
