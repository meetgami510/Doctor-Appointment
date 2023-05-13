import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';
import { changeAccountStatusController, getAllDoctorsController, getAllUsersController } from '../controllers/adminControllers.js'


// All Guest User || get
router.get('/get-all-users', getAllUsersController);

// All Doctor || get
router.get('/get-all-doctors', getAllDoctorsController);

// change-account-status
router.post('/change-account-status', changeAccountStatusController);

export default router;

