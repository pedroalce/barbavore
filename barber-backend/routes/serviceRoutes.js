import express from 'express';
import { getServices, updateService } from '../controllers/serviceController.js';
import { auth, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.get('/', getServices);
router.put('/', auth, isAdmin, updateService);

export default router;
