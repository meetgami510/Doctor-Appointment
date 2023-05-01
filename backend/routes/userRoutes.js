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
} from "../controllers/userControllers.js";
import protect from "../middlerwares/authMiddleware.js";

// ROUTES

// LOGIN || post
router.post("/login", loginController);

// REGISTER || post
router.post("/register", registerController);

// Auth || get
router.get("/getUserData", protect, getUserDataController);

// notification Docotr || get
router.get("/get-all-notification", getAllNotificationController);

// delete all notifications || delete
router.delete("/delete-all-notification", protect, deleteAllNotificationController);

// apply doctor || post
router.post("/apply-doctor", applyDoctorController);

// get all doctor
router.get("/getAllDoctor", protect, getAllDoctorController);

//check availibality
router.post('/booking-avalibility', protect, bookingAvailabilityController);

// book appointment
router.post("/book-appointment", protect, bookAppointmentController);



export default router;
