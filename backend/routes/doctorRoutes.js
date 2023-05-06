import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';

import { getDoctorByIdController, getDoctorInfoController, uploadDocumentpdfController, getDoctorAppointmentsController, updateAppointmentStatusController, sloatbookingController, updateProfessionalController } from '../controllers/doctorController.js';
import { getAppointmentsController } from '../controllers/commonControllers.js';

router.post('/getDoctorById', protect, getDoctorByIdController);

// docotor Information || GET
router.get('/getDoctorInfo', protect, getDoctorInfoController);

router.post('/update-professional-details', protect, updateProfessionalController);

router.get('/appointments', protect, getAppointmentsController);

router.post('/update-appointment-status', protect, updateAppointmentStatusController);

router.post('/sloat-booking', protect, sloatbookingController);

router.post('/pdf-upload', uploadDocumentpdfController);

export default router;