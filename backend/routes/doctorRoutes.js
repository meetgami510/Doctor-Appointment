import { Router } from 'express';
const router = Router();

import { getDoctorInfoController, getDoctorAppointmentsController, updateAppointmentStatusController, sloatbookingController, updateProfessionalDetailsController } from '../controllers/doctorController.js';

// docotor Information || GET
router.get('/getDoctorInfo', getDoctorInfoController);

router.post('/update-professional-details', updateProfessionalDetailsController);

router.get('/appointments', getDoctorAppointmentsController);

router.post('/update-appointment-status', updateAppointmentStatusController);

router.post('/sloat-booking', sloatbookingController);

// router.post('/pdf-upload', uploadDocumentpdfController);

export default router;