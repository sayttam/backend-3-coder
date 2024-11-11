import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener una lista de todas las mascotas
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: Una lista de mascotas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: El ID de la mascota.
 *                   name:
 *                     type: string
 *                     description: El nombre de la mascota.
 *                   specie:
 *                     type: string
 *                     description: La especie de la mascota.
 *                   birthDate:
 *                     type: string
 *                     description: La fecha de nacimiento de la mascota.
 */
router.get('/', petsController.getAllPets);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crear una nueva mascota
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre de la mascota.
 *               specie:
 *                 type: string
 *                 description: La especie de la mascota.
 *               birthDate:
 *                 type: string
 *                 description: La fecha de nacimiento de la mascota (formato YYYY-MM-DD).
 *     responses:
 *       201:
 *         description: Mascota creada con éxito.
 *       400:
 *         description: Solicitud incorrecta.
 */
router.post('/', petsController.createPet);

/**
 * @swagger
 * /api/pets/withimage:
 *   post:
 *     summary: Crear una nueva mascota con una imagen
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre de la mascota.
 *               specie:
 *                 type: string
 *                 description: La especie de la mascota.
 *               birthDate:
 *                 type: string
 *                 description: La fecha de nacimiento de la mascota (formato YYYY-MM-DD).
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: La imagen de la mascota.
 *     responses:
 *       201:
 *         description: Mascota creada con éxito.
 *       400:
 *         description: Solicitud incorrecta.
 */
router.post('/withimage', uploader.single('image'), petsController.createPetWithImage);

/**
 * @swagger
 * /api/pets/{pid}:
 *   get:
 *     summary: Obtener una mascota por su ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la mascota
 *     responses:
 *       200:
 *         description: Datos de la mascota obtenidos exitosamente.
 *       404:
 *         description: Mascota no encontrada.
 */
router.get('/:pid', petsController.getPet);

/**
 * @swagger
 * /api/pets/{pid}:
 *   put:
 *     summary: Actualizar una mascota por su ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre actualizado de la mascota.
 *               specie:
 *                 type: string
 *                 description: La especie de la mascota.
 *               birthDate:
 *                 type: string
 *                 description: La fecha de nacimiento de la mascota (formato YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: La mascota fue actualizada con éxito.
 *       404:
 *         description: Mascota no encontrada.
 */
router.put('/:pid', petsController.updatePet);

/**
 * @swagger
 * /api/pets/{pid}:
 *   delete:
 *     summary: Eliminar una mascota por su ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la mascota
 *     responses:
 *       200:
 *         description: La mascota fue eliminada con éxito.
 *       404:
 *         description: Mascota no encontrada.
 */
router.delete('/:pid', petsController.deletePet);

export default router;
