import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';

import { getDoctorByIdController,getDoctorInfoController,updateProfileController } from '../controllers/doctorController.js';

router.post('/getDoctorById', protect, getDoctorByIdController);

// docotor Information || GET
router.get('/getDoctorInfo', protect ,getDoctorInfoController);

router.post('/updateProfile', updateProfileController);


export default router;