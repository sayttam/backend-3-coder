import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import authenticate from '../services/auth.js';

const router = Router();

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Sesiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: El nombre del usuario
 *               last_name:
 *                 type: string
 *                 description: El apellido del usuario
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: string
 *                   description: El ID del usuario registrado.
 *       400:
 *         description: Solicitud incorrecta.
 */
router.post('/register', sessionsController.register);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Sesiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 mensaje:
 *                   type: string
 *                   example: "Sesión iniciada"
 *       401:
 *         description: No autorizado.
 */
router.post('/login', sessionsController.login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtener la información de la sesión actual
 *     tags: [Sesiones]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Información de la sesión actual.
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
 *                     email:
 *                       type: string
 *                       description: El correo electrónico del usuario.
 *                     first_name:
 *                       type: string
 *                       description: El nombre del usuario.
 *                     last_name:
 *                       type: string
 *                       description: El apellido del usuario.
 *       401:
 *         description: No autorizado.
 */
router.get('/current', authenticate, sessionsController.current);

/**
 * @swagger
 * /api/sessions/unprotectedLogin:
 *   post:
 *     summary: Iniciar sesión sin autenticación
 *     tags: [Sesiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso (sin protección).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 mensaje:
 *                   type: string
 *                   example: "Sesión no protegida iniciada"
 *       400:
 *         description: Solicitud incorrecta.
 *       401:
 *         description: No autorizado.
 */
router.post('/unprotectedLogin', sessionsController.unprotectedLogin);

/**
 * @swagger
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Obtener la información de la sesión actual sin autenticación
 *     tags: [Sesiones]
 *     responses:
 *       200:
 *         description: Información de la sesión actual (sin protección).
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
 *                     email:
 *                       type: string
 *                       description: El correo electrónico del usuario.
 *                     first_name:
 *                       type: string
 *                       description: El nombre del usuario.
 *                     last_name:
 *                       type: string
 *                       description: El apellido del usuario.
 *       401:
 *         description: No autorizado.
 */
router.get('/unprotectedCurrent', sessionsController.unprotectedCurrent);

export default router;
