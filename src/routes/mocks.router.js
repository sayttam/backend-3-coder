import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets', mocksController.mockingPets);
router.get('/mockingusers', mocksController.mockingUsers);
router.post('/generateData', mocksController.generateData);
router.get('/mockingfaker', mocksController.generateFaker);

export default router;
