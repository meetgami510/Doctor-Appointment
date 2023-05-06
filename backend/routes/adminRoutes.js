import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';
import { changeAccountStatusController, getAllDoctorsController, getAllUsersController } from '../controllers/adminControllers.js'


// All Guest User || get
router.get('/get-all-users',protect, getAllUsersController);

// All Doctor || get
router.get('/get-all-doctors', protect, getAllDoctorsController);

// change-account-status
router.post('/change-account-status', protect, changeAccountStatusController);

export default router;

