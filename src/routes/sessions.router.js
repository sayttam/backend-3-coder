// src/routes/sessions.router.js
import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

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
 *               username:
 *                 type: string
 *                 description: El nombre de usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Solicitud incorrecta
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
 *               username:
 *                 type: string
 *                 description: El nombre de usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: No autorizado
 */
router.post('/login', sessionsController.login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtener la información de la sesión actual
 *     tags: [Sesiones]
 *     responses:
 *       200:
 *         description: Información de la sesión actual
 *       401:
 *         description: No autorizado
 */
router.get('/current', sessionsController.current);

/**
 * @swagger
 * /api/sessions/unprotectedLogin:
 *   get:
 *     summary: Iniciar sesión sin autenticación
 *     tags: [Sesiones]
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso (sin protección)
 */
router.get('/unprotectedLogin', sessionsController.unprotectedLogin);

/**
 * @swagger
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Obtener la información de la sesión actual sin autenticación
 *     tags: [Sesiones]
 *     responses:
 *       200:
 *         description: Información de la sesión actual (sin protección)
 */
router.get('/unprotectedCurrent', sessionsController.unprotectedCurrent);

export default router;
