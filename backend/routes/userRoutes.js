import { Router } from 'express';
const router = Router();
import { loginController, registerController } from "../controllers/userControllers.js";

// ROUTES

// LOGIN || post
router.post('/login', loginController);

// REGISTER || post
router.post('/register', registerController);

export default router;