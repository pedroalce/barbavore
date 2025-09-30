import Appointment from '../models/Appointment.js';

export async function getBalance(req, res) {
  const { period = 'mensal' } = req.query;
  const now = new Date();
  let start;
  if (period === 'mensal') start = new Date(now.getFullYear(), now.getMonth(), 1);
  else if (period === 'semanal') {
    const day = now.getDay();
    start = new Date(now);
    start.setDate(now.getDate() - day);
  } else if (period === 'anual') start = new Date(now.getFullYear(), 0, 1);
  else start = new Date(0);
  const ags = await Appointment.find({ date: { $gte: start, $lte: now }, status: 'finalizado' });
  const total = ags.reduce((sum, a) => sum + (a.value || 0), 0);
  res.json({ total, count: ags.length, period });
}
