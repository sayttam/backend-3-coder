import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { usersService } from '../services/index.js';
import { petsService } from '../services/index.js';

const generateMockUsers = (numUsers) => {
    const users = Array.from({ length: numUsers }, () => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('coder123', 10),
        role: 'user',
        pets: [],
    }));
    return users;
};

const mockingPets = (req, res) => {
    const mockPets = Array.from({ length: 10 }, () => ({
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
    }));
    res.send({ status: 'success', payload: mockPets });
};

const mockingUsers = (req, res) => {
    const mockUsers = generateMockUsers(50); 
    res.send({ status: 'success', payload: mockUsers });
};

const generateData = async (req, res) => {
    const { users, pets } = req.body;
    if (!users || !pets) {
        return res.status(400).send({ status: 'error', message: 'Faltan parámetros numéricos para users y pets' });
    }

    const mockUsers = generateMockUsers(users);
    const mockPets = Array.from({ length: pets }, () => ({
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
    }));

    try {
        await usersService.createMany(mockUsers); 
        await petsService.createMany(mockPets); 
        res.send({ status: 'success', message: `${users} usuarios y ${pets} mascotas insertados en la base de datos` });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al insertar en la base de datos', error: error.message });
    }
};

export default {
    mockingPets,
    mockingUsers,
    generateData,
};
