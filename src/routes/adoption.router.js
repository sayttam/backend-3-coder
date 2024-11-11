import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener una lista de todas las adopciones
 *     tags: [Adopciones]
 *     responses:
 *       200:
 *         description: Una lista de adopciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: El ID de la adopción.
 *                       owner:
 *                         type: string
 *                         description: El ID del usuario que adopta.
 *                       pet:
 *                         type: string
 *                         description: El ID de la mascota adoptada.
 */
router.get('/', adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por su ID
 *     tags: [Adopciones]
 *     parameters:
 *       - in: path
 *         name: aid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la adopción
 *     responses:
 *       200:
 *         description: Detalles de la adopción.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: El ID de la adopción.
 *                     owner:
 *                       type: string
 *                       description: El ID del usuario que adopta.
 *                     pet:
 *                       type: string
 *                       description: El ID de la mascota adoptada.
 *       404:
 *         description: Adopción no encontrada.
 */
router.get('/:aid', adoptionsController.getAdoption);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adopciones]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario que adopta
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la mascota que se adopta
 *     responses:
 *       201:
 *         description: Adopción creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: "Mascota adoptada!"
 *       400:
 *         description: Solicitud incorrecta (mascota ya adoptada o parámetros inválidos).
 *       404:
 *         description: Usuario o mascota no encontrados.
 */
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;
