import express from 'express';
import { getBalance } from '../controllers/balanceController.js';
import { auth, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, isAdmin, getBalance);

export default router;
