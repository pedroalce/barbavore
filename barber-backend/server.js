// barber-backend/server.js
import express from 'express'
import appointmentsRoutes from './routes/appointments.js'
import servicesRoutes from './routes/services.js'


const app = express()
app.use(express.json())

// registra a rota
app.use('/appointments', appointmentsRoutes)

app.use('/services', servicesRoutes)

app.listen(3000, () => console.log('Server running on port 3000'))