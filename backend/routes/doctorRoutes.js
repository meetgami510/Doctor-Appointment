import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';

import { getDoctorByIdController, getDoctorInfoController, uploadDocumentpdfController, getDoctorAppointmentsController, updateAppointmentStatusController, sloatbookingController, updateProfessionalDetailsController } from '../controllers/doctorController.js';

router.post('/getDoctorById', protect, getDoctorByIdController);

// docotor Information || GET
router.get('/getDoctorInfo', protect, getDoctorInfoController);

router.post('/update-professional-details', protect, updateProfessionalDetailsController);

router.get('/appointments', protect, getDoctorAppointmentsController);

router.post('/update-appointment-status', protect, updateAppointmentStatusController);

router.post('/sloat-booking', protect, sloatbookingController);

router.post('/pdf-upload', uploadDocumentpdfController);

export default router;