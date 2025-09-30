import express from 'express';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';

const router = express.Router();

// Montagem das rotas seguindo padrão MVC
router.use('/auth', authRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/balance', balanceRoutes);
router.use('/services', serviceRoutes);
router.use('/agendamentos', agendamentoRoutes);

export default router;