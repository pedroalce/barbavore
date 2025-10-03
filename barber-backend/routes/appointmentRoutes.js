
import express from 'express'
import {
    getAppointments,
    createAppointment,
    deleteAppointment,
    getAppointmentsForBarber

} from '../controllers/appointmentsController.js'

const router = express.Router()

router.get('/', getAppointments)
router.post('/', createAppointment)
router.delete('/:id', deleteAppointment)
router.get('/barber', getAppointmentsForBarber)

export default router