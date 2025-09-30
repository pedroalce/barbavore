import express from 'express';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointmentController.js';
import { auth, isAdmin, isOwnerOrAdmin } from '../middleware/auth.js';
const router = express.Router();


// Histórico de agendamentos para o usuário autenticado
import { getAppointmentsHistory } from '../controllers/appointmentController.js';
router.get('/history', auth, getAppointmentsHistory);

router.get('/', auth, getAppointments);
router.post('/', auth, createAppointment);
router.put('/:id', auth, isAdmin, updateAppointment);
router.delete('/:id', auth, isAdmin, deleteAppointment);

export default router;
