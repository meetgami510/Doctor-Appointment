import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';

import { getDoctorByIdController,getDoctorInfoController,updateProfileController,getDoctorAppointmentsController } from '../controllers/doctorController.js';

router.post('/getDoctorById', protect, getDoctorByIdController);

// docotor Information || GET
router.get('/getDoctorInfo', protect ,getDoctorInfoController);

router.post('/updateProfile', updateProfileController);

router.get('/doctor-appointments', protect, getDoctorAppointmentsController);


export default router;