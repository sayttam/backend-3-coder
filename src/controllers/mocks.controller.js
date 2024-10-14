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
        role: faker.helpers.arrayElement(['admin', 'user']),
        pets: [],
    }));
    return users;
};

const generateMockPets = (numPets) => {
    const pets = Array.from({length: numPets}, ()=> ({
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
    }));
    return pets;
}

const generateFaker = (req, res) => {
    const mockFaker = Array.from({ length: 10 }, () =>({
        name: faker.company.name(),
        business: faker.company.catchPhrase(),
        start_date: faker.date.past(),
        favorite_color: faker.color.human()
    }))
    res.send({status: 'success', payload: mockFaker })
}

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
    const mockPets = generateMockPets(pets);

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
    generateFaker
};
