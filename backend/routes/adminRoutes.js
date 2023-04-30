import { Router } from 'express';
const router = Router();

import protect from '../middlerwares/authMiddleware.js';
import { getAllDoctorsController, getAllUsersController} from '../controllers/adminControllers.js'


// All Guest User || get
router.get('/get-all-users', getAllUsersController);

// All Doctor || get
router.get('/get-all-doctors', protect, getAllDoctorsController);

export default router;

