import { Router } from "express";
const router = Router();
import {
    loginController,
    registerController,
    getUserDataController,
    getAllNotificationController,
    deleteAllNotificationController,
    applyDoctorController,
    getAllDoctorController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentController,
    updatePersonalDetails,
    makePaymentController,
    paymentVerificatonController,
    emailSendController,
    getDoctorByIdController,
    verifyVideoMeetingIdController,
    checkAppointmentController
} from "../controllers/userControllers.js";
import { getAppointmentsController } from "../controllers/commonControllers.js";

// ROUTES



// Auth || get
router.get("/getUserData", getUserDataController);

// notification Docotr || get
router.get("/get-all-notification", getAllNotificationController);

// delete all notifications || delete
router.delete("/delete-all-notification", deleteAllNotificationController);

// apply doctor || post
router.post("/apply-doctor", applyDoctorController);

router.post('/getDoctorById', getDoctorByIdController);

// get all doctor
router.get("/getAllDoctor", getAllDoctorController);

//check availibality
router.post('/booking-avalibility', bookingAvailabilityController);

// book appointment
router.post("/book-appointment", bookAppointmentController);

// show appointments
router.get('/appointments', getAppointmentsController);

router.post('/update-personal-details', updatePersonalDetails);

router.post('/orders', makePaymentController);

router.post('/verify', paymentVerificatonController);

router.post('/verify-video-meeting-id', verifyVideoMeetingIdController)

router.post('/check-appointmentInfo',checkAppointmentController)

router.get('/send-email', emailSendController);



export default router;
