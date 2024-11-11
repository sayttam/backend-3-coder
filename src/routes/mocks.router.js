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
 *                   name:
 *                     type: string
 *                     description: El nombre simulado de la mascota.
 *                   specie:
 *                     type: string
 *                     description: La especie de la mascota.
 *                   birthDate:
 *                     type: string
 *                     format: date
 *                     description: La fecha de nacimiento simulada de la mascota.
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
 *                   first_name:
 *                     type: string
 *                     description: El nombre simulado del usuario.
 *                   last_name:
 *                     type: string
 *                     description: El apellido simulado del usuario.
 *                   email:
 *                     type: string
 *                     description: El correo electrónico simulado del usuario.
 *                   role:
 *                     type: string
 *                     description: El rol simulado del usuario (admin o user).
 */
router.get('/mockingusers', mocksController.mockingUsers);

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
 *                   name:
 *                     type: string
 *                     description: El nombre simulado de la empresa.
 *                   business:
 *                     type: string
 *                     description: El eslogan de la empresa.
 *                   start_date:
 *                     type: string
 *                     format: date
 *                     description: La fecha de inicio simulada de la empresa.
 *                   favorite_color:
 *                     type: string
 *                     description: El color favorito simulado.
 */
router.get('/mockingfaker', mocksController.generateFaker);

/**
 * @swagger
 * /api/mocks/generateData/{cu}/{cp}:
 *   post:
 *     summary: Generar datos simulados de usuarios y mascotas
 *     tags: [Mocks]
 *     parameters:
 *       - in: path
 *         name: cu
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: La cantidad de usuarios simulados a generar.
 *       - in: path
 *         name: cp
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: La cantidad de mascotas simuladas a generar.
 *     requestBody:
 *       required: false
 *     responses:
 *       201:
 *         description: Datos generados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: El estado de la solicitud.
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando el número de usuarios y mascotas generados.
 *                   example: "10 usuarios y 15 mascotas insertados en la base de datos"
 *       400:
 *         description: Solicitud incorrecta.
 */
router.post('/generateData/:cu/:cm', mocksController.generateData);

export default router;
