// routes/users.router.js
import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener una lista de todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Una lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: El ID del usuario.
 *                   name:
 *                     type: string
 *                     description: El nombre del usuario.
 */
router.get('/', usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Los detalles del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: El ID del usuario.
 *                 name:
 *                   type: string
 *                   description: El nombre del usuario.
 *       404:
 *         description: Usuario no encontrado.
 */
router.get('/:uid', usersController.getUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualizar un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: El nombre del usuario.
 *               last_name:
 *                 type: string
 *                 description: El nombre del usuario.
 *               email:
 *                 type: string
 *                 description: El email del usuario.
 *               password:
 *                 type: string
 *                 description: El password del usuario.
 *     responses:
 *       200:
 *         description: El usuario fue actualizado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.put('/:uid', usersController.updateUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: El usuario fue eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete('/:uid', usersController.deleteUser);

export default router;
