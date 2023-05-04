import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';

import { getDoctorByIdController, getDoctorInfoController, updateProfileController, getDoctorAppointmentsController, updateAppointmentStatusController, sloatbookingController } from '../controllers/doctorController.js';
import { getAppointmentsController } from '../controllers/commonControllers.js';

router.post('/getDoctorById', protect, getDoctorByIdController);

// docotor Information || GET
router.get('/getDoctorInfo', protect, getDoctorInfoController);

router.post('/updateProfile', updateProfileController);

router.get('/appointments', protect, getAppointmentsController);

router.post('/update-appointment-status', protect, updateAppointmentStatusController);

router.post('/sloat-booking', protect, sloatbookingController);

export default router;