import express from 'express';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

const router = express.Router();

// Montagem das rotas seguindo padrão MVC
router.use('/auth', authRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/balance', balanceRoutes);
router.use('/services', serviceRoutes);

export default router;