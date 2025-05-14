import express from 'express';
import { loginUser, me, requestReset, resetPassword, signupUser } from '../controllers/authController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/Login', loginUser);
router.post('/request-reset', requestReset);
router.post('/reset-password/:token', resetPassword);

router.get('/me',authenticate, me);




export default router;