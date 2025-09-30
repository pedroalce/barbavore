
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

// Histórico de agendamentos para o usuário autenticado
export async function getAppointmentsHistory(req, res) {
  try {
    const { role, id } = req.user;
    let query = {};
    if (role === 'client') query.client = id;
    if (role === 'barber') query.barber = id;
    // Admin vê todos
    const appointments = await Appointment.find(query)
      .populate('client', 'name email')
      .populate('barber', 'name email')
      .sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico', error: err.message });
  }
}

export async function getAppointments(req, res) {
  const { role, id } = req.user;
  let query = {};
  if (role === 'client') query.client = id;
  if (role === 'barber') query.barber = id;
  if (role === 'admin') query = {};
  const appointments = await Appointment.find(query).populate('client barber', 'name email');
  res.json(appointments);
}

export async function createAppointment(req, res) {
  const { client, barber, date, startTime, endTime, services, value } = req.body;
  const appointment = await Appointment.create({ client, barber, date, startTime, endTime, services, value });
  res.status(201).json(appointment);
}

export async function updateAppointment(req, res) {
  const { id } = req.params;
  const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
  if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
  res.json(appointment);
}

export async function deleteAppointment(req, res) {
  const { id } = req.params;
  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
  res.json({ message: 'Agendamento removido' });
}
