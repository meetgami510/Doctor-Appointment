import { Router } from 'express';
const router = Router();
import { loginController, registerController,getUserDataController,getAllNotificationController,deleteAllNotificationController,applyDoctorController } from "../controllers/userControllers.js";

// ROUTES

// LOGIN || post
router.post('/login', loginController);

// REGISTER || post
router.post('/register', registerController);

// Auth || get
router.get('/getUserData', getUserDataController);

// notification Docotr || get
router.get('/get-all-notification', getAllNotificationController);

// delete all notifications || delete
router.delete('/delete-all-notification', deleteAllNotificationController);

// apply doctor || post
router.post('/apply-doctor', applyDoctorController);



export default router;