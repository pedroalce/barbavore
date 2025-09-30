import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  barber: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // formato 'HH:mm'
  endTime: { type: String, required: true },
  services: [{ type: String, enum: ['maquina', 'tesoura', 'barba', 'sobrancelha', 'combo'] }],
  value: { type: Number, required: true },
  paymentType: { type: String, enum: ['dinheiro', 'pix', 'cartao'], required: false },
  status: { type: String, enum: ['pendente', 'confirmado', 'cancelado', 'finalizado'], default: 'pendente' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', appointmentSchema);
