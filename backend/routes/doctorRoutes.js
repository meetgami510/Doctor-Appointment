import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';

import { getDoctorByIdController } from '../controllers/doctorController.js';

router.post('/getDoctorById', protect, getDoctorByIdController);

export default router;