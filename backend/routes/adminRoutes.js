import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';
import { changeAccountStatusController, getAllDoctorsController, getAllUsersController,blockUsersControllers } from '../controllers/adminControllers.js'


// All Guest User || get
router.get('/get-all-users',protect, getAllUsersController);

// All Doctor || get
router.get('/get-all-doctors', protect, getAllDoctorsController);

// change-account-status
router.post('/change-account-status', protect, changeAccountStatusController);

router.post('/block-users',blockUsersControllers);

export default router;

