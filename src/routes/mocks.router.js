// routes/mocks.router.js
import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

/**
 * @swagger
 * /api/mocks/mockingpets:
 *   get:
 *     summary: Obtener datos simulados de mascotas
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Datos simulados de mascotas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: El ID simulado de la mascota.
 *                   name:
 *                     type: string
 *                     description: El nombre simulado de la mascota.
 *                   type:
 *                     type: string
 *                     description: El tipo de mascota.
 */
router.get('/mockingpets', mocksController.mockingPets);

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Obtener datos simulados de usuarios
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Datos simulados de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: El ID simulado del usuario.
 *                   name:
 *                     type: string
 *                     description: El nombre simulado del usuario.
 *                   email:
 *                     type: string
 *                     description: El correo electrónico simulado del usuario.
 */
router.get('/mockingusers', mocksController.mockingUsers);

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Generar datos simulados
 *     tags: [Mocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: La cantidad de datos a generar.
 *     responses:
 *       201:
 *         description: Datos generados con éxito.
 *       400:
 *         description: Solicitud incorrecta.
 */
router.post('/generateData', mocksController.generateData);

/**
 * @swagger
 * /api/mocks/mockingfaker:
 *   get:
 *     summary: Obtener datos simulados usando Faker
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Datos generados con Faker.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: El ID generado.
 *                   name:
 *                     type: string
 *                     description: El nombre generado.
 *                   email:
 *                     type: string
 *                     description: El correo electrónico generado.
 */
router.get('/mockingfaker', mocksController.generateFaker);

export default router;
