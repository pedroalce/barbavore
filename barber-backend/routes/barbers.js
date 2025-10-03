// barber-backend/routes/barbers.js
import express from 'express'
import { getBarbers, createBarber } from '../controllers/barbersController.js'

const router = express.Router()

router.get('/', getBarbers)
router.post('/', createBarber)

export default router