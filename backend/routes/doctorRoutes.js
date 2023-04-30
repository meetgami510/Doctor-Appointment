import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';

import { getDoctorByIdController } from '../controllers/doctorController.js';

router.post('/getDoctorById', getDoctorByIdController);

export default router;